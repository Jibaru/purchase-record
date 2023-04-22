<template>
  <div id="table-container">
    <table>
      <slot></slot>
    </table>
  </div>
</template>
<style lang="css" scoped>
#table-container {
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
}
</style>
