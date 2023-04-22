<template>
  <span>
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
<style lang="css" scoped>
span {
  display: block;
  background-clip: padding-box;
  position: relative;
  min-width: 0;
  word-wrap: break-word;
  background-color: #bbe4aa;
  background-clip: border-box;
  border: 0 solid #3adb70;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  margin: 0.2rem;
}
</style>
