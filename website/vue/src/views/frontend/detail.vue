<template>
  <div class="detail">
    <div class="bb font24 title">大前端</div>
    <div class="content">
      多少个防晒霜多少个防晒霜多少个防晒霜多少个防晒霜多少个防晒霜
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "detail",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.detail {
  > .title {
    line-height: 56px;
  }
}
.content {
  padding: 20px 0;
}
</style>