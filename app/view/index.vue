<template>
  <PageRootContainer>
    <PageContainer>
      <div v-redirect="'/order'">To Order</div>
    </PageContainer>
  </PageRootContainer>
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>
