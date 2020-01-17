<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="data"
      border
      style="width:100%;"
      @selection-change="handleSelectionChange"
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
      :current-page="pages.pageNum"
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      style="margin-top:15px;text-align:right"
    ></el-pagination>
  </div>
</template>

<script >
import Vue from "vue";

export default {
  props: ["items", "pages", "data", "hidePage", "type"],
  data() {
    return {
      multipleSelection: []
    };
  },
  computed: {},
  methods: {
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
      this.$emit("change", { pageNum });
    },
    getChecked() {
      return this.multipleSelection;
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>