<template>
  <base-title class="title">Comprobantes</base-title>
  <register-voucher-form />
  <vouchers-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import RegisterVoucherForm from '../components/RegisterVoucherForm.vue'
import VouchersTable from '../components/VouchersTable.vue'

export default defineComponent({
  components: {
    'register-voucher-form': RegisterVoucherForm,
    'vouchers-table': VouchersTable
  },
  data() {
    return {}
  }
})
</script>
<style lang="css" scoped>
#table {
  margin-top: 1rem;
}

.title {
  margin-bottom: 1rem;
}
</style>
