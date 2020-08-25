<template>
  <v-dialog persistent v-model="loginDialog" max-width="290">
    <v-card>
      <v-form @submit.prevent="login">
        <v-card-text>
          <p v-if="formError" class="error">{{ formError }}</p>
          <v-text-field
            v-model="loginID"
            placeholder="아이디를 입력하세요"
            label="User ID"
            required
            outlined
          />

          <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show2 ? 'text' : 'password'"
            label="Password"
            placeholder="비밀번호를 입력하세요"
            v-model="password"
            @click:append="show2 = !show2"
            outlined
          ></v-text-field>

          <v-btn block color="blue darken-1" type="submit">로그인</v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      loginDialog: true,
      loginID: "",
      password: "",
      formError: null,
      show2: false,
      rules: {
        required: value => !!value || "Required.",

        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },

  methods: {
    redirect() {
      console.log("login redirect");

      this.$router.push("/admin");
    },
    async login() {
      try {
        await this.$store
          .dispatch("login", {
            username: this.loginID,
            password: this.password
          })
          .then(res => {
            this.redirect();
          });
        this.loginID = "";
        this.password = "";
        this.formError = null;
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style></style>
