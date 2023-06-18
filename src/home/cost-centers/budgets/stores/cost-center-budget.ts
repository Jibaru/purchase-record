import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { BASE_URL } from '@/config/api'
import { Axios } from 'axios'
import { useAuthStore } from '@/auth/stores/auth'
import type { CostCenterBudget } from './dtos/cost-center-budget'

export const useCostCenterBudgetStore = defineStore('costCenterBudget', () => {
  const costCenterBudgets: Ref<CostCenterBudget[]> = ref([])
  const totalPages: Ref<number> = ref(0)
  const isCreatingCostCenterBudget: Ref<boolean> = ref(false)
  const isLoadingCostCenterBudgets: Ref<boolean> = ref(false)
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

  async function load(costCenterID: string, page: number, perPage: number = 15): Promise<void> {
    isLoadingCostCenterBudgets.value = true
    try {
      const { data } = await axios.get('cost-centers' + '/' + costCenterID + '/budgets', {
        params: {
          page: page,
          paginate: perPage
        }
      })

      const responseCostCenterBudgets: {
        id: string
        period: string
        currency: string
        amount: number
        cost_center_id: string
        created_at: string
        updated_at: string
      }[] = data.data
      totalPages.value = data.total_pages

      costCenterBudgets.value = []

      for (const costCenterBudget of responseCostCenterBudgets) {
        costCenterBudgets.value.push({
          id: costCenterBudget.id,
          period: costCenterBudget.period,
          currency: costCenterBudget.currency,
          amount: costCenterBudget.amount,
          costCenterID: costCenterBudget.cost_center_id,
          createdAt: new Date(costCenterBudget.created_at),
          updatedAt: new Date(costCenterBudget.updated_at)
        })
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      isLoadingCostCenterBudgets.value = false
    }
  }

  async function create(
    costCenterId: string,
    month: number,
    year: number,
    currency: string,
    amount: number
  ) {
    isCreatingCostCenterBudget.value = true
    try {
      const response = await axios.post(
        'cost-centers' + '/' + costCenterId + '/budgets',
        JSON.stringify({
          month,
          year,
          amount: {
            currency,
            value: amount
          }
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 201) {
        throw new Error(response.data.message)
      }
    } catch (error: any) {
      createErrorMessage.value = error.message
      setTimeout(() => {
        createErrorMessage.value = null
      }, 5000)
    } finally {
      isCreatingCostCenterBudget.value = false
    }
  }

  return {
    load,
    create,
    costCenterBudgets,
    totalPages,
    isLoadingCostCenterBudgets,
    isCreatingCostCenterBudget,
    createErrorMessage
  }
})
