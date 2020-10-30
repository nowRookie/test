<template>
  <div class="wholeStackList">
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
      <el-button class="orangebtn" @click="$router.push({path:'/backend/newNote',query:{}})">新增</el-button>
    </div>
    <!-- table list -->
    <query-table
      :items="querytableItems"
      :query="queryParams"
      type="selection"
      :afterQuery="afterQuery"
      class="w100 mt20"
    >
      <template v-slot:customer="scope">
        <el-button @click="cradle(scope)">按钮</el-button>
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
  name: "wholeStackList",
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
          key: "operate",
          title: "操作",
        },
      ],
      queryParams: {
        url: "#",
        method: "post",
        data: {},
      },
    };
  },
  methods: {
    inputSearch() {},
    afterQuery() {},
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>