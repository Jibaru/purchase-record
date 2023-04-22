<template>
  <login-form />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '@/auth/components/LoginForm.vue'

export default defineComponent({
  components: {
    'login-form': LoginForm
  },
  data() {
    return {}
  }
})
</script>
