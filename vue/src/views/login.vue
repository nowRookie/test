<template>
  <div class="about">
    <progress value="22" max="100" @click="test"></progress>
  </div>
</template>

<script>
import { dealDate } from "@/utils/utils";
import axios from "axios";
export default {
  name: "about",
  data() {
    return {};
  },
  computed: {},
  methods: {
    test() {
      let random = Math.random() * 100;
      if (random < 30) {
        this.$message.warning(`"测试请求错误"${random}`, {});
      } else if (random > 30 && random < 65) {
        this.$message({
          type: "error",
          message: `error例子${random}`
        });
      } else {
        this.$message({
          type: "success",
          message: `"这是一个成功messages"${random}`
        });
      }
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        console.log("i====", i);
      }, 3000);
    }
  }
};
</script>