<template>
  <div>
    <v-row>
      <v-col>
        <div v-if="$route.path.indexOf('/admin')">
          <v-tabs centered hide-slider optional show-arrows center-active>
            <v-tab
              v-for="tabList in homeTabLists"
              :key="tabList.name"
              :to="tabList.linkTo"
              class="text-sm-h6 text-xl-h4"
              :ripple="false"
            >{{ tabList.name }}</v-tab>
          </v-tabs>
        </div>
        <div v-else>
          <v-tabs centered hide-slider optional show-arrows center-active>
            <v-tab
              v-for="tabList in adminTabLists"
              :key="tabList.name"
              :to="tabList.linkTo"
              class="text-sm-h6 text-xl-h4"
              :ripple="false"
              exact
            >{{ tabList.name }}</v-tab>
          </v-tabs>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeTabLists: [
        { name: "Home", linkTo: "/" },
        { name: "Products", linkTo: "/products" },
        { name: "Contact us", linkTo: "/contactUs" }
      ],
      adminTabLists: [
        { name: "Admin Home", linkTo: "/admin" },
        { name: "Products", linkTo: "/admin/products" },
        { name: "Users", linkTo: "/admin/users" },
        { name: "statistics", linkTo: "/admin/statistics" }
      ]
    };
  }
};
</script>

<style>
.v-tab:before {
  background: transparent !important ;
}
.v-tab::before {
  background: transparent;
}
.v-tab--active {
  color: red !important;
}
</style>
