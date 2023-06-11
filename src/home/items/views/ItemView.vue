<template>
  <base-title class="title">
    Artículo referencia: <base-badge>{{ reference }}</base-badge>
  </base-title>
  <item-suppliers-table :id="reference" />
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ItemSuppliersTable from '../components/ItemSuppliersTable.vue'

export default defineComponent({
  props: {
    reference: {
      type: String as PropType<string>,
      required: true
    }
  },
  components: {
    'item-suppliers-table': ItemSuppliersTable
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
