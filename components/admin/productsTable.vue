<template>
  <div>
    <productDialog :showDialog="editForm" :editProduct="currentProduct"></productDialog>
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
  </div>
</template>

<script>
import productDialog from "../admin/productDialog";
export default {
  components: {
    productDialog
  },
  data() {
    return {
      editForm: false,
      productLists: [],
      currentProduct: {},
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

        { text: "Delete", value: "delete", sortable: false }
      ]
    };
  },
  created() {
    this.$http.get("/api/product").then(res => (this.productLists = res.data));
  },
  methods: {
    openEditForm(item) {
      this.editForm = !this.editForm;
      this.currentProduct = item;
    },
    deleteProduct(item) {
      const index = this.productLists.indexOf(item);
      this.currentProduct = Object.assign({}, item);
      var id = item._id;
      if (confirm("정말로 삭제하시겠습니까?") == true) {
        this.productLists.splice(index, 1);
        this.$http
          .delete(`/api/product/${id}`, {
            product: this.currentProduct
          })
          .then(response => {
            this.alert = true;
          })
          .catch(function(error) {
            console.log(error);
          });
        alert("정상적으로 삭제되었습니다.");
      } else {
        return alert("삭제가 취소되었습니다.");
      }
    }
  }
};
</script>

<style></style>
