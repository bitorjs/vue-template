<template>
  <div class="tab">
    <span v-redirect="'/'">首页</span>
    <span v-redirect="'/order'">订单</span>
    <span v-redirect="'/notfount'">404</span>
    <span v-redirect="'/person/5'">个人中心</span>
  </div>
</template>
<script>
export default {
  name: "Tab"
};
</script>
<style lang="less" scoped>
.tab {
  display: block;
  width: 100%;
  font-size: 0;
  cursor: pointer;

  span {
    display: inline-block;
    width: 25%;
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
  }
}
</style>


