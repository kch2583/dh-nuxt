<template>
  <div>
    <v-card>
      <v-card-title>User Table</v-card-title>

      <v-data-table :headers="headers" :items="usersLists">
        <template v-slot:item.delete="{ item }">
          <v-icon @click="deleteUser(item)">far fa-trash-alt</v-icon>
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
      currentUser: {},
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
  },
  methods: {
    deleteUser(item) {
      const index = this.usersLists.indexOf(item);
      this.currentUser = Object.assign({}, item);
      var id = item._id;
      if (confirm("Are you sure you want to delete this item?") == true) {
        this.usersLists.splice(index, 1);
        this.$http
          .delete(`/api/user/${id}`, {
            user: this.currentUser
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
