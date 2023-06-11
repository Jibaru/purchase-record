<template>
  <base-title class="title">Artículos</base-title>
  <items-filter />
  <items-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ItemsFilter from '../components/ItemsFilter.vue'
import ItemsTable from '../components/ItemsTable.vue'

export default defineComponent({
  components: {
    'items-filter': ItemsFilter,
    'items-table': ItemsTable
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
