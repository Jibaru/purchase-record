<template>
  <button>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>
<style lang="css" scoped>
button {
  color: #fff;
  background-color: #696cff;
  border-color: #696cff;
  box-shadow: 0 0.125rem 0.25rem 0 rgba(105, 108, 255, 0.4);
  display: inline-block;
  font-weight: 400;
  line-height: 1.53;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  padding: 0.4375rem 1.25rem;
  margin: 14px 0;
  font-size: 0.9375rem;
  border-radius: 0.375rem;
}
</style>
