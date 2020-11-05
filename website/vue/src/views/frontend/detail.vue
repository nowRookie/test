<template>
  <div class="detail">
    <div class="bb font24 title">{{ detail.title }}</div>
    <div class="content markdown-body" v-html="detail.html"></div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions, loading } from "@/utils/utils";

export default {
  name: "detail",
  components: {},
  data() {
    return {
      detail: {
        title: "",
        html: "",
      },
    };
  },
  methods: {
    getDetail() {
      const options = getOptions({
        url: "/backend/note",
        method: "get",
        params: {
          _id: this.$route.query.id,
        },
      });
      loading(true);
      axios(options)
        .then((res) => {
          let data = res.data.data || {};
          this.detail = data;
        })
        .catch((err) => {
          this.$message({ type: "error", message: err || "请求错误" });
        })
        .then(() => {
          loading(false);
        });
    },
  },
  mounted() {
    this.getDetail();
  },
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