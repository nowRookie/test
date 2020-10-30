<template>
  <div>
    <el-input @input="input" :value="value" @change="change" maxlength="8"></el-input>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    input(value) {
      this.value = new String(value)
        .replace(/[^\d\.]|^\./g, "")
        .replace(/\.{2}/g, ".")
        .replace(/^0+$/, "0")
        .replace(/^0(\d{1})/g, "$1")
        // .replace(/^([1-9]\d*|0)(\.\d{1,4})(\.|\d{1})?$/, "$1$2");
        .replace(
          new RegExp("^([1-9]\\d*|0)(\\.\\d{1," + 3 + "})(.|\\d{1})?$"),
          "$1$2"
        );
    },
    change(value) {
      console.log("change===", value);
    },
  },
};
</script>

<style lang="less" scoped>
</style>