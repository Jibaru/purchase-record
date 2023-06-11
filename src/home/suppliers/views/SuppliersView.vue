<template>
  <base-title class="title">Proveedores</base-title>
  <suppliers-filter />
  <suppliers-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SuppliersFliter from '../components/SuppliersFilter.vue'
import SuppliersTable from '../components/SuppliersTable.vue'

export default defineComponent({
  components: {
    'suppliers-filter': SuppliersFliter,
    'suppliers-table': SuppliersTable
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
