<template>
  <div v-if="voucher !== null">
    <base-title>{{ voucher.series_number.includes('F') ? 'FACTURA ELECTRÓNICA' : 'RECIBO POR HONORARIOS' }}</base-title>
    <section id="seller">
      <base-card>
        <base-paragraph>
          <b>RUC: {{ voucher.supplier.document?.value }}</b>
        </base-paragraph>
        <base-paragraph>{{ voucher.series_number }}</base-paragraph>
      </base-card>
      <base-card id="seller-info">
        <b>{{ voucher.supplier.name }}</b>
        <base-paragraph>{{ voucher.supplier.address }}</base-paragraph>
      </base-card>
    </section>
    <base-card id="supplier-info">
      <div>
        <b>Fecha de emisión:</b>
        <base-paragraph>{{ voucher.issue_date }}</base-paragraph>
      </div>
      <div>
        <b>Fecha de vencimiento:</b>
        <base-paragraph>{{ voucher.due_date ?? '---' }}</base-paragraph>
      </div>
      <div>
        <b>Señor (es):</b>
        <base-paragraph>{{ voucher.customer.name }}</base-paragraph>
      </div>
      <div>
        <b>RUC:</b>
        <base-paragraph>{{ voucher.customer.document?.value }}</base-paragraph>
      </div>
      <div>
        <b>Establecimiento del emisor:</b>
        <base-paragraph>{{ voucher.customer.address }}</base-paragraph>
      </div>
      <div>
        <b>Tipo de moneda:</b>
        <base-paragraph>{{ voucher.currency }}</base-paragraph>
      </div>
      <div>
        <b>Extras:</b>
        <ul>
          <li v-for="note of voucher.notes">
            {{ note }}
          </li>
        </ul>
      </div>
    </base-card>
    <base-card id="lines-info">
      <base-table>
        <thead>
          <th>Cantidad</th>
          <th>Unidad de Medida</th>
          <th>Descripción</th>
          <th>Valor Unitario</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr v-for="line of voucher.lines">
            <td>{{ line.quantity }}</td>
            <td>{{ line.unit }}</td>
            <td>{{ line.description }}</td>
            <td>{{ numberFormat(line.unit_value) }}</td>
            <td>{{ numberFormat(line.total) }}</td>
          </tr>
        </tbody>
      </base-table>
    </base-card>
    <section id="summary-info">
      <span></span>
      <base-card id="total-info">
        <base-table>
          <tbody id="total-info-lines">
            <tr>
              <td>Subtotal Venta:</td>
              <td>{{ numberFormat(voucher.summary.subtotal) }}</td>
            </tr>
            <tr>
              <td>Anticipos:</td>
              <td>{{ numberFormat(voucher.summary.prepaid) }}</td>
            </tr>
            <tr>
              <td>Descuentos:</td>
              <td>{{ numberFormat(voucher.summary.discount) }}</td>
            </tr>
            <tr>
              <td>ISC:</td>
              <td>{{ numberFormat(voucher.summary.isc) }}</td>
            </tr>
            <tr>
              <td>IGV:</td>
              <td>{{ numberFormat(voucher.summary.igv) }}</td>
            </tr>
            <tr>
              <td>ICBPER:</td>
              <td>{{ numberFormat(voucher.summary.icbper) }}</td>
            </tr>
            <tr>
              <td>Otros Cargos:</td>
              <td>{{ numberFormat(voucher.summary.other_charges) }}</td>
            </tr>
            <tr>
              <td>Otros Tributos:</td>
              <td>{{ numberFormat(voucher.summary.other_charges) }}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{{ numberFormat(voucher.summary.total) }}</td>
            </tr>
          </tbody>
        </base-table>
      </base-card>
    </section>
  </div>
  <base-alert v-else>Cargando comprobante...</base-alert>
</template>
<script lang="ts">
import { useVoucherStore } from '@/home/vouchers/stores/voucher'
import { mapActions, mapState } from 'pinia'
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  computed: {
    ...mapState(useVoucherStore, ['voucher'])
  },
  methods: {
    ...mapActions(useVoucherStore, ['loadSingle']),
    numberFormat(num: number | null): string {
      if (num === null) {
        return '0.00'
      } else {
        return num.toFixed(2)
      }
    }
  },
  mounted(): void {
    this.loadSingle(this.id)
  }
})
</script>
<style lang="css" scoped>
#seller {
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

#seller-info {
  width: 100%;
}

#supplier-info,
#lines-info,
#summary-info {
  margin-top: 1rem;
}

#summary-info {
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

#total-info {
  width: fit-content;
}

#total-info-lines > tr > td {
  width: fit-content;
  padding-bottom: 0.5rem;
}

#total-info-lines > tr > td:first-child {
  width: fit-content;
  font-weight: bold;
  padding-right: 5rem;
}

#total-info-lines > tr > td:last-child {
  text-align: right;
}
</style>
