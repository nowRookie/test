<template>
  <div class="catClaw">
    <div
      :class="['dialog', isMouseOver ? 'isMouseOver' : '']"
      @mouseover="cancelCloseDialog"
      @mouseout="closeDialogDelay"
    >
      <div class="icon icon1" @click="linkFrontend">前台</div>
      <div class="icon icon2" @click="linkBackend">后台</div>
      <div class="icon icon3" @click="linkLogin">登录</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions, debounce } from "@/utils/utils";

export default {
  name: "catClaw",
  components: {},
  data() {
    return {
      dialogTimer: null,
      isMouseOver: false,
    };
  },
  methods: {
    // 链接前端首页
    linkFrontend() {
      let url = "/frontend/classify";
      if (this.$route.path == url) return;
      this.$router.push({ path: url, query: {} });
    },
    // 链接后台首页
    linkBackend() {
      let url = "/backend";
      if (this.$route.path == url) return;
      if (!sessionStorage.getItem("user")) {
        this.linkLogin();
        return;
      }
      this.$router.push({ path: url, query: {} });
    },
    // 链接登录页
    linkLogin() {
      let url = "/login";
      if (this.$route.path == url) return;
      this.$router.push({ path: url, query: {} });
    },
    // 取消关闭弹窗
    cancelCloseDialog() {
      this.isMouseOver = true;
      clearTimeout(this.dialogTimer);
    },
    // 过2秒关闭弹窗
    closeDialogDelay() {
      this.dialogTimer = setTimeout(() => {
        this.isMouseOver = false;
      }, 1000);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.dialog {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: pink;
  transition: 1s;
  .icon {
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: pink;
    transition: 1s cubic-bezier(0.52, -0.52, 0.43, 1.47);
  }
}
.isMouseOver {
  .icon1 {
    left: 0;
    top: -50px;
  }
  .icon2 {
    left: -50px;
    top: -10px;
  }
  .icon3 {
    left: -40px;
    top: 50px;
  }
}
</style>