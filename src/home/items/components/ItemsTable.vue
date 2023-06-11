<template>
  <base-card v-if="!isLoadingItems">
    <base-table>
      <thead>
        <th>Código</th>
        <th>Descripción</th>
        <th>Cantidad Total</th>
        <th>Precio Unitario Promedio</th>
        <th>Más</th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.reference">
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
          <td>
            <base-button type="button" @click="goToDetailed(item.reference)">Ver más</base-button>
          </td>
        </tr>
      </tbody>
    </base-table>
    <base-pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @select-page="selectPage"
    />
  </base-card>
  <base-alert v-else>Cargando artículos...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useItemStore } from '../stores/item'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useItemStore, ['items', 'totalPages', 'isLoadingItems'])
  },
  methods: {
    ...mapActions(useItemStore, ['load']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    },
    selectPage(page: number): void {
      this.currentPage = page
    },
    goToDetailed(reference: string): void {
      this.$router.push({
        name: 'item',
        params: {
          reference: reference
        }
      })
    }
  },
  watch: {
    currentPage(newVal: number): void {
      this.load(newVal)
    }
  },
  mounted() {
    this.load(this.currentPage)
  }
})
</script>
<style></style>
