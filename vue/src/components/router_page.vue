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
        <span :style="data.menu?'color:#333':'color:#bbb'">{{ node.label }}</span>
        <span :style="setStyle(data)">
          <el-button type="text" @click.stop="() => addBtn(node, data)" v-if="data.level<3">add</el-button>
          <el-button
            type="text"
            @click.stop="() => editBtn(node, data)"
            v-if="data.id!='100100100'"
          >edit</el-button>
          <el-button
            type="text"
            @click.stop="() => remove(node, data)"
            v-if="data.id!='100100100'"
          >Delete</el-button>
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
      <el-form ref="form" :model="form" :disabled="formDisabled" label-width="200px">
        <el-form-item label="是否菜单" prop="menu">
          <el-switch v-model="form.menu"></el-switch>
        </el-form-item>
        <el-form-item
          label="菜单层级"
          prop="level"
          :rules="[{required: true, message: '必填项!', trigger: 'change'}]"
        >
          <el-select v-model="form.level" placeholder="请选择" :disabled="true">
            <el-option
              v-for="(item,index) in form.levelList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="菜单名称"
          prop="resName"
          :rules="[{required: true, message: '必填项!', trigger: 'change'}]"
        >
          <el-input v-model="form.resName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="动态生成菜单路径" prop="autoCreate">
          <el-switch v-model="form.autoCreate" @change="changeSwitch"></el-switch>
        </el-form-item>
        <el-form-item
          label="菜单路径"
          prop="resUrl"
          :rules="[{required: true, message: '必填项!', trigger: 'change'}]"
        >
          <el-input v-model="form.resUrl" placeholder="请输入" :disabled="form.autoCreate"></el-input>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
          :rules="[{required: true, message: '必填项!', trigger: 'change'}]"
        >
          <el-select v-model="form.sort" placeholder="请选择">
            <el-option
              v-for="(item,index) in form.sortList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
const api = process.env.VUE_APP_API_URL;

export default {
  components: {},
  data() {
    return {
      visible: false,
      formDisabled: false,
      formType: "add",
      form: {
        menu: true, //是否菜单
        level: "", //菜单层级
        levelList: [
          {
            key: 1,
            label: "一级",
            value: 1
          },
          {
            key: 2,
            label: "二级",
            value: 2
          },
          {
            key: 3,
            label: "三级",
            value: 3
          }
        ],
        resName: "", //菜单名称
        autoCreate: false, //动态生成菜单路径
        resUrl: "", //菜单路径
        sort: "", //排序
        sortList: [],
        // 自定义
        id: "", //当前项id
        parentId: "",
        sortCradle: [] //0-50用于过滤已有菜单的sort
      },
      treeData: [
        {
          id: "100100100",
          level: 0,
          label: "页面路由配置",
          children: []
        }
      ]
    };
  },

  methods: {
    clear() {
      this.form = Object.assign({}, this.form, {
        level: "", //菜单层级
        resName: "", //菜单名称
        autoCreate: false, //动态生成菜单路径
        resUrl: "", //路径
        sort: "", //排序
        // 自定义
        id: "",
        parentId: ""
      });
    },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span style={this.setStyle(data)}>
    //         <el-button
    //           type="text"
    //           on-click={() => this.addBtn(node, data)}
    //           v-if={data.level < 3}
    //         >
    //           add
    //         </el-button>
    //         <el-button
    //           type="text"
    //           on-click={() => this.editBtn(node, data)}
    //           v-if={data.id != "100100100"}
    //         >
    //           edit
    //         </el-button>
    //         <el-button
    //           type="text"
    //           on-click={() => remove(node, data)}
    //           v-if={data.id != "100100100"}
    //         >
    //           Delete
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    // },
    setStyle(data) {
      return "margin-right:" + (3 - data.level) * 30 + "px;";
    },
    getTree() {
      axios({
        method: "get",
        url: api + "/system/resource/getResourceList",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status !== 200 || res.data.code != 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          let data = res.data.data;
          this.treeData[0].children = (function deep(data) {
            return _.map(data, unit => {
              return {
                ...unit,
                // label: unit.resName + "(" + unit.resUrl + ")",
                label: unit.resName,
                children: unit.childs.length ? deep(unit.childs) : []
              };
            });
          })(data);
        })
        .catch(err => {
          this.$message.error(err || "请求错误！");
        });
    },
    addBtn(node, data) {
      console.log("addBtn:::", node, data);
      let level = data.level + 1;
      let id = data.id; //当前点击项的id
      let tongue; //[]已有的sort

      this.visible = true;
      this.formType = "add";
      this.form.level = level;
      if (level == 1) {
        tongue = _.map(this.treeData[0].children, unit => {
          return unit.sort;
        });
        this.form.sortList = _.filter(this.form.sortCradle, unit => {
          return tongue.indexOf(unit) == -1;
        }).map(unit => {
          return {
            label: unit,
            value: unit
          };
        });
      } else if (level > 1) {
        let nodeDot; //用于找到对应的项

        this.form.parentId = id;
        (function deepFind(curriculum) {
          _.map(curriculum, unit => {
            if (unit.id == id) {
              nodeDot = unit;
            }
            if (unit.children.length) {
              deepFind(unit.children);
            }
          });
        })(this.treeData[0].children);
        tongue = _.map(nodeDot.children, unit => {
          return unit.sort;
        });
        this.form.sortList = _.filter(this.form.sortCradle, unit => {
          return tongue.indexOf(unit) == -1;
        }).map(unit => {
          return {
            label: unit,
            value: unit
          };
        });
      }
    },
    remove(node, data) {
      axios({
        method: "get",
        url: api + "/system/resource/delResource",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token")
        },
        params: {
          id: data.id
        }
      })
        .then(res => {
          if (res.status !== 200 || res.data.code != 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          this.$message.success("删除成功！");
          this.getTree();
        })
        .catch(err => {
          this.$message.error(err || "请求错误！");
        });
    },
    editBtn(node, data) {
      console.log("editBtn:::", node, data);
      let id = data.id; //当前点击项的id
      let tongue; //[]已有的sort
      let nodeDot; //用于找到对应的父级项

      this.formType = "edit";
      this.visible = true;
      this.form = Object.assign({}, this.form, {
        parentId: data.parentId || "",
        id,
        level: data.level,
        resName: data.resName,
        resUrl: data.resUrl,
        menu: data.menu ? true : false,
        sort: data.sort
      });
      if (data.parentId) {
        (function deepFind(curriculum) {
          _.map(curriculum, unit => {
            if (unit.id == data.parentId) {
              nodeDot = unit;
            }
            if (unit.children.length) {
              deepFind(unit.children);
            }
          });
        })(this.treeData[0].children);
      } else {
        nodeDot = this.treeData[0];
      }
      tongue = _.map(nodeDot.children, unit => {
        return unit.sort;
      });
      this.form.sortList = _.filter(this.form.sortCradle, unit => {
        return tongue.indexOf(unit) == -1;
      }).map(unit => {
        return {
          label: unit,
          value: unit
        };
      });
    },
    handleAdd() {
      this.$refs.form.validate(boolean => {
        if (boolean) {
          if (this.formType == "edit") {
            this.handleEdit();
            return;
          }
          axios({
            method: "post",
            url: api + "/system/resource/addResource",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/Json; charset=UTF-8",
              "X-Authorization": "Bearer" + sessionStorage.getItem("token")
            },
            data: Object.assign({}, this.form, {
              parentId: this.form.level > 1 ? this.form.parentId : ""
            })
          })
            .then(res => {
              if (res.status !== 200 || res.data.code != 0) {
                this.$message.error(
                  res.statusText || res.data.message || "请求错误!"
                );
                return;
              }
              this.$message.success("新增成功！");
              this.cancel();
              this.getTree();
            })
            .catch(err => {
              this.$message.error(err || "请求错误！");
            });
        }
      });
    },
    handleEdit() {
      axios({
        method: "post",
        url: api + "/system/resource/updateResource ",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token")
        },
        data: Object.assign({}, this.form, {
          parentId: this.form.parentId || ""
        })
      })
        .then(res => {
          if (res.status !== 200 || res.data.code != 0) {
            this.$message.error(
              res.statusText || res.data.message || "请求错误!"
            );
            return;
          }
          this.$message.success("修改成功！");
          this.cancel();
          this.getTree();
        })
        .catch(err => {
          this.$message.error(err || "请求错误！");
        });
    },
    changeSwitch(boolean) {
      if (boolean) {
        let str =
          "/m" +
          Math.ceil(Math.random() * 1000000) +
          "e" +
          Math.ceil(Math.random() * 1000000);
        this.form.resUrl = str;
      }
    },
    cancel() {
      this.clear();
      this.visible = false;
    }
  },
  mounted() {
    this.getTree();
    for (let i = 1; i <= 50; i++) {
      this.form.sortCradle.push(i);
    }
  }
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