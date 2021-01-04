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
          <BaseMenu :data="menuList"></BaseMenu>
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

import { getOptions, linearArrayToTree } from "@/utils/utils";

export default {
  name: "backend",
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          id: "2",
          name: "新闻",
          icon: "icon-image-text",
          url: "/backend/noteList",
          children: [],
        },
      ],
    };
  },
  methods: {
    getMenuTree() {
      const options = getOptions({
        url: "/api/menuList",
        method: "get",
        params: {},
      });
      axios(options)
        .then((res) => {
          if (res.status !== 200 || res.data.code != 200) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let data = res.data.data || [];
          data = data.map((unit) => {
            return {
              ...unit,
              name: unit.menuName,
              icon: "",
              id: unit._id,
              url:
                unit.menuUrl == "/backend/noteList"
                  ? unit.menuUrl + "/" + unit._id
                  : unit.menuUrl,
            };
          });
          this.menuList = linearArrayToTree(data, "100100100");
        })
        .catch((err) => {
          this.$message({ type: "error", message: err || "请求错误！" });
        });
    },
  },
  mounted() {
    this.getMenuTree();
  },
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