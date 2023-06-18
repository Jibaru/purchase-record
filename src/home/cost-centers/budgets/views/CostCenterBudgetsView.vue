<template>
  <base-title class="title">Presupuestos de Centro de Costos</base-title>
  <cost-center-budget-form :cost-center-id="costCenterId" />
  <cost-center-budgets-table id="table" :cost-center-id="costCenterId" />
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import CostCenterBudgetForm from '../components/CostCenterBudgetForm.vue'
import CostCenterBudgetsTable from '../components/CostCenterBudgetsTable.vue'

export default defineComponent({
  components: {
    'cost-center-budget-form': CostCenterBudgetForm,
    'cost-center-budgets-table': CostCenterBudgetsTable
  },
  props: {
    costCenterId: {
      type: String as PropType<string>,
      required: true
    }
  },
  data() {
    return {}
  }
})
</script>
<style lang="css" scoped>
#table {
  margin-top: 1rem;
}

.title {
  margin-bottom: 1rem;
}
</style>
