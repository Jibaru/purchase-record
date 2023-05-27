<template>
  <base-title class="title">Registro de compras</base-title>
  <purchase-records-filter />
  <purchase-records-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PurchaseRecordsFilter from '../components/PurchaseRecordsFilter.vue'
import PurchaseRecordsTable from '../components/PurchaseRecordsTable.vue'

export default defineComponent({
  components: {
    'purchase-records-filter': PurchaseRecordsFilter,
    'purchase-records-table': PurchaseRecordsTable
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
