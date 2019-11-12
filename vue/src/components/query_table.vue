<template>
  <div>
    <el-table
      ref="table"
      :data="dataList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" v-if="type=='selection'"></el-table-column>
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
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      background
      :page-sizes="[10,20,30,40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="margin-top:15px;"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
const api = process.env.VUE_APP_API_URL;

export default Vue.extend({
  props: ["items", "query", "type"],
  data() {
    return {
      multipleSelection: [],
      dataList: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        totalPageNum: 0,
        total: 0
      }
    };
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize) {
      this.getTableList({ pageSize, pageNum: this.page.pageNum });
    },
    handleCurrentChange(pageNum) {
      this.getTableList({ pageNum, pageSize: this.page.pageSize });
    },
    // 获取table数据
    getTableList(param) {
      let params = param
        ? Object.assign({}, param, {
            curPage: param.pageNum
          })
        : {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            curPage: this.page.pageNum
          };
      let options = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token")
        },
        url: api + this.query.url,
        method: this.query.method == "post" ? "post" : "get"
      };
      if (this.query.method == "post") {
        options.data = Object.assign({}, params, this.query.data || {});
      } else {
        options.params = Object.assign(
          {},
          params,
          this.query.data || this.query.params || {}
        );
      }
      axios(options)
        .then(res => {
          this.dataList = res.data.data;
          this.page.pageNum = res.data.pageNum || res.data.curPage;
          this.page.pageSize = res.data.pageSize;
          this.page.totalPageNum = res.data.totalPageNum || res.data.totalPage;
          this.page.total = res.data.total || res.data.totalSize;
        })
        .catch(err => {
          console.log("err===", err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getChecked() {
      return this.multipleSelection;
    }
  },
  mounted() {
    this.getTableList();
  },
  watch: {
    query() {
      this.getTableList();
    }
  }
});
</script>

<style lang="scss">
</style>