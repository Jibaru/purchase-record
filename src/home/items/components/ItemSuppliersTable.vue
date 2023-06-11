<template>
  <base-card v-if="!isLoadingItemSuppliers">
    <legend>Proveedores a los que se compró este artículo</legend>
    <base-table>
      <thead>
        <th>Tipo</th>
        <th>Denominación</th>
        <th>Razón social</th>
        <th>Total artículos</th>
        <th>Total precio</th>
      </thead>
      <tbody>
        <tr v-for="supplier in itemSuppliers" :key="supplier.reference">
          <td>
            <base-badge>
              {{ supplier.type }}
            </base-badge>
          </td>
          <td>
            {{ supplier.denomination }}
          </td>
          <td>
            <base-badge color="success">{{ supplier.number }}</base-badge>
          </td>
          <td>{{ numberFormat(supplier.totalItems) }}</td>
          <td>S/. {{ numberFormat(supplier.totalPrice) }}</td>
        </tr>
      </tbody>
    </base-table>
  </base-card>
  <base-alert v-else>Cargando proveedores...</base-alert>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useItemStore } from '../stores/item'

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useItemStore, ['itemSuppliers', 'isLoadingItemSuppliers'])
  },
  methods: {
    ...mapActions(useItemStore, ['loadSuppliers']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    }
  },
  mounted() {
    this.loadSuppliers(this.id)
  }
})
</script>
<style></style>
