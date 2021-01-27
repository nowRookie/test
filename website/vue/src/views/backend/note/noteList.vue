<template>
  <div class="noteList">
    <!-- 搜索条件 -->
    <container-input ref="containerInput" :items="inputItems" @ok="inputSearch">
      <template v-slot:operate="scope">
        <el-button class="ml10" type="primary" @click="searchList(scope)"
          >查询</el-button
        >
      </template>
    </container-input>
    <!-- 功能按钮 -->
    <div>
      <el-button
        class="orangebtn"
        @click="
          $router.push({
            path: '/backend/newNote',
            query: { classifyId: $route.params.id },
          })
        "
        >新增</el-button
      >
    </div>
    <!-- table list -->
    <query-table
      :items="querytableItems"
      :query="queryParams"
      :afterQuery="afterQuery"
      type="selection"
      class="w100 mt20"
    >
      <template v-slot:operate="scope">
        <el-button
          @click="
            $router.push({
              path: '/backend/noteDetail',
              query: { id: scope.row._id, classifyId: $route.params.id },
            })
          "
          >修改</el-button
        >
        <el-button @click="handleDel(scope.row)">删除</el-button>
      </template>
    </query-table>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "noteList",
  data() {
    return {
      inputItems: [
        {
          key: "name",
          title: "名称",
        },
      ],
      querytableItems: [
        {
          key: "title",
          title: "标题",
        },
        {
          key: "summarize",
          title: "概述",
        },
        {
          key: "type",
          title: "类型",
        },
        {
          key: "time",
          title: "创建时间",
        },
        {
          key: "operate",
          title: "操作",
          type: "slot",
        },
      ],
      queryParams: {
        url: "/api/noteList",
        method: "get",
        params: {
          classifyId: this.$route.params.id,
        },
      },
    };
  },
  methods: {
    afterQuery({ data }) {
      return data.map((unit) => {
        return {
          ...unit,
          time: moment(unit.time).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
    },
    inputSearch() {},
    handleDel(row) {
      const options = getOptions({
        url: "/api/note",
        method: "delete",
        data: { ...row },
      });
      axios(options)
        .then((res) => {
          this.queryParams = Object.assign({}, this.queryParams);
          this.$message({
            type: "success",
            message: res.data.message || "删除成功",
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "请求错误",
          });
        });
    },
  },
  mounted() {},
  watch: {
    $route(to, from) {
      this.queryParams = Object.assign({}, this.queryParams, {
        params: {
          classifyId: to.params.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>