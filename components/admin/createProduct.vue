<template>
  <v-row justify="center" class="text-center">
    <v-col cols="12">
      <v-btn class="mx-2" fab dark color="indigo" @click.stop="openDialog">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12">
      <productDialog :showDialog="createDialog"></productDialog>
    </v-col>
  </v-row>
</template>

<script>
import productDialog from "./productDialog";
export default {
  components: {
    productDialog
  },

  data() {
    return {
      createDialog: false,

      // product form
      product: {
        number: "",
        imageFileName: "",
        pattern: [],
        type: "",
        color: ""
      }
    };
  },
  methods: {
    openDialog() {
      this.createDialog = !this.createDialog;
    }
  }
};
</script>

<style></style>