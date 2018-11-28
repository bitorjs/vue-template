<template>
  <center>
    <div>个人中心-{{this.userid}}</div>
  </center>
</template>
<script>
export default {
  name: "Person",
  props: {
    userid: String
  },
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    // console.log("!@##", this.userid);
    setInterval(() => {
      this.$bitor.redirect(`/person/${this.count++}`);
      // console.log(this.userid);
    }, 2000);
  },
  updateProps(props) {
    console.log("...@@@ person", props);
  }
};
</script>
