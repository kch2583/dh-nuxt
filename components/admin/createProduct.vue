<template>
  <v-row justify="center">
    <v-btn class="mx-2" fab dark color="indigo" @click.stop="createDialog = true">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-row>
          <v-col>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="productNumber"
                  placeholder="숫자만 입력하세요"
                  :counter="10"
                  label="Product Number"
                  required
                >
                  <input v-validate="'numeric'" data-vv-as="field" name="numeric_field" type="text" />
                </v-text-field>
                <v-select :items="types" label="Type"></v-select>
                <v-text-field
                  v-model="ImageFileName"
                  :rules="fileNameRules"
                  placeholder="이미지 파일 이름을 입력하세요"
                  label="Image File Name"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
        <v-btn color="green darken-1" text @click="createDialog = false">Disagree</v-btn>

        <v-btn color="green darken-1" text @click="createDialog = false">Agree</v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      createDialog: false,
      productNumber: "",
      ImageFileName: "",
      numberRules: [v => !!v || "번호를 입력하세요"],
      fileNameRules: [
        v => !!v || "이미지 파일 이름을 입력하세요",
        v => /.+..+/.test(v) || "정확한 파일 이름을 입력하세요"
      ],
      types: [
        { text: "1 - 택션지 (0.55mm x 1500cm x 100m)", value: 1 },
        { text: "2 - 합성피혁 (1.4mm x 1380cm x 30m)", value: 2 },
        { text: "3 - 스킨스웨드 (1.1mm x 1380cm x 30m)", value: 3 },
        { text: " 4- 합성피혁2 (0.7mm x 1380cm x 30m)", value: 4 }
      ]
    };
  }
};
</script>

<style>
</style>