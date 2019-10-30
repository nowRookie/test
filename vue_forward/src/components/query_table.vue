<template>
  <div>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column
        :prop="item.key"
        :label="item.title"
        :width="item.width||300"
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

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  props: ["items", "query"],
  data() {
    return {
      dataList: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        totalPageNum: 20,
        total: 100
      }
    };
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize: any) {
      this.getTableList({ pageSize, pageNum: this.page.pageNum });
    },
    handleCurrentChange(pageNum: any) {
      this.getTableList({ pageNum, pageSize: this.page.pageSize });
    },
    // 获取table数据
    getTableList(options) {
      let option = options
        ? Object.assign({}, options, {
            curPage: options.pageNum
          })
        : {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            curPage: this.page.pageNum
          };
      axios({
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token")
        },
        url: this.query.url || "",
        method: this.query.method || "post",
        data: Object.assign({}, option, this.query.data || {})
      })
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
    }
  },
  mounted() {
    axios({
      url: "http://192.168.1.115:8500/login",
      method: "get",
      headers: {
        "Content-Type": "application/Json; charset=UTF-8"
      },
      params: {
        username: "test",
        password: "123456"
      }
    })
      .then(res => {
        sessionStorage.setItem("token", res.data.token);
        this.getTableList();
      })
      .catch(err => {
        console.log("err===", err);
      });
  }
});
</script>

<style lang="scss">
</style>