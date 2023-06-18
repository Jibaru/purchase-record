import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '@/config/api'
import { Axios } from 'axios'
import { useAuthStore } from '@/auth/stores/auth'
import type { CostCenter } from './dtos/cost-center'

export const useCostCenterStore = defineStore('costCenter', () => {
  const costCenters: Ref<CostCenter[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const isCreatingCostCenter: Ref<boolean> = ref(false)
  const isLoadingCostCenters: Ref<boolean> = ref(false)
  const createErrorMessage: Ref<string | null> = ref(null)

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
    isLoadingCostCenters.value = true
    try {
      const { data } = await axios.get('cost-centers', {
        params: {
          page: page,
          paginate: perPage
        }
      })

      const responseCostCenters: {
        id: string
        name: string
        code: string
        created_at: string
        updated_at: string
      }[] = data.data
      totalPages.value = data.total_pages

      costCenters.value = []

      for (const costCenter of responseCostCenters) {
        costCenters.value.push({
          id: costCenter.id,
          name: costCenter.name,
          code: costCenter.code,
          createdAt: new Date(costCenter.created_at),
          updatedAt: new Date(costCenter.updated_at)
        })
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      isLoadingCostCenters.value = false
    }
  }

  async function create(name: string, code: string) {
    isCreatingCostCenter.value = true
    try {
      const response = await axios.post(
        'cost-centers',
        JSON.stringify({
          name,
          code
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200) {
        throw new Error(response.data.message)
      }
    } catch (error: any) {
      createErrorMessage.value = error.message
      setTimeout(() => {
        createErrorMessage.value = null
      }, 5000)
    } finally {
      isCreatingCostCenter.value = false
    }
  }

  return {
    load,
    create,
    costCenters,
    totalPages,
    isLoadingCostCenters,
    isCreatingCostCenter,
    createErrorMessage
  }
})
