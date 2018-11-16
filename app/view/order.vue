<template>
<PageRootContainer>
  <PageContainer>
    <div class="order-list">
      <div class="item" v-for="item in list" :key="item.id">
        <p v-redirect="'/order/detail/'+item.id">{{item.name}}</p>
      </div>
    </div>
  </PageContainer>
</PageRootContainer>
</template>
<script>
export default {
  name: "Order",
  data() {
    return {
      list: [
        { name: "A", id: 1 },
        { name: "B", id: 2 },
        { name: "C", id: 3 },
        { name: "D", id: 4 }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.order-list {
  display: block;
  width: 100%;

  .item {
    display: block;
    width: 100%;
    // height: 1.5rem;
    padding: 10px;
    border-bottom: 1px solid #f3f1f1;
  }
}
</style>

