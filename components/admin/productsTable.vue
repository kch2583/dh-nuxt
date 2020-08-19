<template>
  <div>
    <v-card>
      <v-card-title>Product Table</v-card-title>

      <v-data-table :headers="headers" :items="productLists"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import products from "../../data/product.json";
export default {
  data() {
    return {
      productLists: products,
      headers: [
        { text: "Product Number", align: "center", value: "number" },
        {
          text: "Color",
          value: "color"
        },
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Image",
          value: "image"
        },
        {
          text: "Pattern",
          value: "pattern"
        }
      ]
    };
  }
};
</script>

<style>
</style>