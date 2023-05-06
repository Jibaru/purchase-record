<template>
  <main>
    <home-nav @menu-click="openMenu" />
    <section>
      <router-view />
    </section>
    <home-menu v-if="menuOpened" @overlay-click="closeMenu" />
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HomeMenu from '@/home/components/HomeMenu.vue'
import HomeNav from '../components/HomeNav.vue'
import { mapState } from 'pinia'
import { useAuthStore } from '@/auth/stores/auth'

export default defineComponent({
  components: {
    'home-menu': HomeMenu,
    'home-nav': HomeNav
  },
  data() {
    return {
      menuOpened: false
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated'])
  },
  methods: {
    openMenu(): void {
      this.menuOpened = true
    },
    closeMenu(): void {
      this.menuOpened = false
    }
  },
  mounted(): void {
    if (!this.isAuthenticated) {
      this.$router.replace({
        name: 'login'
      })
    }
  }
})
</script>
<style lang="css" scoped>
section {
  padding: 0 0.75rem 0.75rem 0.75rem;
}
</style>
