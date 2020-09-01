<template>
  <v-app>
    <v-container>
      <logo minWidth="100px" maxWidth="17vw"></logo>
      <tabs></tabs>

      <nuxt class="pb-12" />
      <v-footer padless color="blue-grey darken-2">
        <v-card class="flex transparent" flat tile>
          <v-row align="center">
            <v-col cols="12" sm="6" class="text-sm-h4">
              <logo minWidth="150px" maxWidth="20vw"></logo>
            </v-col>
            <v-col cols="12" sm="6" class="text-sm-h4">
              <v-card-text class="text-center white--text">
                <div v-for="i in information" :key="i.title">{{ i.title }} : {{ i.info}}</div>
                <div>홈페이지 관련 오류나 문의사항이 있으시다면 이메일로 문의주시기 바랍니다.</div>
              </v-card-text>
            </v-col>
            <v-card-text class="white--text text-center">
              <strong>Copyright {{ new Date().getFullYear() }}. 주식회사 대현 Corp ALL RIGHTS RESERVED</strong>
            </v-card-text>
          </v-row>
        </v-card>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      information: [
        { title: "상호명", info: "주식회사 대현" },
        { title: "대표자", info: "김용현" },
        { title: "사업자 등록번호", info: "14739-28401-3832" },
        { title: "주소", info: "경기도 포천시 가산면 너배기길 90" },
        { title: "유선전화번호", info: "031-542-2583" },
        { title: "전화번호", info: "010-9025-8855" },
        { title: "팩스번호", info: "031-542-2583" },
        { title: "이메일", info: "sya8855@naver.com" },
        { title: "문의가능시간", info: "월~금 AM 09:00 ~ PM 05:30" }
      ]
    };
  }
};
</script>
