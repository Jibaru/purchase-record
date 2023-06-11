<template>
  <base-title class="title">
    Proveedor referencia: <base-badge>{{ reference }}</base-badge>
  </base-title>
  <supplier-items-table :id="reference" />
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import SupplierItemsTable from '../components/SupplierItemsTable.vue'

export default defineComponent({
  props: {
    reference: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    'supplier-items-table': SupplierItemsTable
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
