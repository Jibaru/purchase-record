<template>
  <base-card v-if="!isLoadingSupplierItems">
    <legend>Artículos que fueron comprados a este proveedor</legend>
    <base-table>
      <thead>
        <th>Código</th>
        <th>Descripción</th>
        <th>Cantidad Total</th>
        <th>Precio Unitario Promedio</th>
      </thead>
      <tbody>
        <tr v-for="item in supplierItems" :key="item.reference">
          <td>
            <base-badge>
              {{ item.code }}
            </base-badge>
          </td>
          <td>
            {{ item.description }}
          </td>
          <td>{{ numberFormat(item.totalQuantity) }}</td>
          <td>S/. {{ numberFormat(item.unitPriceAverage) }}</td>
        </tr>
      </tbody>
    </base-table>
  </base-card>
  <base-alert v-else>Cargando artículos...</base-alert>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSupplierStore } from '../stores/supplier'

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
    ...mapState(useSupplierStore, ['supplierItems', 'isLoadingSupplierItems'])
  },
  methods: {
    ...mapActions(useSupplierStore, ['loadItems']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    }
  },
  mounted() {
    this.loadItems(this.id)
  }
})
</script>
<style></style>
