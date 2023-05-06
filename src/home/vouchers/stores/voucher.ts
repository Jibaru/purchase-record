import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL, INVOICES, VOUCHERS } from '@/config/api'
import { Axios } from 'axios'
import type { Voucher } from './dtos/voucher'
import { format } from '@/shared/utils/dates/formatter'
import type { DetailedVoucher } from './dtos/detailed-voucher'
import { useAuthStore } from '@/auth/stores/auth'

export const useVoucherStore = defineStore('voucher', () => {
  const vouchers: Ref<Voucher[]> = ref([])
  const voucher: Ref<DetailedVoucher | null> = ref(null)
  let totalPages: Ref<number> = ref(0)
  let isCreatingVouchers: Ref<boolean> = ref(false)
  let isLoadingVoucher: Ref<boolean> = ref(false)
  let isLoadingVouchers: Ref<boolean> = ref(false)

  const { token } = useAuthStore()

  const axios = new Axios({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      Authorization: token
    },
    transformResponse: (data: string) => JSON.parse(data)
  })

  async function load(page: number, perPage: number = 15): Promise<void> {
    isLoadingVouchers.value = true
    try {
      const { data } = await axios.get(VOUCHERS, {
        params: {
          page: page,
          paginate: perPage
        }
      })

      const responseVouchers: {
        id: string
        issue_date: string
        created_at: string
        customer: string
        supplier: string
        series_number: string
        total: {
          currency: string
          amount: number
        }
      }[] = data.data
      totalPages.value = data.total_pages

      vouchers.value = []

      for (const voucher of responseVouchers) {
        vouchers.value.push({
          id: voucher.id,
          createdAt: format(new Date(voucher.created_at)),
          issueDate: format(new Date(voucher.issue_date)),
          customer: voucher.customer,
          supplier: voucher.supplier,
          seriesNumber: voucher.series_number,
          total: voucher.total.currency + ' ' + voucher.total.amount.toFixed(2)
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingVouchers.value = false
    }
  }

  async function loadSingle(voucherId: string): Promise<void> {
    isLoadingVoucher.value = true
    voucher.value = null
    try {
      const { data } = await axios.get(VOUCHERS + '/' + voucherId)

      voucher.value = data.data
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingVoucher.value = false
    }
  }

  async function create(files: File[]) {
    isCreatingVouchers.value = true
    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append(`file[${i}]`, files[i])
      }
      await axios.post(VOUCHERS + INVOICES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      isCreatingVouchers.value = false
    }
  }

  return {
    load,
    loadSingle,
    create,
    voucher,
    vouchers,
    totalPages,
    isLoadingVouchers,
    isCreatingVouchers
  }
})
