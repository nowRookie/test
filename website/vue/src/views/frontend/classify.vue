<template>
  <ul class="row classify">
    <li
      class="tc mr20 pointer"
      @click="$router.push({ path: '/frontend/list', query: {} })"
    >
      <div class="icon icon1"></div>
      <div class="mt5 title">大前端</div>
    </li>
    <li class="tc mr20 pointer">
      <div class="icon icon2"></div>
      <div class="mt5 title">新闻</div>
    </li>
    <li class="tc mr20 pointer">
      <div class="icon icon3"></div>
      <div class="mt5 title">跟着时代走</div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "classify",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.classify {
  .icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background: pink;
  }
}
</style>