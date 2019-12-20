<template>
  <div class="hello" style="padding:50px;">
    <!-- container-input -->
    <div class="mt20">
      <h2 style="color:purple">containerInput:</h2>
      <container-input :itemsConfig="modalItems" :confirm="true" labelWidth="120px">
        <template v-slot:operate="scope">
          <el-button @click="operate(scope)">按钮</el-button>
        </template>
      </container-input>
    </div>
    <!-- base-modal -->
    <div class="mt20">
      <h2 style="color:purple">modal:</h2>
      <el-button @click="visible=true">modal</el-button>
      <base-modal
        v-if="visible"
        :visible.sync="visible"
        :itemsConfig="modalItems"
        :type="modalType"
        :params="params"
        @add="handleAdd"
        @edit="handleEdit"
        @cancel="cancelBtn"
        :title="modalTitle"
        labelWidth="120px"
        width="800px"
        :span="24"
      ></base-modal>
    </div>
    <!-- base-table -->
    <div class="mt20">
      <h2 style="color:purple">base-table:</h2>
      <base-table
        :items="tableConfigs.items"
        :data="tableDataList"
        :pages="tableConfigs.pages"
        @change="change"
      >
        <template v-slot:value="scope">
          <el-button @click="cradle(scope)">按钮</el-button>
        </template>
      </base-table>
    </div>
    <!-- query-table -->
    <div class="mt20">
      <h2 style="color:purple">query-table:</h2>
      <query-table :items="tableConfigs.items" :query="query" :type="''||'selection'">
        <template v-slot:value="scope">
          <el-button @click="cradle(scope)">按钮</el-button>
        </template>
      </query-table>
    </div>
    <!-- add-table -->
    <div class="mt20">
      <h2 style="color:purple">add-table:</h2>
      <add-table
        ref="addTableRef"
        :items="addTableItems"
        :data="addTableData"
        :select-age="selectAge"
        @select-change="selectChange"
      >
        <template v-slot:title>
          <span style="font-size:18px;">标题</span>
        </template>
      </add-table>
      <el-button @click="button">获取add-table数据</el-button>
    </div>
  </div>
</template>

<script>
import baseModal from "./base_modal";
import containerInput from "./container_input";
import baseTable from "./base_table";
import queryTable from "./query_table";
import addTable from "@/components/add_table";

import axios from "axios";
import { type } from "../utils/utils";

export default {
  name: "HelloWorld",
  components: { baseModal, containerInput, baseTable, queryTable, addTable },
  data() {
    let self = this;
    return {
      visible: false,
      modalType: "add",
      modalTitle: "",
      params: {},
      query: {
        url: "#",
        method: "post",
        data: {}
      },
      tableConfigs: {
        pages: {},
        items: [
          {
            key: "value",
            type: "slot",
            width: 200,
            title: "姓名"
          },
          {
            key: "certificateCode",
            title: "年龄"
          },
          {
            key: "animal",
            type: "slot",
            title: "动物"
          },
          {
            key: "color",
            title: "颜色"
          }
        ]
      },
      tableDataList: [
        {
          value: "zhang",
          age: 18,
          color: "purple",
          animal: "seal"
        },
        {
          value: "wang",
          age: 25,
          color: "tan",
          animal: "monkey"
        },
        {
          value: "li",
          age: 40,
          color: "pink",
          animal: "horse"
        }
      ],
      modalItems: [
        {
          title: "text",
          key: "text",
          type: "text",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: "text"
        },
        {
          title: "select",
          key: "select",
          type: "select",
          labelWidth: "120px",
          span: 8,
          required: true,
          dataList: [
            { label: "项目1", value: "val1" },
            { label: "项目2", value: "val2" }
          ],
          data: { label: "项目1", value: "val1" },
          method: function(val) {
            console.log("###", val, self.modalItems);
          }
        },
        {
          title: "autocomplete",
          key: "autocomplete",
          type: "autocomplete",
          labelWidth: "120px",
          span: 8,
          required: true,
          dataList: [
            { label: "内容1", value: "val1" },
            { label: "内容2", value: "val2" }
          ],
          loading: false,
          method: function(query) {
            let random = Math.random();
            console.log(random, query);
            if (this.loading) return;
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.dataList =
                random > 0.5
                  ? [{ label: "内容3", value: "val3" }]
                  : [{ label: "内容4", value: "val4" }];
            }, 1000);
          },
          data: { label: "内容2", value: "val2" }
        },
        {
          title: "date",
          key: "date",
          type: "date",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: "2019-10-15"
        },
        {
          title: "multipleDate",
          key: "multipleDate",
          type: "multipleDate",
          labelWidth: "120px",
          span: 16,
          required: true,
          data: {
            start: "2019-01-01",
            end: "2019-12-01"
          }
        },
        {
          title: "checkbox",
          key: "checkbox",
          type: "checkbox",
          labelWidth: "120px",
          span: 16,
          required: true,
          dataList: [
            { label: "状态1", value: 1 },
            { label: "状态2", value: 2 },
            { label: "状态3", value: 3 }
          ],
          data: [2, 3]
        },
        {
          title: "radio",
          key: "radio",
          type: "radio",
          labelWidth: "120px",
          span: 16,
          required: true,
          dataList: [
            { label: "选项1", value: 1 },
            { label: "选项2", value: 2 },
            { label: "选项3", value: 3 }
          ],
          data: 3
        },
        {
          title: "area",
          key: "area",
          type: "area",
          labelWidth: "120px",
          span: 24,
          required: true,
          data: {
            area: ["120000", "120100", "120101"],
            detail: "详细地址"
          }
        },
        {
          title: "switch",
          key: "switch",
          type: "switch",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: true,
          method: function(val) {
            console.log("###", val);
          }
        },
        {
          title: "uploadFile",
          key: "uploadFile",
          type: "uploadFile",
          labelWidth: "120px",
          span: 24,
          required: true,
          data: [{ name: "文件1", url: "" }]
        },
        {
          title: "tree",
          key: "tree",
          type: "tree",
          labelWidth: "120px",
          span: 24,
          required: true,
          data: [
            {
              label: "选项1",
              id: "1",
              children: [
                { label: "选项1-1", id: "1-1" },
                { label: "选项1-2", id: "1-2" }
              ]
            },
            {
              label: "选项2",
              id: "2",
              children: [{ label: "选项2-1", id: "2-1" }]
            }
          ],
          default_expanded_keys: ["1"],
          default_checked_keys: ["1-1"]
        }
      ],
      addTableItems: [
        {
          type: "text",
          key: "username",
          title: "用户名",
          required: true
        },
        {
          type: "number",
          key: "num",
          title: "数量"
        },
        {
          type: "select",
          key: "age",
          title: "年龄",
          rules: []
        },
        {
          type: "switch",
          key: "beauty",
          title: "是否美女"
        },
        {
          type: "date",
          key: "dates",
          title: "日期",
          rules: []
        }
      ],
      selectAge: [
        {
          label: "年龄1",
          value: 1
        },
        {
          label: "年龄2",
          value: 2
        }
      ],
      addTableData: [
        {
          id: 0,
          age: {
            label: "年龄2",
            value: 2
          },
          username: "zhang",
          beauty: true
        },
        {
          id: 1,
          age: {
            label: "年龄1",
            value: 1
          },
          username: "wang"
        }
      ]
    };
  },
  methods: {
    change({ pageSize, pageNum }) {
      setTimeout(() => {
        let res = {
          pageNum: 5,
          pageSize: 20,
          totalPageNum: 30,
          total: 298
        };
        this.tableConfigs.pages = res;
      }, 3000);
    },
    operate(scope) {
      console.log(scope);
    },
    cradle(scope) {},
    addBtn() {
      this.visible = true;
      this.modalType = "add";
      this.modalTitle = "新增";
    },
    handleAdd() {},
    handleView() {},
    handleEdit(data) {},
    cancelBtn() {
      this.visible = false;
    },
    selectChange(val, item) {
      console.log(11111, val, item);
    },
    button() {
      this.$refs.addTableRef
        .getData()
        .then(res => {
          console.log(res);
        })
        .catch(() => {
          console.log("验证有错误！");
        });
    }
  },
  mounted() {
    // setTimeout(() => {
    //   let res = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     totalPageNum: 20,
    //     total: 198
    //   };
    //   this.tableConfigs.pages = res;
    // }, 3000);
  }
};
</script>
</style>
