export interface DetailedVoucher {
  id: number
  series_number: string
  issue_date: string
  due_date?: string
  type: string
  notes: string[]
  currency: string
  supplier: {
    name?: string
    document?: {
      type?: string
      value?: string
    }
    address?: string
  }
  customer: {
    name?: string
    document?: {
      type?: string
      value?: string
    }
    address?: string
  }
  lines: {
    quantity: number
    unit: string
    unit_value: number
    total: number
    description?: string
  }[]
  summary: {
    subtotal: number
    discount: number
    total: number
    other_charges: number
    prepaid: number
    igv: number
    isc: number
    icbper: number
    other_tributes: number
  }
}
