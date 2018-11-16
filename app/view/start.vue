<template>
  <PageRootContainer>
    <Header border>头部</Header>
    <Tab></Tab>
    <webview-container></webview-container>
  </PageRootContainer>
  
</template>
<script>
import Tab from "./tab";
export default {
  nane: "StartPage",
  components: {
    Tab
  }
};
</script>
<style lang="less">
* {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
html,
body {
  display: inline-block;
  width: 100%;
  height: 100%;
}
div,
p,
center {
  box-sizing: border-box;
}
</style>

