<template>
  <div>
    <v-card rounded elevation="6">
      <v-card-title class="text-h6">{{productDetails.number}}</v-card-title>

      <v-img v-if="productDetails.image" :src="require('../../static/' + productDetails.image)"></v-img>
      <v-card-text>
        <v-chip-group multiple column draggable>
          <div v-for="type in productType" :key="type.typeNumber">
            <v-chip v-if="type.typeNumber === productDetails.type">{{ type.type }}</v-chip>
          </div>
          <v-chip :color="productDetails.color">{{ productDetails.color }}</v-chip>

          <v-chip v-for="p in productDetails.pattern" :key="p">{{ p }}</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
    <v-card class="transparent" flat>
      <v-card-actions>
        <nuxt-link to="/products">
          <v-btn outlined>목록으로</v-btn>
        </nuxt-link>
      </v-card-actions>
    </v-card>
    <v-col>
      <productCarousel></productCarousel>
    </v-col>
  </div>
</template>

<script>
import pType from "../../data/productType.json";
import productCarousel from "../../components/home/productCarousel";
export default {
  components: {
    productCarousel
  },
  data() {
    return {
      productDetails: {},
      productType: pType
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