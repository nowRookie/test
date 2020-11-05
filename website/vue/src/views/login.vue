<template>
  <div class="h100 relative login">
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            :autofocus="true"
            v-focus.native="true"
            ref="username"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右下角猫爪链接 -->
    <catClaw></catClaw>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

import catClaw from "@/components/page/catClaw.vue";

export default {
  name: "login",
  components: { catClaw },
  directives: {
    focus: {
      inserted(el, binding, vnode) {
        console.log("el====", el, binding, vnode);
        // el.focus();
      },
    },
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(api);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const options = getOptions({
            url: "/backend/login",
            method: "post",
            data: { ...this.ruleForm },
          });
          axios(options)
            .then((res) => {
              let user = res.data.data || {};
              sessionStorage.setItem("user", JSON.stringify(user));
              this.$router.push({ path: "/backend" });
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.$refs.username.focus();
  },
};
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 500px;
  height: 400px;
}
</style>