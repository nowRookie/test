<template>
  <div>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["data"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
});
</script>

<style lang="scss">
</style>