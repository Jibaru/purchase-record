<template>
  <base-title class="title">Centro de Costos</base-title>
  <cost-center-form />
  <cost-centers-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CostCenterForm from '../components/CostCenterForm.vue'
import CostCentersTable from '../components/CostCentersTable.vue'

export default defineComponent({
  components: {
    'cost-center-form': CostCenterForm,
    'cost-centers-table': CostCentersTable
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
