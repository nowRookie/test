<template>
  <div class="backend">
    <div class="row">
      <!-- 左侧菜单 -->
      <div class="relative">
        <i
          class="tc cf pointer iconfont icon-menu"
          @click="isCollapse = !isCollapse"
        ></i>
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
          <BaseMenu :data="memuList"></BaseMenu>
        </el-menu>
      </div>
      <!-- 右侧内容 -->
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

import BaseMenu from "@/components/base_menu";

export default {
  name: "backend",
  components: { BaseMenu },
  data() {
    return {
      isCollapse: false,
      memuList: [
        {
          id: "1",
          name: "大前端",
          icon: "icon-editor",
          children: [
            {
              id: "1-1",
              name: "走向全栈",
              icon: "icon-vehivles",
              children: [
                {
                  id: "1-1-1",
                  name: "html",
                  url: "/backend/wholeStackList",
                  children: [
                    {
                      id: "1-1-1-1",
                      name: "测试",
                    },
                  ],
                },
                {
                  id: "1-1-2",
                  name: "css",
                  url: "/backend/wholeStackList",
                },
                {
                  id: "1-1-3",
                  name: "js",
                  url: "/backend/wholeStackList",
                },
                {
                  id: "1-1-4",
                  name: "node",
                  url: "/backend/wholeStackList",
                },
                {
                  id: "1-1-5",
                  name: "canvas",
                  url: "/backend/wholeStackList",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "新闻",
          icon: "icon-image-text",
          childrend: [],
        },
        {
          id: "3",
          name: "跟着时代走",
          icon: "icon-assessed-badge",
          childrend: [],
        },
        {
          id: "4",
          name: "设置",
          icon: "icon-set",
          childrend: [],
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.icon-menu {
  position: absolute;
  right: -40px;
  width: 40px;
  line-height: 40px;
  background: rgba(64, 158, 255, 0.6);
}
.container {
  flex: 1;
  padding: 20px;
}
</style>