<template>
  <base-card v-if="!isLoadingCostCenterBudgets">
    <base-table>
      <thead>
        <th>Periodo</th>
        <th>Moneda</th>
        <th>Monto Actual</th>
        <th>Fecha de registro</th>
        <th>Fecha de actualización</th>
      </thead>
      <tbody>
        <tr v-for="costCenterBudget in costCenterBudgets" :key="costCenterBudget.id">
          <td>
            {{ costCenterBudget.period }}
          </td>
          <td>
            <base-badge color="secondary">{{ costCenterBudget.currency }}</base-badge>
          </td>
          <td>
            {{ costCenterBudget.amount }}
          </td>
          <td>
            <base-badge color="success">{{ costCenterBudget.createdAt.toISOString() }}</base-badge>
          </td>
          <td>
            <base-badge color="success">{{ costCenterBudget.updatedAt.toISOString() }}</base-badge>
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
  <base-alert v-else>Cargando presupuestos de centro de costos...</base-alert>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useCostCenterBudgetStore } from '../stores/cost-center-budget'

export default defineComponent({
  props: {
    costCenterId: {
      type: String as PropType<string>,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useCostCenterBudgetStore, [
      'costCenterBudgets',
      'totalPages',
      'isLoadingCostCenterBudgets'
    ])
  },
  methods: {
    ...mapActions(useCostCenterBudgetStore, ['load']),
    selectPage(page: number): void {
      this.currentPage = page
    }
  },
  watch: {
    currentPage(newVal: number): void {
      this.load(this.costCenterId, newVal)
    }
  },
  mounted() {
    this.load(this.costCenterId, this.currentPage)
  }
})
</script>
