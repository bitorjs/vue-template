<template>
<PageRootContainer>
  <PageContainer>
    详情 - {{id}}
  </PageContainer>
</PageRootContainer>
</template>
<script>
export default {
  name: "Detail",
  props: {
    id: String
  },
  mounted() {
    console.log(this.id);
  }
};
</script>
