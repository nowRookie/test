<template>
  <div class="hello" style="padding:50px;">
    <!-- containerInput -->
    <div class="mt20">
      <h2 style="color:purple">containerInput:</h2>
      <container-input :itemsConfig="modalItems" :confirm="true" labelWidth="100px">
        <template v-slot:operate="scope">
          <el-button @click="operate(scope)">按钮</el-button>
        </template>
      </container-input>
    </div>
    <!-- modal -->
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
        labelWidth="100px"
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
      <query-table :items="tableConfigs.items" :query="query">
        <template v-slot:value="scope">
          <el-button @click="cradle(scope)">按钮</el-button>
        </template>
      </query-table>
    </div>
  </div>
</template>

<script>
import baseModal from "./base_modal";
import containerInput from "./container_input";
import baseTable from "./base_table";
import queryTable from "./query_table";

import axios from "axios";

export default {
  name: "HelloWorld",
  components: { baseModal, containerInput, baseTable, queryTable },
  data() {
    return {
      visible: false,
      modalType: "add",
      modalTitle: "",
      params: {},
      query: {
        url: "http://192.168.1.115:8500/pc/partner/getPartnerList",
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
          labelWidth: "100px",
          span: 8,
          required: true,
          data: "text"
        },
        {
          title: "select",
          key: "select",
          type: "select",
          labelWidth: "100px",
          span: 8,
          required: true,
          dataList: [
            { label: "项目1", value: "val1" },
            { label: "项目2", value: "val2" }
          ],
          data: "val1"
        },
        {
          title: "autocomplete",
          key: "autocomplete",
          type: "autocomplete",
          labelWidth: "100px",
          span: 8,
          required: true,
          dataList: [
            { label: "内容1", value: "val1" },
            { label: "内容2", value: "val2" }
          ],
          data: "val2"
        },
        {
          title: "date",
          key: "date",
          type: "date",
          labelWidth: "100px",
          span: 8,
          required: true,
          data: "2019-10-15"
        },
        {
          title: "multipleDate",
          key: "multipleDate",
          type: "multipleDate",
          labelWidth: "100px",
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
          labelWidth: "100px",
          span: 16,
          required: true,
          dataList: ["状态1", "状态2", "状态3"],
          data: ["状态2"]
        },
        {
          title: "radio",
          key: "radio",
          type: "radio",
          labelWidth: "100px",
          span: 16,
          required: true,
          dataList: ["选项1", "选项2", "选项3"],
          data: "选项2"
        },
        {
          title: "area",
          key: "area",
          type: "area",
          labelWidth: "100px",
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
          labelWidth: "100px",
          span: 8,
          required: true,
          data: true
        },
        {
          title: "uploadFile",
          key: "uploadFile",
          type: "uploadFile",
          labelWidth: "100px",
          span: 24,
          required: true,
          data: [{ name: "文件1", url: "" }]
        },
        {
          title: "tree",
          key: "tree",
          type: "tree",
          labelWidth: "100px",
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
    cradle(scope) {
      console.log("scope=====", scope);
    },
    addBtn() {
      this.visible = true;
      this.modalType = "add";
      this.modalTitle = "新增";
    },
    handleAdd() {},
    handleView() {},
    handleEdit(data) {
      console.log(data);
    },
    cancelBtn() {
      this.visible = false;
    }
  },
  mounted() {
    setTimeout(() => {
      let res = {
        pageNum: 1,
        pageSize: 10,
        totalPageNum: 20,
        total: 198
      };
      this.tableConfigs.pages = res;
    }, 3000);
  }
};
</script>
</style>
