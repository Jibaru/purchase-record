export interface PurchaseRecordDTO {
  id: string
  period: string
  uniqueOperationCode: string
  correlativeAccountingEntryNumber: string
  issueDate: string
  dueDate: string | null
  voucherType: string
  voucherSeries: string
  duaOrDsiIssueYear: string | null
  voucherNumber: string
  dailyOperationsTotalAmount: number | null
  supplierDocumentType: string
  supplierDocumentNumber: string
  supplierDocumentDenomination: string
  firstTaxBase: number | null
  firstIgvAmount: number | null
  secondTaxBase: number | null
  secondIgvAmount: number | null
  thirdTaxBase: number | null
  thirdIgvAmount: number | null
}
