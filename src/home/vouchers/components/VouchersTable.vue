<template>
  <base-card v-if="!isLoadingVouchers">
    <base-table>
      <thead>
        <th>Fecha de subida</th>
        <th>Fecha de emisión</th>
        <th>Emisor</th>
        <th>Receptor</th>
        <th>Monto total</th>
        <th>Más</th>
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
          <td>
            <base-button @click="goToDetailed(voucher.id)">Ver más</base-button>
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
  <base-alert v-else>Cargando comprobantes...</base-alert>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useVoucherStore } from '../stores/voucher'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useVoucherStore, ['vouchers', 'totalPages', 'isLoadingVouchers'])
  },
  methods: {
    ...mapActions(useVoucherStore, ['load']),
    selectPage(page: number): void {
      this.currentPage = page
    },
    goToDetailed(id: string): void {
      this.$router.push({
        name: 'voucher',
        params: {
          id: id
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
