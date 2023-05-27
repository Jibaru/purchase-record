import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL, INVOICES, PURCHASE_RECORDS, VOUCHERS } from '@/config/api'
import { Axios } from 'axios'
import type { PurchaseRecordDTO } from './dtos/purchase-record'
import { useAuthStore } from '@/auth/stores/auth'

export const usePurchaseRecordStore = defineStore('purchaseRecord', () => {
  const purchaseRecords: Ref<PurchaseRecordDTO[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const currentPeriod: Ref<{ year: number; month: number } | null> = ref(null)
  const isLoadingPurchaseRecords: Ref<boolean> = ref(false)
  const isLoadingPurchaseRecordsExportable: Ref<boolean> = ref(false)

  const { token } = useAuthStore()

  const axios = new Axios({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'
    }
  })

  function setPeriod(year: number, month: number): void {
    currentPeriod.value = {
      year,
      month
    }
  }

  async function load(page: number, perPage: number = 15): Promise<void> {
    isLoadingPurchaseRecords.value = true
    try {
      const params: {
        page: number
        paginate: number
        'period[month]'?: number
        'period[year]'?: number
      } = {
        page: page,
        paginate: perPage
      }

      if (currentPeriod.value !== null) {
        params['period[month]'] = currentPeriod.value.month
        params['period[year]'] = currentPeriod.value.year
      }

      const { data } = await axios.get(PURCHASE_RECORDS, {
        params: params,
        transformResponse: (data: string) => JSON.parse(data)
      })

      const responsePurchaseRecords: {
        id: string
        period: string
        unique_operation_code: string
        correlative_accounting_entry_number: string
        issue_date: string
        due_date: string | null
        voucher_type: string
        voucher_series: string
        dua_or_dsi_issue_year: string | null
        voucher_number: string
        daily_operations_total_amount: number | null
        supplier_document_type: string
        supplier_document_number: string
        supplier_document_denomination: string
        first_tax_base: number | null
        first_igv_amount: number | null
        second_tax_base: number | null
        second_igv_amount: number | null
        third_tax_base: number | null
        third_igv_amount: number | null
        payable_amount: number
        has_detraction: boolean
        detraction_percentage: number | null
      }[] = data.data

      totalPages.value = data.total_pages
      purchaseRecords.value = []

      for (const record of responsePurchaseRecords) {
        purchaseRecords.value.push({
          id: record.id,
          period: record.period,
          uniqueOperationCode: record.unique_operation_code,
          correlativeAccountingEntryNumber: record.correlative_accounting_entry_number,
          issueDate: record.issue_date,
          dueDate: record.due_date,
          voucherType: record.voucher_type,
          voucherSeries: record.voucher_series,
          duaOrDsiIssueYear: record.dua_or_dsi_issue_year,
          voucherNumber: record.voucher_number,
          dailyOperationsTotalAmount: record.daily_operations_total_amount,
          supplierDocumentType: record.supplier_document_type,
          supplierDocumentNumber: record.supplier_document_number,
          supplierDocumentDenomination: record.supplier_document_denomination,
          firstTaxBase: record.first_tax_base,
          firstIgvAmount: record.first_igv_amount,
          secondTaxBase: record.second_tax_base,
          secondIgvAmount: record.second_igv_amount,
          thirdTaxBase: record.third_tax_base,
          thirdIgvAmount: record.third_igv_amount,
          payableAmount: record.payable_amount,
          hasDetraction: record.has_detraction,
          detractionPercentage: record.detraction_percentage
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingPurchaseRecords.value = false
    }
  }

  async function exportAll() {
    isLoadingPurchaseRecordsExportable.value = true
    try {
      const params: {
        'period[month]'?: number
        'period[year]'?: number
      } = {}

      if (currentPeriod.value !== null) {
        params['period[month]'] = currentPeriod.value.month
        params['period[year]'] = currentPeriod.value.year
      }

      const data = await axios.get(PURCHASE_RECORDS + '/export', {
        responseType: 'blob',
        params: params
      })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(data.data)
      link.download = `registro-compras-${new Date().getTime()}.xls`
      link.click()
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingPurchaseRecordsExportable.value = false
    }
  }

  return {
    load,
    exportAll,
    setPeriod,
    purchaseRecords,
    totalPages,
    isLoadingPurchaseRecords,
    isLoadingPurchaseRecordsExportable
  }
})
