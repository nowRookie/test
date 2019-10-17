<template>
  <div class="hello">
    <div class="mt20">
      <container-input :itemsConfig="modalItems" :confirm="true" labelWidth="100px">
        <template v-slot:operate="scope">
          <el-button @click="click(scope)">按钮</el-button>
        </template>
      </container-input>
    </div>
    <div class="mt20">
      <el-button @click="visible=true">modal</el-button>
    </div>
    <div class="mt20">
      <base-table :data="dataList"></base-table>
    </div>
    <!-- 弹窗modal -->
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
</template>

<script>
import BaseModal from "./base_modal";
import containerInput from "./container_input";
import baseTable from "./table";
export default {
  name: "HelloWorld",
  components: { BaseModal, containerInput,baseTable },
  data() {
    return {
      visible: false,
      modalType: "add",
      modalTitle: "",
      params: {},
      dataList: [],
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
    click(scope) {
      console.log(scope);
    },
    addBtn() {
      this.visible = true;
      this.modalType = "add";
      this.modalTitle = "新增";
    },
    handleAdd() {},
    handleView() {
      this.visible = true;
      this.modalType = "edit";
      this.modalTitle = "详情";
      this.$store.commit("saleBargainManage/editModalItems", {});
    },
    handleEdit(data) {
      console.log(data);
    },
    cancelBtn() {
      this.visible = false;
    }
  }
};
</script>
</style>
