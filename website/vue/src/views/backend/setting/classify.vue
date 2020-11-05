<template>
  <div class="addClassify">
    <routerPage></routerPage>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

import routerPage from "@/components/router_page";

export default {
  name: "addClassify",
  components: { routerPage },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>