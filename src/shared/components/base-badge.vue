<template>
  <span :class="color">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  props: {
    color: {
      type: String as PropType<string>,
      default: 'primary',
      validator: (val: string): boolean => {
        const colors = ['primary', 'secondary', 'success', 'danger', 'warning']
        return colors.indexOf(val) !== -1
      }
    }
  }
})
</script>
<style lang="css" scoped>
span {
  box-shadow: 0 0.125rem 0.25rem 0 rgba(105, 108, 255, 0.4);
  display: inline-block;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: bolder;
  padding: 0.2rem;
}

.primary {
  color: #fff;
  background-color: #696cff;
}
.secondary {
  color: #272424;
  background-color: #e9d844;
}
.success {
  color: #fcf3f3;
  background-color: #2a8501;
}
.warning {
  color: #fff;
  background-color: #af640e;
}
.danger {
  color: #fff;
  background-color: #aa2027;
}
</style>
