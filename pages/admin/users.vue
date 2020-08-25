<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12">
      <userDialog></userDialog>
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
  components: { usersTable, userDialog }
};
</script>

<style>
</style>