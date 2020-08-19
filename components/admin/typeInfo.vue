<template>
  <v-card>
    <v-card-title>종류별 사이즈</v-card-title>
    <v-card-subtitle>(1롤 기준) (두께 x 높이 x 길이)</v-card-subtitle>
    <v-card-text>
      <div
        v-for="t in productsType"
        :key="t.typeNumber"
      >({{t.typeNumber}}) {{t.type}} : {{t.thickness}} X {{t.height}} X {{t.length}}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import productType from "../../data/productType.json";
export default {
  data() {
    return {
      productsType: productType
    };
  }
};
</script>

<style>
</style>