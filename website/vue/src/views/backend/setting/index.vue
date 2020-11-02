<template>
  <div class="setting">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "setting",
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