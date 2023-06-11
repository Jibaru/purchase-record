<template>
  <Transition name="slide-fade">
    <aside>
      <base-title id="title">Registro de compras</base-title>
      <ul>
        <router-link to="/" @click="overlayClicked">
          <li><font-awesome-icon icon="fa-house" /> Home</li>
        </router-link>
        <router-link to="/users" @click="overlayClicked">
          <li v-if="canManageUsers()"><font-awesome-icon icon="fa-user" /> Usuarios</li>
        </router-link>
        <router-link to="/vouchers" @click="overlayClicked">
          <li v-if="canManageVouchers()">
            <font-awesome-icon icon="fa-file-invoice" /> Comprobantes
          </li>
        </router-link>
        <router-link to="/purchase-records" @click="overlayClicked">
          <li v-if="canManagePurchaseRecords()">
            <font-awesome-icon icon="fa-money-bill" /> Registro de compras
          </li>
        </router-link>
        <router-link to="/suppliers" @click="overlayClicked">
          <li v-if="canManageInventory()">
            <font-awesome-icon icon="fa-truck-field" /> Proveedores
          </li>
        </router-link>
        <router-link to="/items" @click="overlayClicked">
          <li v-if="canManageInventory()"><font-awesome-icon icon="fa-box" /> Artículos</li>
        </router-link>
      </ul>
    </aside>
  </Transition>
  <div id="overlay" @click="overlayClicked"></div>
</template>
<script lang="ts">
import { useAuthStore } from '@/auth/stores/auth'
import { mapActions } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['overlay-click'],
  data() {
    return {}
  },
  methods: {
    ...mapActions(useAuthStore, [
      'canManageUsers',
      'canManageInventory',
      'canManagePurchaseRecords',
      'canManageVouchers'
    ]),
    overlayClicked(): void {
      this.$emit('overlay-click')
    }
  }
})
</script>
<style lang="css" scoped>
aside {
  z-index: 1100;
  position: fixed !important;
  top: 0 !important;
  height: 100% !important;
  left: 0 !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
  will-change: transform, -webkit-transform;
  flex: 1 0 auto;
  min-height: 1px;
  width: 16.25rem;
  flex-direction: column;
  display: flex;
  background: white;
  padding: 0.5rem;
}

#title {
  margin: 1rem 0;
  text-align: center;
}

ul {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  height: 100%;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: auto;
}

li {
  padding: 0.5rem;
  list-style: none;
  flex: 0 0 auto;
  display: list-item;
  text-align: -webkit-match-parent;
  width: 96%;
  margin: 0.2rem;
  font-weight: bold;
}

li:hover {
  color: #696cff;
  background-color: rgba(105, 108, 255, 0.16) !important;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

#overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: #435971;
  opacity: 0.5;
  cursor: pointer;
  z-index: 1099;
  width: 100vw;
  height: 100vh;
  display: block;
}

.slide-fade-enter-active {
  transition: transform 0.3s ease-out;
  transform: translateX(30%);
}

.slide-fade-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(0%);
}

a {
  width: 100%;
}
</style>
