<template>
  <div id="app">
    <router-view />
    <el-backtop
      target="#app"
      :right="400"
      :bottom="40"
      :visibility-height="100"
    ></el-backtop>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    window.api = process.env.VUE_APP_API_URL;
  },
};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
  overflow: auto;
}
</style>