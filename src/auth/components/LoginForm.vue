<template>
  <base-card id="card">
    <form @submit.prevent="authenticate">
      <base-title>Registro de compras</base-title>
      <base-label>Email</base-label>
      <base-input type="email" required v-model="email" :disabled="isLogIn" />
      <base-label>Password</base-label>
      <base-input type="password" required v-model="password" :disabled="isLogIn" />
      <base-alert v-if="isLogIn">Ingresando...</base-alert>
      <base-button v-else id="button" :disabled="isLogIn">Ingresar</base-button>
    </form>
    <base-alert v-if="logInErrorMessage !== null">{{ logInErrorMessage }}</base-alert>
  </base-card>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  data() {
    return {
      email: '' as string,
      password: '' as string
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isLogIn', 'logInErrorMessage'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logIn']),
    authenticate(): void {
      this.logIn(this.email, this.password)
    }
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
