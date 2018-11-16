<template>
  <PageRootContainer>
    <PageContainer>
      <div class="top-header">公用头部</div>
      <webview-container></webview-container>
    </PageContainer>
  </PageRootContainer>
  
</template>
<script>
export default {
  nane: "StartPage"
};
</script>
<style lang="less" scoped>
html,
body {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.top-header {
  width: 100%;
  height: 24px;
  background: white;
  text-align: center;
}
</style>

