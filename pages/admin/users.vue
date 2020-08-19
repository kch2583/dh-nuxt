<template>
  <v-row>
    <v-col cols="12">
      <usersTable></usersTable>
    </v-col>
  </v-row>
</template>

<script>
import usersTable from "../../components/admin/usersTable";
export default {
  components: { usersTable }
};
</script>

<style>
</style>