<template>
  <div>
    <v-dialog v-model="userDialog" max-width="500">
      <v-card>
        <v-row>
          <v-col>
            <v-card-title>{{ userDialogTitle}}</v-card-title>
            <v-card-text>
              <!-- 회원가입 & 비밀번호 변경 form -->
              <v-form @submit.prevent="createUser(user)">
                <!-- 이름 -->
                <v-text-field
                  v-model="user.name"
                  placeholder="이름을 입력하세요"
                  label="Name"
                  required
                  outlined
                  :disabled="disabled"
                ></v-text-field>
                <!-- 아이디 -->
                <v-text-field
                  v-model="user.uid"
                  placeholder="아이디를 입력하세요"
                  label="ID"
                  required
                  outlined
                  :disabled="disabled"
                ></v-text-field>

                <!-- 회원가입을 위한 비밀번호 -->
                <div v-if="!this.editUser">
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="Password"
                    placeholder="비밀번호를 입력하세요"
                    v-model="user.password"
                    @click:append="show2 = !show2"
                    outlined
                  ></v-text-field>
                </div>

                <!-- 비밀번호 변경을 위한 현재 비밀번호, 새 비밀번호 입력칸 -->
                <div v-if="this.editUser">
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="Current Password"
                    placeholder="비밀번호를 입력하세요"
                    v-model="user.CurrentPassword"
                    @click:append="show2 = !show2"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="New Password"
                    placeholder="새 비밀번호를 입력하세요"
                    v-model="user.newPassword"
                    @click:append="show2 = !show2"
                    :rules="passwordRules"
                    outlined
                  ></v-text-field>
                </div>

                <!-- 비밀번호 확인 -->
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password Check"
                  placeholder="비밀번호를 한번더 입력하세요"
                  v-model="user.passwordCheck"
                  @click:append="show2 = !show2"
                  :rules="matchRules"
                  outlined
                ></v-text-field>
                <!-- 확인 버튼 submit -->
                <v-btn
                  block
                  color="green darken-1"
                  text
                  type="submit"
                  @click.stop="userDialog = false"
                  outlined
                >확인</v-btn>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, required: true },
    userDialogTitle: { type: String, required: true },
    editUser: Object,
    showUserDialog: Boolean
  },
  data() {
    return {
      show2: false,
      userDialog: false,
      minLength: 10,
      user: {
        uid: "",
        password: "",
        name: "",
        passwordCheck: "",
        newPassword: "",
        CurrentPassword: ""
      }
    };
  },
  watch: {
    showUserDialog() {
      this.userDialog = true;
      console.log(this.editUser);

      if (this.editUser) {
        this.user = this.editUser;
      }
    }
  },
  computed: {
    matchRules() {
      const rules = [];
      if (this.user.newPassword) {
        const rule = v =>
          (!!v && v) === this.user.newPassword ||
          "비밀번호가 일치하지 않습니다.";

        rules.push(rule);
      } else {
        if (this.user.CurrentPassword) {
          const rule = v =>
            (!!v && v) === this.user.CurrentPassword ||
            "비밀번호가 일치하지 않습니다.";

          rules.push(rule);
        }
      }

      return rules;
    },
    passwordRules() {
      const rules = [];
      if (this.minLength) {
        const rule = v =>
          (v || "").length >= this.minLength ||
          ` 최소 ${this.minLength}글자 이상이 필요합니다.`;

        rules.push(rule);
      }
      const pattern = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
      if (pattern) {
        const rule = v =>
          pattern.test(v) ||
          "문자, 숫자, 특수문자를 적어도 1개씩 사용하여야 합니다.";

        rules.push(rule);
      }
      return rules;
    }
  },
  methods: {
    async createUser(user) {
      try {
        // EDIT user PUT /api/user/${id}
        if (user._id) {
          var id = user._id;
          await this.$http
            .put(`/api/user/${id}`, {
              user: user
            })
            .then(function(res) {
              if (res.ok) {
                console.log("success");
              }
            });
        } else {
          // CREATE product POST /api/user
          console.log("post");

          await this.$http
            .post("/api/user", {
              user: user
            })
            .then(function(res) {
              if (res.ok) {
                console.log("success");
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
