<template>
  <div>
    <v-card>
      <v-card-title>User Table</v-card-title>

      <v-data-table :headers="headers"></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Product Number", align: "center", value: "number" },
        {
          text: "color",
          value: "color"
        },
        {
          text: "type",
          value: "type"
        },
        {
          text: "image",
          value: "image"
        },
        {
          text: "pattern",
          value: "pattern"
        }
      ]
    };
  }
};
</script>

<style>
</style>