<template>
  <div>
    <el-table
      ref="table"
      :data="dataList"
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="type=='selection'"
        :selectable="selectableFun"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        :width="item.width||''"
        v-for="(item,index) in items"
        :key="index"
      >
        <template slot-scope="scope">
          <slot
            :name="item.key"
            :index="scope.$index"
            :row="scope.row"
            :column="scope.column"
            v-if="item.type=='slot'"
          ></slot>
          <span v-else>{{scope.row[item.key]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!(hidePage===true)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :hide-on-single-page="hideSingle?true:false"
      background
      :page-sizes="[10,20,30,40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="margin-top:15px;text-align:right;"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { loading } from "@/utils/utils";

// import { api } from "@/http/config";
const api = process.env.VUE_APP_API_URL;

export default Vue.extend({
  props: ["items", "query", "type", "hidePage", "hideSingle"],
  data() {
    return {
      multipleSelection: [],
      dataList: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        totalPageNum: 0,
        total: 0,
      },
    };
  },
  computed: {},
  methods: {
    selectableFun(row, index) {
      if (row.checkable === false) return false;
      return true;
    },
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getTableList({ pageSize, pageNum: this.page.pageNum });
    },
    handleCurrentChange(pageNum) {
      this.getTableList({ pageNum, pageSize: this.page.pageSize });
    },
    // 获取table数据
    getTableList(param) {
      let pageParams = param
        ? Object.assign({}, param, {
            curPage: param.pageNum,
            pageNo: param.pageNum,
            currentPage: param.pageNum,
          })
        : {
            pageNum: this.page.pageNum,
            pageNo: this.page.pageNum,
            pageSize: this.page.pageSize,
            curPage: this.page.pageNum,
            currentPage: this.page.pageNum,
          };
      let options = {
        url: api + this.query.url,
        method: this.query.method == "post" ? "post" : "get",
      };
      if (this.query.method == "post") {
        options.data = Object.assign({}, this.query.data, pageParams || {});
      } else {
        options.params = Object.assign(
          {},
          this.query.data || this.query.params || {},
          pageParams
        );
      }
      // loading.open();
      axios(options)
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let wrapper = (res.data && res.data.data) || {};
          let data = wrapper.list || [];
          this.dataList = this.$attrs.afterQuery
            ? this.$attrs.afterQuery({ res, data: data })
            : data;
          this.page.pageNum = wrapper.pageNum || wrapper.curPage;
          this.page.pageSize = wrapper.pageSize;
          this.page.totalPageNum =
            wrapper.totalPageNum || wrapper.totalPage || wrapper.pages;
          this.page.total = wrapper.total || wrapper.totalSize;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        })
        .then(() => {
          // loading.close();
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getChecked() {
      return this.multipleSelection;
    },
  },
  mounted() {
    this.getTableList();
  },
  watch: {
    query(queryParam) {
      this.getTableList(queryParam.data);
    },
  },
});
</script>

<style lang="less" scope>
</style>