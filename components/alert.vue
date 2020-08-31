<template>
  <v-col cols="12" v-if="alert">
    <v-alert :type="alertType" :value="alert">
      정상적으로 저장되었습니다.
      {{alertMessage}}
    </v-alert>
  </v-col>
</template>

<script>
export default {
  props: {
    alert: Boolean,
    alsertType: String,
    alertMessage: String
  },
  data() {
    return {};
  },
  watch: {}
};
</script>

<style>
</style>