<template>
  <base-card>
    <form @submit.prevent="submit">
      <base-label>Nombre</base-label>
      <base-input v-model="name" :disabled="isCreatingUser" required />
      <base-label>Correo Electrónico</base-label>
      <base-input type="email" v-model="email" :disabled="isCreatingUser" required />
      <base-label>Contraseña</base-label>
      <base-input v-model="password" :disabled="isCreatingUser" required />
      <base-button v-if="!isCreatingUser">Registrar</base-button>
      <base-alert v-else>Registrando...</base-alert>
      <base-alert v-if="createErrorMessage !== null">{{ createErrorMessage }}</base-alert>
    </form>
  </base-card>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useUserStore } from '../stores/user'

export default defineComponent({
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(useUserStore, ['isCreatingUser', 'createErrorMessage'])
  },
  methods: {
    ...mapActions(useUserStore, ['create', 'load']),
    async submit(): Promise<void> {
      await this.create(this.name, this.email, this.password)
      this.name = ''
      this.email = ''
      this.password = ''
      this.load(1, 15)
    }
  }
})
</script>
