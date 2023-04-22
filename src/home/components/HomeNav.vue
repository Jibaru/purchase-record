<template>
  <nav>
    <ul>
      <li @click="menuClicked">
        <a href="#"><font-awesome-icon icon="fa-bars" /> Menú</a>
      </li>
      <li>Salir</li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['menu-click'],
  data() {
    return {}
  },
  methods: {
    menuClicked(): void {
      this.$emit('menu-click')
    }
  }
})
</script>
<style lang="css" scoped>
nav {
  z-index: 1075;
  max-width: calc(1440px - calc(1.625rem * 2));
  padding: 0.75rem;
  margin: 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 0 0.375rem 0.25rem rgba(161, 172, 184, 0.15);
  background-color: rgba(255, 255, 255, 0.95) !important;
  color: #697a8d;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

li {
  display: block;
  margin: 0;
  padding: 0;
}
</style>
