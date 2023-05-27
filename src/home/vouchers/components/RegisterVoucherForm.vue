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
      files: [] as File[]
    }
  },
  computed: {
    ...mapState(useVoucherStore, ['isCreatingVouchers'])
  },
  methods: {
    ...mapActions(useVoucherStore, ['create', 'load']),
    async submit(): Promise<void> {
      const files = this.files
      await this.create(files)
      this.files = []
      this.load(1)
    }
  }
})
</script>
