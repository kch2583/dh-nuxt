<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12">
      <v-btn class="mx-2" fab dark color="indigo" @click.stop="openUserDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="12">
      <userDialog :disabled="false" userDialogTitle="회원가입" :showUserDialog="userDialog"></userDialog>
    </v-col>
    <v-col cols="12">
      <usersTable></usersTable>
    </v-col>
  </v-row>
</template>

<script>
import userDialog from "../../components/admin/userDialog";
import usersTable from "../../components/admin/usersTable";
export default {
  middleware: "auth",
  components: { usersTable, userDialog },
  data() {
    return {
      userDialog: false
    };
  },
  methods: {
    openUserDialog() {
      this.userDialog = !this.userDialog;
    }
  }
};
</script>

<style>
</style>