<template>
  <div class="container">
    {{message}}
    <p>
      <a href="#a">a</a>
      <button class="header" @click="func">Button</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      message: "Hello, bitor"
    };
  },
  methods: {
    func: function() {
      console.log(this);
      // this.$bitor.ctx.reload();

      return 1;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  .header {
    background: red;
  }
}
</style>
