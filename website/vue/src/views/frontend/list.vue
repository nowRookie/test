<template>
  <div class="list">
    <div class="bb font24 title">大前端</div>
    <ul class="content">
      <li class="mt10 pointer between" @click="$router.push({path:'/frontend/detail',query:{}})">
        <span class="title"
          >赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上赶赴事故发生是是说的术防多上</span
        >
        <span class="ml10">2020-11-10</span>
      </li>
      <li class="mt10 pointer between" @click="$router.push({path:'/frontend/detail',query:{}})">
        <span class="title">标题111</span>
        <span class="ml10">2020-11-10</span>
      </li>
      <li class="mt10 pointer between" @click="$router.push({path:'/frontend/detail',query:{}})">
        <span class="title">标题111</span>
        <span class="ml10">2020-11-10</span>
      </li>
      <li class="mt10 pointer between" @click="$router.push({path:'/frontend/detail',query:{}})">
        <span class="title">标题111</span>
        <span class="ml10">2020-11-10</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "list",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.list {
  > .title {
    line-height: 56px;
  }
}
.content {
  .title {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>