<template>
  <div class="theme">
    <div class="row">
      <span>主题颜色</span>
      <el-color-picker v-model="color" @change="changeTheme"></el-color-picker>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "theme",
  components: {},
  data() {
    return {
      color: "#409EFF",
    };
  },
  methods: {
    changeTheme(val) {
      console.log(val);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>