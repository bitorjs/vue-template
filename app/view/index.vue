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
  mounted() {
    console.log("&&%%%%", this.get("/api/default"));
    console.log("&&%%%%", this.post("/api/person/45"));
    console.log("&&%%%%", this.delete("/api/detail"));
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
