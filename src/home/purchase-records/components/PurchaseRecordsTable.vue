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
        <th>Total</th>
        <th>Detracción</th>
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
          <td>{{ record.voucherType }} <base-badge>({{ record.voucherSeries.includes('F') ? 'FACTURA' : 'REC. POR HONORARIOS' }})</base-badge></td>
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
          <td>
            <base-badge>{{ numberFormat(record.payableAmount) }}</base-badge>
          </td>
          <td>
            {{
              record.hasDetraction ? `SI ${percentageFormat(record.detractionPercentage)}` : 'NO'
            }}
          </td>
        </tr>
      </tbody>
    </base-table>
    <base-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @select-page="selectPage"
    />
  </base-card>
  <base-alert v-else>Cargando registro de compras...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { usePurchaseRecordStore } from '../stores/purchase-record'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(usePurchaseRecordStore, [
      'purchaseRecords',
      'totalPages',
      'isLoadingPurchaseRecords'
    ])
  },
  methods: {
    ...mapActions(usePurchaseRecordStore, ['load']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    },
    percentageFormat(num: number | null): string {
      if (num === null) {
        return '- %'
      }

      return `${num} %`
    },
    selectPage(page: number): void {
      this.currentPage = page
    }
  },
  watch: {
    currentPage(newVal: number): void {
      this.load(newVal)
    }
  },
  mounted() {
    this.load(this.currentPage)
  }
})
</script>
<style></style>
