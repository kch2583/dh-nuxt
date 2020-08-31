<template>
  <v-row>
    <v-col cols="12">
      <createProduct></createProduct>
    </v-col>
    <v-col cols="12">
      <productsTable></productsTable>
    </v-col>
    <v-col cols="12">
      <typeInfo></typeInfo>
    </v-col>
  </v-row>
</template>

<script>
import productsTable from "../../components/admin/productsTable";
import typeInfo from "../../components/admin/typeInfo";
import createProduct from "../../components/admin/createProduct";
export default {
  // middleware: "auth",
  components: {
    productsTable,
    typeInfo,
    createProduct
  }
};
</script>

<style>
</style>