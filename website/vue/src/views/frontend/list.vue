<template>
  <div class="list">
    <div class="bb font24 title">大前端</div>
    <ul class="content">
      <li
        class="mt10 pointer between"
        v-for="(unit, index) in noteList"
        :key="index"
        @click="
          $router.push({ path: '/frontend/detail', query: { id: unit._id } })
        "
      >
        <span class="title">{{ unit.title }}</span>
        <span class="ml10">{{ unit.time }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions, loading } from "@/utils/utils";

export default {
  name: "list",
  components: {},
  data() {
    return {
      noteList: [],
    };
  },
  methods: {
    getList() {
      const options = getOptions({
        url: "/frontend/noteList",
        method: "get",
        params: {},
      });
      loading(true);
      axios(options)
        .then((res) => {
          let data = res.data.data || [];
          this.noteList = data.map((unit) => {
            return {
              ...unit,
              time: moment(unit.time).format("YYYY-MM-DD HH:mm:ss"),
            };
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