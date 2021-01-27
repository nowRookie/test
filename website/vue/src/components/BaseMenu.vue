<template>
  <div class="basemenu">
    <div v-for="(unit, index) in data" :key="index">
      <el-submenu
        :index="unit.url"
        v-if="unit.children && unit.children.length"
      >
        <template slot="title">
          <i :class="['iconfont', unit.icon]"></i>
          <span slot="title">{{ unit.name }}</span>
        </template>
        <basemenu :data="unit.children"></basemenu>
      </el-submenu>
      <router-link :to="unit.url || ''" v-else>
        <el-menu-item :index="unit.url">
          <i :class="['iconfont', unit.icon]"></i>
          <span slot="title">{{ unit.name }}</span>
        </el-menu-item></router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "basemenu",
  components: {},
  props: {
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>