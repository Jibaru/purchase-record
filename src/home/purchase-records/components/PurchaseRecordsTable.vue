<template>
  <base-card v-if="!isLoadingPurchaseRecords">
    <base-table>
      <thead>
        <th>Periodo</th>
        <th>CUO</th>
        <th>Fecha Emisión</th>
        <th>Fecha Vencimiento</th>
        <th>Tipo Comp.</th>
        <th>Serie Comp.</th>
        <th>Número Comp.</th>
        <th>Tipo Doc. Proveedor</th>
        <th>Nº Doc. Proveedor</th>
        <th>Denominación Proveedor</th>
        <th>Gravado (A)</th>
        <th>IGV (A)</th>
        <th>Gravado (B)</th>
        <th>IGV (B)</th>
        <th>Gravado (C)</th>
        <th>IGV (C)</th>
      </thead>
      <tbody>
        <tr v-for="record in purchaseRecords" :key="record.id">
          <td>
            <base-badge color="secondary">{{ record.period }}</base-badge>
          </td>
          <td>
            <base-badge color="primary">{{
              record.uniqueOperationCode.substring(0, 6)
            }}</base-badge>
          </td>
          <td>
            <base-badge color="success">{{ record.issueDate }}</base-badge>
          </td>
          <td>{{ record.dueDate ?? '-' }}</td>
          <td>{{ record.voucherType }}</td>
          <td>
            <b>{{ record.voucherSeries }}</b>
          </td>
          <td>
            <i>{{ record.voucherNumber }}</i>
          </td>
          <td>{{ record.supplierDocumentType }}</td>
          <td>
            <base-badge color="primary">{{ record.supplierDocumentNumber }}</base-badge>
          </td>
          <td>{{ record.supplierDocumentDenomination }}</td>
          <td>{{ numberFormat(record.firstTaxBase) }}</td>
          <td>{{ numberFormat(record.firstIgvAmount) }}</td>
          <td>{{ numberFormat(record.secondTaxBase) }}</td>
          <td>{{ numberFormat(record.secondIgvAmount) }}</td>
          <td>{{ numberFormat(record.thirdTaxBase) }}</td>
          <td>{{ numberFormat(record.thirdIgvAmount) }}</td>
        </tr>
      </tbody>
    </base-table>
  </base-card>
  <base-alert v-else>Cargando registro de compras...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { usePurchaseRecordStore } from '../stores/purchase-record'

export default defineComponent({
  data() {
    return {}
  },
  computed: {
    ...mapState(usePurchaseRecordStore, ['purchaseRecords', 'isLoadingPurchaseRecords'])
  },
  methods: {
    ...mapActions(usePurchaseRecordStore, ['load']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    }
  },
  mounted() {
    this.load(1)
  }
})
</script>
<style></style>
