<template>
  <PageRootContainer>
    <PageContainer>
      <div v-redirect="'/order'">To Order</div>
      <div style="padding:20px" @click="mod">修改</div>
      <div>{{$store.name}}
        <span>{{aa}}</span>
      </div>
      <div class="b">{{$cc.name}}</div>
      <div class="n">vm-{{$bb.name}}</div>
      <div class="n">{{$store.$app.name}}</div>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
import Vue from "vue";

const store = new Vue({
  data() {
    return {
      name: "T"
    };
  }
});

Vue.prototype.$bb = store;
Vue.prototype.$cc = {
  name: "e"
};

export default {
  name: "Index",
  data() {
    return {
      message: "Hello, bitor"
    };
  },
  computed: {
    aa() {
      return this.$bb.name;
    }
  },
  mounted() {
    console.log("&&%%%%", this.get("/api/default"));
    console.log("&&%%%%", this.post("/api/person/45"));
    console.log("&&%%%%", this.delete("/api/detail"));
  },
  methods: {
    mod: function() {
      //

      this.$store.$app.name = "Test";
      // this.$set(this.$store._data.vm.$app, "name", "Test");
      // console.log(this);
      // this.$bb.name = "tt";
      this.$cc.name = "gg";
    }
  }
};
</script>
<style lang="less" scoped>
</style>
