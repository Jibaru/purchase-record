<template>
  <base-card>
    <form @submit.prevent="submit">
      <base-label>Mes</base-label>
      <base-input type="number" v-model="month" :disabled="isCreatingCostCenterBudget" required />
      <base-label>Año</base-label>
      <base-input type="number" v-model="year" :disabled="isCreatingCostCenterBudget" required />
      <base-label>Monto</base-label>
      <base-input v-model="amount" :disabled="isCreatingCostCenterBudget" required />
      <base-button v-if="!isCreatingCostCenterBudget">Registrar</base-button>
      <base-alert v-else>Registrando...</base-alert>
      <base-alert v-if="createErrorMessage !== null">{{ createErrorMessage }}</base-alert>
    </form>
  </base-card>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent, type PropType } from 'vue'
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
      month: 1,
      year: 2023,
      amount: 0
    }
  },
  computed: {
    ...mapState(useCostCenterBudgetStore, ['isCreatingCostCenterBudget', 'createErrorMessage'])
  },
  methods: {
    ...mapActions(useCostCenterBudgetStore, ['create', 'load']),
    async submit(): Promise<void> {
      await this.create(this.costCenterId, this.month, this.year, 'PEN', this.amount)
      this.month = 1
      this.year = 2023
      this.amount = 0
      this.load(this.costCenterId, 1, 15)
    }
  }
})
</script>
