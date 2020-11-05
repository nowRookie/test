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
        @click="$router.push({ path: '/backend/newNote', query: {} })"
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
              query: { id: scope.row._id },
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

import containerInput from "@/components/container_input_form";
import queryTable from "@/components/query_table";

export default {
  name: "noteList",
  components: { containerInput, queryTable },
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
        url: "/backend/noteList",
        method: "get",
        params: {},
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
        url: "/backend/note",
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
  mounted() {
    // const options = getOptions({
    //   url: "/backend/notes",
    //   method: "get",
    //   params: {},
    // });
    // console.log("options===", options);
    // axios(options).then((res) => {
    //   console.log("res===", res);
    // });
  },
};
</script>

<style lang="less" scoped>
</style>