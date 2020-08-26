<template>
  <div v-if="this.$store.state.authUser" align="center" justify="center">
    안녕하세요!
    {{ this.$store.state.authUser.name}} 님
    <div>
      <v-btn color="blue darken-1" text @click="openUserDialog">비밀번호 변경</v-btn>
      <v-btn color="blue darken-1" text @click="logout">로그아웃</v-btn>
    </div>
    <userDialog
      :disabled="true"
      userDialogTitle="비밀번호 변경"
      :showUserDialog="userDialogTF"
      :editUser="this.$store.state.authUser"
    ></userDialog>
  </div>
</template>

<script>
import userDialog from "../admin/userDialog";
export default {
  components: {
    userDialog
  },
  data() {
    return {
      userDialogTF: false
    };
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout").then(() => this.$router.push("/"));
      } catch (e) {
        this.formError = e.message;
      }
    },
    openUserDialog() {
      this.userDialogTF = !this.userDialogTF;
    }
  }
};
</script>

<style></style>
