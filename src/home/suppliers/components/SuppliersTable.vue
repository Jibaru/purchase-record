<template>
  <base-card v-if="!isLoadingSuppliers">
    <base-table>
      <thead>
        <th>Tipo</th>
        <th>Denominación</th>
        <th>Razón social</th>
        <th>Total artículos</th>
        <th>Total precio</th>
        <th>Más</th>
      </thead>
      <tbody>
        <tr v-for="supplier in suppliers" :key="supplier.reference">
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
          <td>
            <base-button type="button" @click="goToDetailed(supplier.reference)"
              >Ver más</base-button
            >
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
  <base-alert v-else>Cargando proveedores...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSupplierStore } from '../stores/supplier'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useSupplierStore, ['suppliers', 'totalPages', 'isLoadingSuppliers'])
  },
  methods: {
    ...mapActions(useSupplierStore, ['load']),
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
        name: 'supplier',
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
