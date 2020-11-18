<template>
  <div class="list">
    <div class="bb font24 title">{{ $route.query.classifyName }}</div>
    <!-- 数据table -->
    <ul class="content" v-if="noteList.length">
      <li
        class="pointer between"
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
    <div class="mt10" v-else>暂无数据</div>
    <!-- 分页 -->
    <el-pagination
      class="mt20"
      small
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="prev,pager,next,jumper,sizes,total"
      :total="total"
    >
    </el-pagination>
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
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    getList({ pageNo, pageSize } = { pageNo: 1, pageSize: 10 }) {
      const options = getOptions({
        url: "/api/noteList",
        method: "get",
        params: { pageNo, pageSize, classifyId: this.$route.query.classifyId },
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
          this.pageNo = res.data.pageNo;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
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
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(pageNo) {
      this.getList({ pageNo: pageNo, pageSize: this.pageSize });
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
  .pointer {
    padding: 8px 10px;
    &:hover {
      background: #efefef;
    }
  }
}
</style>