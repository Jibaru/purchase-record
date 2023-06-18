<template>
  <base-card v-if="!isLoadingUsers">
    <base-table>
      <thead>
        <th>Nombre</th>
        <th>Correo Electrónico</th>
        <th>Gestionar Usuarios</th>
        <th>Gestionar Comprobantes</th>
        <th>Gestionar Reg. Compras</th>
        <th>Gestionar Inventario</th>
        <th>Gestionar Presupuestos</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <base-badge color="primary">{{ user.name }}</base-badge>
          </td>
          <td>
            <base-badge color="secondary">{{ user.email }}</base-badge>
          </td>
          <td>
            <input
              type="checkbox"
              :checked="user.canManageUsers()"
              @change="changePermission($event, user.id, 'manage-users')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :checked="user.canManageVouchers()"
              @change="changePermission($event, user.id, 'manage-vouchers')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :checked="user.canManagePurchaseRecords()"
              @change="changePermission($event, user.id, 'manage-purchase-records')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :checked="user.canManageInventory()"
              @change="changePermission($event, user.id, 'manage-inventory')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :checked="user.canManageBudgetAllocations()"
              @change="changePermission($event, user.id, 'manage-budget-allocations')"
            />
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
import { useUserStore } from '../stores/user'

export default defineComponent({
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState(useUserStore, ['users', 'totalPages', 'isLoadingUsers'])
  },
  methods: {
    ...mapActions(useUserStore, ['load', 'addPermission', 'removePermission']),
    selectPage(page: number): void {
      this.currentPage = page
    },
    changePermission(event: Event, userId: string, name: string): void {
      if (event.target instanceof HTMLInputElement) {
        const value = event.target.checked
        if (value) {
          this.addPermission(userId, name)
        } else {
          this.removePermission(userId, name)
        }
      }
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
