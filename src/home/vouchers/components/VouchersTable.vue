<template>
  <base-card v-if="!isLoadingVouchers">
    <base-table>
      <thead>
        <th>Fecha de subida</th>
        <th>Fecha de emisión</th>
        <th>Emisor</th>
        <th>Receptor</th>
        <th>Monto total</th>
      </thead>
      <tbody>
        <tr v-for="voucher in vouchers" :key="voucher.id">
          <td>
            <base-badge color="primary">{{ voucher.createdAt }}</base-badge>
          </td>
          <td>
            <base-badge color="secondary">{{ voucher.issueDate }}</base-badge>
          </td>
          <td>{{ voucher.customer }}</td>
          <td>{{ voucher.supplier }}</td>
          <td>
            <b>{{ voucher.total }}</b>
          </td>
        </tr>
      </tbody>
    </base-table>
  </base-card>
  <base-alert v-else>Cargando comprobantes...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useVoucherStore } from '../stores/voucher'

export default defineComponent({
  data() {
    return {}
  },
  computed: {
    ...mapState(useVoucherStore, ['vouchers', 'isLoadingVouchers'])
  },
  methods: {
    ...mapActions(useVoucherStore, ['load'])
  },
  mounted() {
    this.load(1)
  }
})
</script>
