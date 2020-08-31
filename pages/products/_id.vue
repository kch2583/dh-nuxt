<template>
  <div>hi</div>
</template>

<script>
export default {
  data() {
    return {
      productDetails: {}
    };
  },
  // watch: {
  //   // 라우트가 변경되면 메소드를 다시 호출
  //   // '$route': function(ChangeItem){
  //   $route: function() {
  //     var id = this.$route.params.id;
  //     this.$http.get(`/api/products/${id}`).then(res => {
  //       this.productDetails = res.data;
  //     });
  //   }
  // },
  created() {
    var id = this.$route.params.id;
    this.$http.get(`/api/products/${id}`).then(res => {
      this.productDetails = res.data;
    });
  }
};
</script>

<style>
</style>