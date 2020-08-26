<template>
  <v-row>
    <!-- 넘버 찾기 기능, 타입 필터 기능 -->
    <v-col cols="12">
      <!-- 넘버 찾기 기능 -->
      <v-card>
        <v-card-title>Filter</v-card-title>
        <v-card-text>
          <v-text-field
            label="Search"
            placeholder="숫자만 입력하세요 ex) 1080"
            persistent-hint
            v-model="searchNumber"
            outlined
            append-icon="fas fa-search"
          ></v-text-field>
        </v-card-text>
        <!-- 타입 필터 기능 -->
        <v-card-title>Type Filter</v-card-title>
        <v-card-text>
          <v-chip-group multiple>
            <div v-for="type in productType" :key="type.typeNumber">
              <v-chip @click="filter(type)">{{ type.type}}</v-chip>
            </div>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- 타입 정보 -->
    <v-col cols="12">
      <typeInfo></typeInfo>
    </v-col>
    <!-- 제품 표시 -->
    <v-col
      v-for="productList in filteredProductLists "
      :key="productList.id"
      cols="6"
      sm="4"
      md="2"
    >
      <v-card rounded elevation="6">
        <v-card-title class="text-h6">{{productList.number}}</v-card-title>
        <v-img :src="require('../static/' + productList.image)"></v-img>
        <v-card-text>
          <v-chip-group multiple column draggable>
            <div v-for="type in productType" :key="type.typeNumber">
              <v-chip v-if="type.typeNumber === productList.type">{{ type.type }}</v-chip>
            </div>
            <v-chip :color="productList.color">{{ productList.color }}</v-chip>

            <v-chip v-for="p in productList.pattern" :key="p">{{ p }}</v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-pagination
        v-model="page"
        circle
        :length="length"
        :page="page"
        :total-visible="totalVisible"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
import pType from "../data/productType.json";
import typeInfo from "../components/admin/typeInfo";
export default {
  components: {
    typeInfo
  },
  data: () => ({
    productType: pType,
    productLists: [],
    searchNumber: "",
    filteredType: [],
    page: 1,
    length: 10,
    totalVisible: 10
  }),
  created() {
    this.$http.get("/api/product").then(res => (this.productLists = res.data));
  },
  computed: {
    //필터기능
    filteredProductLists: function() {
      //검색으로 번호 찾기
      if (this.searchNumber) {
        return this.productLists.filter(product => {
          return product.number.includes(this.searchNumber);
        });
      }
      // type, 검색 아무것도 해당 안될 때 (전체보기)
      else if (!this.filteredType.length) {
        return this.productLists;
      }
      // type별로 제품 검색하기
      else {
        var filteredProduct = [];
        var filtered = this.filteredType;

        this.productLists.forEach(function(product) {
          function cardContainsFilter(filter) {
            return product.type === filter;
          }
          if (filtered.some(cardContainsFilter)) {
            filteredProduct.push(product);
          }
        });
        return filteredProduct;
      }
    }
  },

  methods: {
    //필터된 타입 저장
    filter(type) {
      if (this.filteredType.indexOf(type.typeNumber) == -1) {
        this.filteredType.push(type.typeNumber);
      } else {
        this.filteredType.splice(this.filteredType.indexOf(type.typeNumber), 1);
      }
    }
  }
};
</script>

<style></style>

