<template>
  <base-title class="title">Usuarios</base-title>
  <user-form />
  <users-table id="table" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import UsersTable from '../components/UsersTable.vue'
import UserForm from '../components/UserForm.vue'

export default defineComponent({
  components: {
    'users-table': UsersTable,
    'user-form': UserForm
  },
  data() {
    return {}
  }
})
</script>
<style lang="css" scoped>
#table {
  margin-top: 1rem;
}

.title {
  margin-bottom: 1rem;
}
</style>
