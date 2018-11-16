<template>
  <div class="page-root" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "PageRootContainer",
    props:{
      styles: Object
    }
  }
</script>
<style lang="less" scoped>
.page-root{
  width: 100%;
  padding-bottom: 1rem;
}
</style>