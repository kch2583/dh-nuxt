<template>
  <v-row>
    <v-col cols="12">
      <productsTable></productsTable>
    </v-col>

    <v-col cols="12">
      <usersTable></usersTable>
    </v-col>
  </v-row>
</template>

<script>
import productsTable from "../../components/admin/productsTable";
import usersTable from "../../components/admin/usersTable";
export default {
  components: {
    productsTable,
    usersTable
  }
};
</script>

<style></style>
