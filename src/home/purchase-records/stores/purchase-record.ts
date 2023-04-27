import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL, INVOICES, PURCHASE_RECORDS, VOUCHERS } from '@/config/api'
import { Axios } from 'axios'
import type { PurchaseRecordDTO } from './dtos/purchase-record'

export const usePurchaseRecordStore = defineStore('purchaseRecord', () => {
  const purchaseRecords: Ref<PurchaseRecordDTO[]> = ref([])
  let totalPages: Ref<number> = ref(0)
  let isLoadingPurchaseRecords: Ref<boolean> = ref(false)

  const axios = new Axios({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json'
    },
    transformResponse: (data: string) => JSON.parse(data)
  })

  async function load(page: number, perPage: number = 15): Promise<void> {
    isLoadingPurchaseRecords.value = true
    try {
      const { data } = await axios.get(PURCHASE_RECORDS, {
        params: {
          page: page,
          paginate: perPage
        }
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

  return {
    load,
    purchaseRecords,
    totalPages,
    isLoadingPurchaseRecords
  }
})
