export interface CostCenterBudget {
  id: string
  period: string
  currency: string
  amount: number
  costCenterID: string
  createdAt: Date
  updatedAt: Date
}
