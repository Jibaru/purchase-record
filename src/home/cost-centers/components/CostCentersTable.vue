<template>
  <base-card v-if="!isLoadingCostCenters">
    <base-table>
      <thead>
        <th>Nombre</th>
        <th>Código</th>
        <th>Fecha de registro</th>
        <th>Más</th>
      </thead>
      <tbody>
        <tr v-for="costCenter in costCenters" :key="costCenter.id">
          <td>
            {{ costCenter.name }}
          </td>
          <td>
            <base-badge color="secondary">{{ costCenter.code }}</base-badge>
          </td>
          <td>
            <base-badge color="success">{{ costCenter.createdAt.toISOString() }}</base-badge>
          </td>
          <td>
            <base-button type="button" @click="toBudgets(costCenter.id)">Ver más</base-button>
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
  <base-alert v-else>Cargando usuarios...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useCostCenterStore } from '../stores/cost-center'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useCostCenterStore, ['costCenters', 'totalPages', 'isLoadingCostCenters'])
  },
  methods: {
    ...mapActions(useCostCenterStore, ['load']),
    selectPage(page: number): void {
      this.currentPage = page
    },
    toBudgets(id: string): void {
      this.$router.push({
        name: 'costCenterBudgets',
        params: {
          costCenterId: id
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
