<template>
  <section>
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
<style lang="css" scoped>
section {
  background-clip: padding-box;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid #d9dee3;
  border-radius: 0.5rem;
  padding: 14px;
}
</style>
