import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '@/config/api'
import { Axios } from 'axios'
import type { ItemDTO } from './dtos/item'
import { useAuthStore } from '@/auth/stores/auth'
import type { SupplierDTO } from '@/home/suppliers/stores/dtos/supplier'

export const useItemStore = defineStore('item', () => {
  const items: Ref<ItemDTO[]> = ref([])
  const itemSuppliers: Ref<SupplierDTO[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const currentPeriod: Ref<{ year: number; month: number } | null> = ref(null)
  const isLoadingItems: Ref<boolean> = ref(false)
  const isLoadingItemSuppliers: Ref<boolean> = ref(false)

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
    isLoadingItems.value = true
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

      const { data } = await axios.get('/items', {
        params: params,
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
      items.value = []

      for (const record of responseItems) {
        items.value.push({
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
      isLoadingItems.value = false
    }
  }

  async function loadSuppliers(reference: string): Promise<void> {
    isLoadingItemSuppliers.value = true
    try {
      const { data } = await axios.get('/items/' + reference + '/suppliers', {
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
      itemSuppliers.value = []

      for (const record of responseSuppliers) {
        itemSuppliers.value.push({
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
      isLoadingItemSuppliers.value = false
    }
  }

  return {
    load,
    loadSuppliers,
    setPeriod,
    items,
    itemSuppliers,
    totalPages,
    isLoadingItems,
    isLoadingItemSuppliers
  }
})
