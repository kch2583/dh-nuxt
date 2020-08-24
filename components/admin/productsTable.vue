<template>
  <div>
    <v-card>
      <v-card-title>Product Table</v-card-title>

      <v-data-table :headers="headers" :items="productLists">
        <template v-slot:item.edit="{ item }">
          <v-icon @click="openEditForm(item)">fas fa-edit</v-icon>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-icon @click="deleteProduct(item)">far fa-trash-alt</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <createProduct v-if="editForm"></createProduct>
  </div>
</template>

<script>
import createProduct from "../admin/createProduct";
export default {
  components: {
    createProduct
  },
  data() {
    return {
      editForm: false,
      productLists: [],
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
        },
        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ]
    };
  },
  created() {
    this.$http.get("/api/product/").then(res => (this.productLists = res.data));
  },
  methods: {
    openEditForm(item) {
      this.editForm = !this.editForm;
      this.currentProduct = item;
    },
    editProduct(item) {
      var id = item._id;
      this.$http
        .put(`/api/product/${id}`, {
          product: item
        })
        .then(res => {
          if (res.ok) {
            alert("good");
          }
        });
    }
  }
};
</script>

<style></style>
