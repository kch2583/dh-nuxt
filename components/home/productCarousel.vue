<template>
  <div>
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item v-for="n in Products" :key="n._id">
        <nuxt-link :to="`/products/${n._id}`">
          <v-card class="ma-4" height="200" width="100">
            <v-card-title>{{ n.number }}</v-card-title>
          </v-card>
        </nuxt-link>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: 0,
      showArrows: true,
      hideDelimiters: true,
      cycle: false,

      Products: []
    };
  },
  created() {
    this.$http.get("/api/product", {}).then(response => {
      this.Products = response.data;
    });
  }
};
</script>