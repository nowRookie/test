<template>
  <div class="backend">
    <div class="row">
      <!-- 左侧菜单 -->
      <div class="relative">
        <i
          class="tc cf pointer iconfont icon-menu"
          @click="isCollapse = !isCollapse"
        ></i>
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          :collapse="isCollapse"
        >
          <BaseMenu :data="memuList"></BaseMenu>
        </el-menu>
      </div>
      <!-- 右侧内容 -->
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <!-- 右下角猫爪链接 -->
    <catClaw></catClaw>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

import BaseMenu from "@/components/base_menu";
import catClaw from "@/components/page/catClaw.vue";

export default {
  name: "backend",
  components: { BaseMenu, catClaw },
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
                  url: "/backend/noteList",
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
                  url: "/backend/noteList",
                },
                {
                  id: "1-1-3",
                  name: "js",
                  url: "/backend/noteList",
                },
                {
                  id: "1-1-4",
                  name: "node",
                  url: "/backend/noteList",
                },
                {
                  id: "1-1-5",
                  name: "canvas",
                  url: "/backend/noteList",
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "新闻",
          icon: "icon-image-text",
          url: "/backend/noteList",
          children: [],
        },
        {
          id: "3",
          name: "跟着时代走",
          icon: "icon-assessed-badge",
          url: "/backend/noteList",
          children: [],
        },
        {
          id: "4",
          name: "设置",
          icon: "icon-set",
          url: "/backend/setting",
          children: [
            {
              id: "4-1",
              name: "主题",
              icon: "icon-set",
              url: "/backend/setting/theme",
              children: [],
            },
            {
              id: "4-2",
              name: "修改密码",
              icon: "icon-set",
              url: "/backend/setting/password",
              children: [],
            },
            {
              id: "4-3",
              name: "首页canvas",
              icon: "icon-set",
              url: "/backend/setting/homeCanvas",
              children: [],
            },
            {
              id: "4-4",
              name: "笔记分类",
              icon: "icon-set",
              url: "/backend/setting/classify",
              children: [],
            },
          ],
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
  z-index: 2;
  width: 40px;
  line-height: 40px;
  background: rgba(64, 158, 255, 0.6);
}
.container {
  flex: 1;
  padding: 20px;
}
</style>