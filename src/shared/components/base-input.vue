<template>
  <input :value="inputValue" @input="changeModelValue" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      inputValue: null as string | null
    }
  },
  methods: {
    changeModelValue(event: Event): void {
      if ((event.target as HTMLInputElement).value) {
        this.inputValue = (event.target as HTMLInputElement).value
        this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
      }
    }
  }
})
</script>
<style lang="css" scoped>
input {
  display: block;
  width: 100%;
  padding: 0.4375rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.53;
  color: #697a8d;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d9dee3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
}
</style>
