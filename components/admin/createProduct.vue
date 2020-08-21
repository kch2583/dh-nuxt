<template>
  <v-row justify="center">
    <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      @click.stop="createDialog = true"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-row>
          <v-col>
            <v-card-text>
              <v-form @submit.prevent="createProduct">
                <!-- Number -->
                <v-text-field
                  v-model="productNumber"
                  placeholder="숫자만 입력하세요"
                  :counter="10"
                  label="Product Number"
                  required
                >
                  <input
                    v-validate="'numeric'"
                    data-vv-as="field"
                    name="numeric_field"
                    type="text"
                  />
                </v-text-field>

                <!-- Type -->
                <v-select
                  :items="types"
                  label="Type"
                  v-model="productType"
                ></v-select>

                <!-- Image file name -->
                <v-text-field
                  v-model="ImageFileName"
                  :rules="fileNameRules"
                  placeholder="이미지 파일 이름을 입력하세요"
                  label="Image File Name"
                  required
                ></v-text-field>

                <!-- Pattern -->
                <v-select
                  :items="patterns"
                  chips
                  multiple
                  label="Pattern"
                  v-model="productPattern"
                >
                  <v-icon slot="append" color="green">mdi-plus</v-icon>
                </v-select>
                <v-btn block color="green darken-1" text type="submit"
                  >생성하기</v-btn
                >
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      createDialog: false,
      formDialog: false,
      productNumber: "",
      ImageFileName: "",
      productPattern: [],
      productType: "",
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
      ],
      patterns: [
        "x",
        "버팔로",
        "누박",
        "엔드큐(NDQ)",
        "AR-100",
        "구름무늬",
        "탄(TAN)",
        "UMT",
        "선과색무늬",
        "스킨스웨드",
        "에나멜",
        "A.T.P",
        "마무타이 RP",
        "건식",
        "프라다",
        "비벨라",
        "D7",
        "R53",
        "악어무늬",
        "투스킨",
        "펄"
      ]
    };
  },
  methods: {
    async createProduct() {
      try {
        await this.$http.post("/api/product", {
          number: this.productNumber,
          image: this.ImageFileName,
          pattern: this.productPattern,
          type: this.productType
        });
        this.createDialog = false;
        console.log("done");
      } catch (error) {}
    }
  }
};
</script>

<style></style>
