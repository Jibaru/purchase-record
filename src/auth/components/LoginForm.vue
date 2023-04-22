<template>
  <base-card id="card">
    <form>
      <base-title>Registro de compras</base-title>
      <base-label>Email</base-label>
      <base-input type="email" required />
      <base-label>Password</base-label>
      <base-input type="password" required />
      <base-button id="button">Ingresar</base-button>
    </form>
  </base-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  }
})
</script>
<style lang="css" scoped>
#card {
  width: 300px;
  margin: 2rem auto;
}

#button {
  width: 100%;
}
</style>
