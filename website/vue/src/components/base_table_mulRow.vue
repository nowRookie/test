<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      highlight-current-row
      style="width:100%;"
      :span-method="spanMethod"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column
        v-if="type=='selection'"
        type="selection"
        width="55"
        :selectable="selectableFun"
      ></el-table-column>
      <el-table-column
        :prop="item.key"
        :label="item.title"
        v-for="(item,index) in items"
        :key="index"
        align="center"
        :width="item.width||''"
        :sortable="item.sortable===undefined?false:item.sortable"
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
      :current-page="pages.pageNum||pages.pageNo"
      :hide-on-single-page="hideSingle?true:false"
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      style="margin-top:15px;text-align:right"
    ></el-pagination>
    <div style="display:none;">{{dealData}}</div>
  </div>
</template>

<script >
import Vue from "vue";
import _ from "lodash";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    pages: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    hidePage: {
      type: Boolean,
      required: false,
    },
    hideSingle: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    // 合并行列
    spanType: {
      type: String, // column,row
      required: false,
    },
    rowDeg: {
      type: Object, // { 1: 2, index: rowspan }
      required: false,
    },
    colDeg: {
      type: Array, // [1, 2, index]
      required: false,
    },
  },
  data() {
    return {
      tableData: [],
      sortType: "ascending",
      multipleSelection: [],
    };
  },
  computed: {
    dealData() {
      if (!this.spanType) {
        this.tableData = this.data;
        return false;
      }
      let waitDeal = this.data.sort((a, b) => {
        return a.id - b.id;
      });
      // 数据按id分类[]
      let category = Array.from(
        new Set(
          _.map(waitDeal, (unit) => {
            return unit.id;
          })
        )
      );
      // 转成id对象{id:{index:xx,length:xx}}
      let classify = {};
      _.map(category, (unit) => {
        classify[unit] = {
          index: waitDeal.findIndex((val) => {
            return val.id === unit;
          }),
          length: waitDeal.filter((d) => {
            return d.id == unit;
          }).length,
        };
      });
      // 顺序index的合集
      let iArr = _.map(category, (unit) => {
        return waitDeal.findIndex((val) => {
          return val.id == unit;
        });
      });
      // 顺序index的合集
      let lastIArr = _.map(category, (unit) => {
        return _.findLastIndex(waitDeal, (val) => {
          return val.id == unit;
        });
      });
      let result = _.map(waitDeal, (unit, index) => {
        if (iArr.indexOf(index) != -1) {
          return {
            ...unit,
            _sortType: "ascending",
            _spanLength: classify[unit.id].length,
          };
        } else if (lastIArr.indexOf(index) != -1) {
          return {
            ...unit,
            _sortType: "descending",
            _spanLength: classify[unit.id].length,
          };
        } else {
          return unit;
        }
      });
      this.tableData = result;
      return false;
    },
  },
  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (!this.spanType) return [1, 1];
      let rowDeg = this.rowDeg; // { 1: 2, 3: 3 }
      let colDeg = this.colDeg; // [1, 2, 3]
      if (this.spanType == "row") {
        if (row.spanable !== false) {
          if (columnIndex in rowDeg) {
            return {
              rowspan: 1,
              colspan: rowDeg[columnIndex],
            };
          }
        }
      } else if (this.spanType == "column") {
        if (colDeg.indexOf(columnIndex) != -1) {
          return {
            rowspan: row._sortType == this.sortType ? row._spanLength : 0,
            colspan: 1,
          };
        }
      }
    },
    selectableFun(row, index) {
      if (row.checkable === false) return false;
      return true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.$emit("change", { pageSize });
    },
    handleCurrentChange(pageNum) {
      this.$emit("change", { pageNum, pageNo: pageNum });
    },
    getChecked() {
      return this.multipleSelection;
    },
    sortChange({ column, prop, order }) {
      if (order == "ascending" || order == null) {
        this.sortType = "ascending";
      } else if (order == "descending") {
        this.sortType = "descending";
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
</style>