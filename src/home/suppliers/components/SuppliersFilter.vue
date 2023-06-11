<template>
  <base-card>
    <form @submit.prevent="filter">
      <base-label>Año</base-label>
      <base-input type="number" v-model="year" :disabled="isLoadingSuppliers" />
      <base-label>Mes</base-label>
      <base-input type="number" v-model="month" :disabled="isLoadingSuppliers" />
      <base-button :disabled="isLoadingSuppliers"> Aplicar </base-button>
    </form>
  </base-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSupplierStore } from '../stores/supplier'

export default defineComponent({
  data() {
    return {
      year: null,
      month: null,
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useSupplierStore, ['isLoadingSuppliers'])
  },
  methods: {
    ...mapActions(useSupplierStore, ['load', 'setPeriod']),
    filter(): void {
      if (this.year !== null && this.month !== null) {
        this.setPeriod(this.year, this.month)
        this.load(1, 15)
      }
    }
  }
})
</script>
<style></style>
