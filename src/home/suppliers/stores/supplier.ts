import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '@/config/api'
import { Axios } from 'axios'
import type { SupplierDTO } from './dtos/supplier'
import { useAuthStore } from '@/auth/stores/auth'
import type { ItemDTO } from '@/home/items/stores/dtos/item'

export const useSupplierStore = defineStore('supplier', () => {
  const suppliers: Ref<SupplierDTO[]> = ref([])
  const supplierItems: Ref<ItemDTO[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const currentPeriod: Ref<{ year: number; month: number } | null> = ref(null)
  const isLoadingSuppliers: Ref<boolean> = ref(false)
  const isLoadingSupplierItems: Ref<boolean> = ref(false)

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
    isLoadingSuppliers.value = true
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

      const { data } = await axios.get('/suppliers', {
        params: params,
        transformResponse: (data: string) => JSON.parse(data)
      })

      const responseSuppliers: {
        reference: string
        type: string
        number: string
        denomination: string
        total_items: number
        total_price: number
      }[] = data.data

      totalPages.value = data.total_pages
      suppliers.value = []

      for (const record of responseSuppliers) {
        suppliers.value.push({
          reference: record.reference,
          type: record.type,
          denomination: record.denomination,
          number: record.number,
          totalItems: record.total_items,
          totalPrice: record.total_price
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingSuppliers.value = false
    }
  }

  async function loadItems(reference: string): Promise<void> {
    isLoadingSupplierItems.value = true
    try {
      const { data } = await axios.get('/suppliers/' + reference + '/items', {
        transformResponse: (data: string) => JSON.parse(data)
      })

      const responseItems: {
        reference: string
        code: string
        description: string
        total_quantity: number
        total_items: number
        unit_price_average: number
      }[] = data.data

      totalPages.value = data.total_pages
      supplierItems.value = []

      for (const record of responseItems) {
        supplierItems.value.push({
          reference: record.reference,
          code: record.code,
          description: record.description,
          totalItems: record.total_items,
          totalQuantity: record.total_quantity,
          unitPriceAverage: record.unit_price_average
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingSupplierItems.value = false
    }
  }

  return {
    load,
    loadItems,
    setPeriod,
    suppliers,
    supplierItems,
    totalPages,
    isLoadingSuppliers,
    isLoadingSupplierItems
  }
})
