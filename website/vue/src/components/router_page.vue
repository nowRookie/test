<template>
  <div class="custom-tree-container">
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="true"
      :highlight-current="true"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :style="data.menu ? 'color:#333' : 'color:#bbb'">{{
          node.label
        }}</span>
        <span>
          <el-button type="text" @click.stop="() => addSubMenu(node, data)"
            >add</el-button
          >
          <el-button
            type="text"
            @click.stop="() => editMenu(node, data)"
            v-if="data.id != '100100100'"
            >edit</el-button
          >
          <el-button
            type="text"
            @click.stop="() => removeMenu(node, data)"
            v-if="data.id != '100100100'"
            >Delete</el-button
          >
        </span>
      </span>
    </el-tree>
    <!-- 弹窗 -->
    <el-dialog
      v-if="visible"
      :visible="visible"
      @close="cancel"
      width="800px"
      :modal="true"
      :destroy-on-close="true"
    >
      <div slot="title">新增</div>
      <el-form
        ref="form"
        :model="form"
        :disabled="formDisabled"
        label-width="200px"
      >
        <!-- <el-form-item label="所属分类" prop="menu">
          <treeSelect></treeSelect>
        </el-form-item> -->
        <el-form-item
          label="菜单名称"
          prop="menuName"
          :rules="[{ required: true, message: '必填项!', trigger: 'change' }]"
        >
          <el-input v-model="form.menuName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item
          label="生成动态路径"
          prop="isDynamicUrl"
          v-if="formType == 'add'"
        >
          <el-switch
            v-model="form.isDynamicUrl"
            @change="dynamicUrlSwitchChange"
          ></el-switch>
        </el-form-item>
        <el-form-item
          label="菜单路径"
          prop="menuUrl"
          :rules="[{ required: true, message: '必填项!', trigger: 'change' }]"
        >
          <el-input
            v-model="form.menuUrl"
            placeholder="请输入"
            :disabled="form.isDynamicUrl"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否在前台展示" prop="willFrontShow">
          <el-switch
            v-model="form.willFrontShow"
            @change="willFrontShowSwitchChange"
          ></el-switch>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAdd">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

import {
  getOptions,
  loading,
  linearArrayToTree, //一维数组转树结构
  treeToLinearArray, //树结构转一维数组
} from "@/utils/utils";

import treeSelect from "@/components/treeSelect";

export default {
  components: { treeSelect },
  data() {
    return {
      visible: false,
      formDisabled: false,
      formType: "add",
      form: {
        menuName: "", //菜单名称
        isDynamicUrl: false, //生成动态路径
        menuUrl: "", //菜单路径
        id: "", //当前项id
        parentId: "",
        willFrontShow: false,
      },
      treeData: [
        {
          id: "100100100",
          label: "页面路由配置",
          children: [],
        },
      ],
    };
  },

  methods: {
    clear() {
      this.form = Object.assign({}, this.form, {
        menuName: "", //菜单名称
        isDynamicUrl: false, //生成动态路径
        menuUrl: "", //路径
        // 自定义
        id: "",
        parentId: "",
      });
    },
    getTree() {
      const options = getOptions({
        url: "/backend/menuList",
        method: "get",
      });
      loading(true);
      axios(options)
        .then((res) => {
          if (res.status !== 200 || res.data.code != 200) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let data = res.data.data || [];
          data = data.map((unit) => {
            return {
              ...unit,
              label: unit.menuName,
              id: unit._id,
              willFrontShow: unit.willFrontShow ? true : false,
            };
          });
          this.treeData[0].children = linearArrayToTree(data, "100100100");
        })
        .catch((err) => {
          this.$message.error(err || "请求错误！");
        })
        .then(() => {
          loading(false);
        });
    },
    addSubMenu(node, data) {
      console.log("addSubMenu:::", node, data);
      let parentId = data.id; //当前点击项的id
      this.form = { parentId: parentId };

      this.visible = true;
      this.formType = "add";
    },
    removeMenu(node, data) {
      let idList = treeToLinearArray(data).map((unit) => unit.id);
      const options = getOptions({
        method: "delete",
        url: "/backend/menu",
        data: {
          id: idList,
        },
      });
      axios(options)
        .then((res) => {
          if (res.status !== 200 || res.data.code != 200) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          this.$message.success("删除成功！");
          this.getTree();
        })
        .catch((err) => {
          this.$message.error(err || "请求错误！");
        });
    },
    editMenu(node, data) {
      console.log("editMenu:::", node, data);
      let id = data.id; //当前点击项的id
      let nodeDot; //用于找到对应的父级项

      this.formType = "edit";
      this.visible = true;
      this.form = Object.assign({}, this.form, data);
    },
    handleAdd() {
      this.$refs.form.validate((boolean) => {
        if (boolean) {
          const options = getOptions({
            method: this.formType == "edit" ? "put" : "post",
            url: "/backend/menu",
            data:
              this.formType == "edit"
                ? Object.assign({}, this.form, {
                    parentId: this.form.parentId,
                  })
                : {
                    parentId: this.form.parentId,
                    menuName: this.form.menuName,
                    menuUrl: this.form.menuUrl,
                  },
          });
          axios(options)
            .then((res) => {
              if (res.status !== 200 || res.data.code != 200) {
                this.$message.error(
                  res.statusText || res.data.message || "请求错误!"
                );
                return;
              }
              this.$message({
                type: "success",
                message: res.data.message || "处理成功",
              });
              this.cancel();
              this.getTree();
            })
            .catch((err) => {
              this.$message.error(err || "请求错误！");
            });
        }
      });
    },
    // 生成随机路径
    dynamicUrlSwitchChange(boolean) {
      if (boolean) {
        let str =
          "/m" +
          Math.ceil(Math.random() * 1000000) +
          "e" +
          Math.ceil(Math.random() * 1000000);
        this.form.menuUrl = str;
      }
    },
    willFrontShowSwitchChange(boolean) {
      this.form.willFrontShow = boolean;
    },
    cancel() {
      this.clear();
      this.visible = false;
    },
  },
  mounted() {
    this.getTree();
  },
};
</script>

<style lang="less" scope>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>