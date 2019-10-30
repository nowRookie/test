<template>
  <div>
    <el-table :data="data" border style="width: 100%">
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
      :current-page="pages.pageNum"
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
      style="margin-top:15px;"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["items", "pages", "data"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize: any) {
      console.log(1111);
      this.$emit("change", { pageSize });
    },
    handleCurrentChange(pageNum: any) {
      this.$emit("change", { pageNum });
    }
  },
  mounted() {}
});
</script>

<style lang="scss">
</style>