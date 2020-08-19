<template>
  <v-dialog persistent v-model="loginDialog" max-width="290">
    <v-card>
      <v-form>
        <v-card-text>
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
            name="input-10-2"
            label="Password"
            placeholder="비밀번호를 입력하세요"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show2 = !show2"
            outlined
          ></v-text-field>

          <v-btn block color="blue darken-1" @click="dialog = false">
            로그인
          </v-btn>
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
      password: "Password",
      show2: false,
      rules: {
        required: value => !!value || "Required.",

        emailMatch: () => "The email and password you entered don't match"
      }
    };
  }
};
</script>

<style></style>
