<template>
  <div>
    <v-card>
      <v-card-title>User Table</v-card-title>

      <v-data-table :headers="headers" :items="usersLists">
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
export default {
  data() {
    return {
      usersLists: [],
      headers: [
        { text: "Name", align: "center", value: "name" },
        {
          text: "ID",
          value: "uid"
        },

        { text: "Edit", value: "edit", sortable: false },
        { text: "Delete", value: "delete", sortable: false }
      ]
    };
  },
  created() {
    this.$http.get("/api/user").then(res => (this.usersLists = res.data));
  }
};
</script>

<style></style>
