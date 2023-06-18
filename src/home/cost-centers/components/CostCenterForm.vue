<template>
  <base-card>
    <form @submit.prevent="submit">
      <base-label>Nombre</base-label>
      <base-input v-model="name" :disabled="isCreatingCostCenter" required />
      <base-label>Código</base-label>
      <base-input v-model="code" :disabled="isCreatingCostCenter" required />
      <base-button v-if="!isCreatingCostCenter">Registrar</base-button>
      <base-alert v-else>Registrando...</base-alert>
      <base-alert v-if="createErrorMessage !== null">{{ createErrorMessage }}</base-alert>
    </form>
  </base-card>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useCostCenterStore } from '../stores/cost-center'

export default defineComponent({
  data() {
    return {
      name: '',
      code: ''
    }
  },
  computed: {
    ...mapState(useCostCenterStore, ['isCreatingCostCenter', 'createErrorMessage'])
  },
  methods: {
    ...mapActions(useCostCenterStore, ['create', 'load']),
    async submit(): Promise<void> {
      await this.create(this.name, this.code)
      this.name = ''
      this.code = ''
      this.load(1, 15)
    }
  }
})
</script>
