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
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

export default {
  name: "login",
  components: {},
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const options = getOptions({
            url: "/login",
            method: "post",
            data: { ...this.ruleForm },
          });
          this.$router.push({ path: "/backend/wholeStackList", query: {} });
          // axios(options)
          //   .then((res) => {
          //     console.log("res===", res);
          //   })
          //   .catch((err) => {
          //     this.$message({
          //       type: "error",
          //       message: err,
          //     });
          //   })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {},
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