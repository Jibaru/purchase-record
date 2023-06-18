<template>
  <base-card>
    <form @submit.prevent="submit">
      <base-label>Ingrese sus comprobantes en XML</base-label>
      <base-file-input
        type="file"
        multiple
        accept=".xml"
        v-model="files"
        :disabled="isCreatingVouchers"
      />
      <input type="checkbox" :checked="true" v-model="hasBudget" />
      <base-label>¿Tienen presupuesto?</base-label>
      <br />
      <base-label>Código de Centro de Costos</base-label>
      <base-input type="text" v-model="costCenterCode" />
      <base-button v-if="!isCreatingVouchers">Registrar</base-button>
      <base-alert v-else>Registrando...</base-alert>
    </form>
  </base-card>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useVoucherStore } from '../stores/voucher'

export default defineComponent({
  data() {
    return {
      files: [] as File[],
      hasBudget: false as boolean,
      costCenterCode: '' as string
    }
  },
  computed: {
    ...mapState(useVoucherStore, ['isCreatingVouchers'])
  },
  methods: {
    ...mapActions(useVoucherStore, ['create', 'load']),
    async submit(): Promise<void> {
      const files = this.files
      await this.create(files, this.hasBudget, this.costCenterCode)
      this.files = []
      this.load(1)
    }
  }
})
</script>
