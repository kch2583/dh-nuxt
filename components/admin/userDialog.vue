<template>
  <div>
    <v-col cols="12">
      <v-btn
        class="mx-2"
        fab
        dark
        color="indigo"
        @click.stop="userDialog = true"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-col>

    <v-dialog v-model="userDialog" max-width="500">
      <v-card>
        <v-row>
          <v-col>
            <v-card-title>회원가입</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="createUser(user)">
                <v-text-field
                  v-model="user.name"
                  placeholder="이름을 입력하세요"
                  label="Name"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="user.uid"
                  placeholder="아이디를 입력하세요"
                  label="ID"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  placeholder="비밀번호를 입력하세요"
                  v-model="user.password"
                  @click:append="show2 = !show2"
                  outlined
                ></v-text-field>
                <v-btn
                  block
                  color="green darken-1"
                  text
                  type="submit"
                  @click.stop="userDialog = false"
                  outlined
                  >확인</v-btn
                >
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
  data() {
    return {
      show2: false,
      userDialog: false,
      user: {
        uid: "",
        password: "",
        name: ""
      }
    };
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
