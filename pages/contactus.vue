<template>
  <v-row class="pt-12">
    <v-col>
      <v-card width="100%" class="pa-2" flat color="transparent" align="center">
        <v-row>
          <v-col cols="12">
            <logo minWidth="200px" maxWidth="30vw"></logo>
          </v-col>
          <v-col>
            <v-card id="box" flat style="background-color:transparent;">
              <h1 class="mb-4">주식회사 대현</h1>
              <h3>주소 : 경기도 포천시 가산면 너배기길 90</h3>
              <h3>전화 : 031-542-2583</h3>
              <h3>대표 전화 : 010-9025-8855</h3>
              <h3>이메일 : sya8855@naver.com</h3>
            </v-card>

            <v-col id="kakao">
              <v-card elevation="9" style="background-color:transparent;">
                <kakaoMaps />
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import kakaoMaps from "../components/home/kakaoMaps";
import logo from "../components/home/logo";
export default {
  components: {
    kakaoMaps,
    logo
  }
};
</script>

<style></style>
