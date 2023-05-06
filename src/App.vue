<template>
  <RouterView />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from './auth/stores/auth'

export default defineComponent({
  methods: {
    ...mapActions(useAuthStore, ['logInFromPersistence'])
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated'])
  },
  watch: {
    isAuthenticated(ok: boolean): void {
      if (ok) {
        this.$router.replace({
          name: 'home'
        })
      } else {
        this.$router.replace({
          name: 'login'
        })
      }
    }
  },
  mounted(): void {
    this.logInFromPersistence()
  }
})
</script>
