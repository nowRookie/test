<template>
  <div class="frontend">
    <div class="p20 relative row">
      <!-- 左侧 -->
      <div class="mr20 oh left">
        <router-view></router-view>
      </div>
      <!-- 右侧 -->
      <div class="right"></div>
      <div class="bgf border p10 fixed">
        <div class="bb between title">
          <span>最新文章</span>
          <a>more></a>
        </div>
        <div class="content">
          <ul>
            <li class="mt10 between pointer">
              <span class="title">
                <span>【大前端】</span>
                <span>标题</span>
              </span>
              <span class="ml10">2020-11-02</span>
            </li>
            <li class="mt10 between pointer">
              <span class="title">
                <span>【跟着时代走】</span>
                <span>标题标题标题标题标题标题标题标题标题标题标题</span>
              </span>
              <span class="ml10">2020-11-02</span>
            </li>
            <li class="mt10 between pointer">
              <span class="title">
                <span>【新闻】</span>
                <span>标题</span>
              </span>
              <span class="ml10">2020-11-02</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "frontend",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.left {
  flex: 1;
  .icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    background: pink;
  }
}
.right {
  width: 400px;
}
.fixed {
  right: 20px;
  top: 20px;
  width: 400px;
  z-index: 2;
  > .title {
    line-height: 32px;
  }
  .content {
    .title {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>