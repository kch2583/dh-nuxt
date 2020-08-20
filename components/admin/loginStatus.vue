<template>
  <div v-if="this.$store.state.authUser.username" align="center" justify="center">
    Hello,
    {{ this.$store.state.authUser.username}}
    <div>
      <v-btn color="blue darken-1" @click="logout">로그아웃</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout").then(() => this.$router.push("/"));
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style></style>
