<template>
  <ul class="oh classify">
    <li
      v-for="(unit, index) in classifyList"
      :key="index"
      class="fl tc mb20 mr20 pointer"
      @click="
        $router.push({
          path: '/frontend/list',
          query: { classifyId: unit._id, classifyName: unit.menuName },
        })
      "
    >
      <div class="icon icon1"></div>
      <div class="mt5 title">{{ unit.menuName }}</div>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions, loading } from "@/utils/utils";

export default {
  name: "classify",
  components: {},
  data() {
    return {
      classifyList: [],
    };
  },
  methods: {
    getList() {
      const options = getOptions({
        url: "/backend/menuList",
        method: "get",
        params: {},
      });
      loading(true);
      axios(options)
        .then((res) => {
          let data = res.data.data || [];
          this.classifyList = data.filter((unit) => {
            return unit.willFrontShow;
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "请求错误",
          });
        })
        .then(() => {
          loading(false);
        });
    },
  },
  mounted() {
    this.getList();
  },
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