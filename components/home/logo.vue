<template>
  <div>
    <v-row align="center" justify="center">
      <router-link to="/" exact>
        <v-img
          :src="require('../../static/daehyunLogo.png')"
          alt="daehyun Logo"
          contain
          :min-width="minWidth"
          :max-width="maxWidth"
        ></v-img>
      </router-link>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["minWidth", "maxWidth"]
};
</script>

<style></style>
