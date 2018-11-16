<template>
  <div class="page-container" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "PageContainer",
  props: {
    border: Boolean,
    padding: Boolean,
    paddingLeft: Boolean,
    paddingRight: Boolean,
    paddingTop: Boolean,
    paddingBottom: Boolean
  },
  computed: {
    classes() {
      let classes = [];
      if (this.border) classes.push("border");
      if (this.padding) classes.push("padding");
      else {
        if (this.paddingLeft) classes.push("paddingLeft");
        if (this.paddingRight) classes.push("paddingRight");
        if (this.paddingTop) classes.push("paddingTop");
        if (this.paddingBottom) classes.push("paddingBottom");
      }

      return classes;
    }
  }
};
</script>
<style lang="less" scoped>
.page-container {
  width: 100%;
  padding: 16px;
  background: white;

  &.border {
    border-top: 1px solid #f5f6f8;
  }

  &.padding {
    padding: 0 !important;
  }

  &.paddingLeft {
    padding-left: 0;
  }

  &.paddingRight {
    padding-right: 0;
  }

  &.paddingTop {
    padding-top: 0;
  }

  &.paddingBottom {
    padding-bottom: 0;
  }
}
</style>