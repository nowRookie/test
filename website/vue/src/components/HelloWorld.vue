<template>
  <div class="h100 helloWorld" style="padding:50px;">
    <!-- 自定义上传 -->
    <div class="mb20">
      <span>
        <label class="inline-block bluebtn uploadBtn" for="fileInput1">自定义上传</label>
        <input
          type="file"
          id="fileInput1"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style="display:none;"
          @change="uploadTempFile"
        />
      </span>
    </div>
    <!-- containeInput -->
    <div class="mt20">
      <h2 style="color:purple">containerInput:</h2>
      <!-- 
        属性:
          items:array,必须,根据对应项生成整个form结构
          content:不传值||boolean,非必须,用来去掉查询按钮(常用来通过this.$refs.containerInput.getData().then(data=>{}))获取整个form数据
          disabled:boolean,非必须,控制整个form为disabled
          span:number,非必须,用来控制整个form的span
          labelWidth:string,非必须,控制整个form的label宽度
          layout:array,[12,12]左右所占span宽度
          @ok:方法,非必须,触发form验证和查询
        备注:
          template里可以为自定义内容,v-slot:operate为操作处(默认会有一个查询按钮),v-slot:customer为items中的某一项({key:customer,type:slot})
          items项中{type:"tree"}的项无法通过disabled控制(只能通过它的data数据控制树结构的disabled)
      -->
      <container-input
        ref="containerInputRef"
        :items="inputItems"
        content
        :disabled="true"
        :layout="[12,12]"
        labelWidth="120px"
        @ok="inputSearch"
      >
        <template v-slot:operate="scope">
          <el-button @click="operate(scope)">按钮</el-button>
        </template>
        <template v-slot:customer>这是一段自定义内容</template>
      </container-input>
    </div>

    <!-- baseModal -->
    <div class="mt20">
      <h2 style="color:purple">modal:</h2>
      <el-button type="primary" @click="modalVisible=true">modal</el-button>
      <!-- 
        属性:
          visible:boolean,必须,判断modal是否显示
          items:array,必须,根据对应项生成整个form结构
          type:string,必须,有三种,分别是add(用来触发@add方法),edit(触发@edit方法),detail(控制整个form为disabled,仅触发@cancel方法)
          params:{},非必须,用来传递除了整个form的键值对以外的额外参数
          title:string,非必须,设置modal的title
          width:string,非必须,控制整个form的宽度
          labelWidth:string,非必须,控制整个form的label宽度
          span:number,非必须,用来控制整个form的span
          @add:方法,跟type绑定,当type=add时触发@add方法
          @edit:方法,触发@edit方法
          @cancel:方法,设置visible=false,用来关闭modal
          @error:方法，验证表单不通过时触发
        备注:
          template里可以为自定义内容,v-slot:operate为操作处(默认会有确定取消按钮),v-slot:customer为items中的某一项({key:customer,type:slot})
      -->
      <base-modal
        ref="modalRef"
        v-if="modalVisible"
        :visible.sync="modalVisible"
        :items="modalItems"
        :type="modalType"
        :params="modalParams"
        :title="modalTitle"
        labelWidth="120px"
        :shadow="true"
        width="1000px"
        :span="12"
        @add="modalAdd"
        @edit="modalEdit"
        @cancel="modalCancel"
        @error="modalError"
      >
        <template v-slot:customer="scope">
          这是一段自定义内容
          <el-button @click="operate(scope)">按钮</el-button>
        </template>
      </base-modal>
    </div>

    <!-- baseTable -->
    <div class="mt20">
      <h2 style="color:purple">base-table:</h2>
      <!-- 
        属性:
          items:array,必须,根据对应项生成table结构
          type:"selection",非必须,整个table是否可被选中
          data:array,必须,table组件的data
          pages:{},仅hidePage=true时为非必须,通常为{pageNum,pageSize,totalPageNum,total}用来和@change联动
          hidePage,boolean,非必须,隐藏page
          hideSingle,boolean,非必须,是否单页隐藏
          @change:方法,必须,function({pageNum,PageSize})用来向后端请求对应数据
        备注:
          template里可以为自定义内容,v-slot:customer为items中的某一项({key:customer,type:slot})
      -->
      <base-table
        ref="baseTableRef"
        :items="basetableItems"
        type="selection"
        :data="basetableData"
        :pages="baseTablePages"
        @change="tablePageChange"
        :hidePage="true"
      >
        <template v-slot:customer="scope">
          <el-button @click="cradle(scope)">按钮</el-button>
        </template>
      </base-table>
      <div>
        <el-button type="primary" @click="getChecked">获取table选中项</el-button>
      </div>
    </div>

    <!-- queryTtable -->
    <div class="mt20">
      <h2 style="color:purple">query-table:</h2>
      <!-- 
        属性:
          items:array,必须,根据对应项生成table结构
          query:{},必须,查询条件,axios对应的请求request
          type,"selection",非必须,整个table是否可被选中
          afterQuery:方法,非必须,用于处理res||data，必须要return一个[],因为这是table的data
        备注:
          template里可以为自定义内容,v-slot:customer为items中的某一项({key:customer,type:slot})
          通过更新query对象(Object.assign({},query))可以触发query-table数据更新
          通过$refs的getChecked()可以拿到选中项
      -->
      <!-- <query-table
        :items="querytableItems"
        :query="queryParams"
        type="selection"
        :afterQuery="afterQuery"
        :hidePage="true"
      >
        <template v-slot:customer="scope">
          <el-button @click="cradle(scope)">按钮</el-button>
        </template>
      </query-table>-->
    </div>

    <!-- addTable -->
    <div class="mt20">
      <h2 style="color:purple">add-table:</h2>
      <!-- 
        属性:
          items:array,必须,根据对应项生成table结构
          data:array,必须,table组件的data
          disabled:boolean,非必须,整个table设置为disabled
          deletable:boolean,非必须,是否展示删除按钮
          select-*:array,非必须,若table中有select时,用来渲染select的options项(select-age:"age"对应addTableItems中的{key:age})
          @change-*:方法,对应select-*的chang事件
          doAdd和@addFn配合使用，用来控制新增按钮的方法(有的时候想要在父组件直接控制新增)
        data数据中根据每项参数分别渲染：
          [
            {
              disabled:true,//整行disabled
              mulDisabled:[ key值 ],//根据key值disabled
              hasDefault:[ key值 ],主要用来渲染select(hasDefault-key值)
              selectDefault:[ key值 ],主要用来渲染select，默认有那些值(select-key值-default)
            }
          ]
        备注:
          template里可以为自定义内容,v-slot:customer为items中的某一项({key:customer,type:slot})
      -->
      <add-table
        ref="addTableRef"
        title="标题1"
        :items="addTableItems"
        :data="addTableData"
        :select-age="selectAge"
        @change-age="selectChangeAge"
        :select-height="selectHeight"
        @change-height="selectChangeHeight"
      >
        <template v-slot:customer="scope">
          <a @click="addTableFun(scope)">自定义方法</a>
        </template>
      </add-table>
      <el-button type="primary" @click="getAddTableData">获取add-table数据</el-button>
    </div>
  </div>
</template>

<script>

import _ from "lodash";
import moment from "moment";
import axios from "axios";
import { getOptions, dealDate } from "@/utils/utils";

const api = process.env.VUE_APP_API_URL;

export default {
  name: "HelloWorld",
  computed: {
    inputItems() {
      return [].concat(this.modalItems);
    },
    basetableItems() {
      return [].concat(this.querytableItems);
    },
  },
  data() {
    let self = this;
    return {
      startDate: null,
      // startDateOptions: {
      //   disabledDate(date) {
      //     return date.getTime() > new Date().getTime();
      //   },
      // },
      modalVisible: false,
      modalType: "add",
      modalTitle: "",
      modalParams: {},
      modalItems: [
        {
          title: "text",
          key: "text",
          type: "text",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: "text",
          hide: true,
        },
        {
          title: "fee",
          key: "fee",
          type: "fee",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: 10,
        },
        {
          title: "number",
          key: "number",
          type: "number",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: 10,
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
            { label: "项目2", value: "val2" },
          ],
          data: { label: "项目1", value: "val1" },
          method: function (childData, val) {
            console.log("###", val, self.modalItems);
          },
        },
        {
          title: "mulSelect",
          key: "mulSelect",
          type: "mulSelect",
          labelWidth: "120px",
          span: 8,
          required: true,
          dataList: [
            { label: "项目1", value: "val1" },
            { label: "项目3", value: "val3" },
            { label: "项目2", value: "val2" },
          ],
          data: [
            { label: "项目1", value: "val1" },
            { label: "项目2", value: "val2" },
          ],
          method: function (childData, val) {
            console.log("###", val, self.modalItems);
          },
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
            { label: "内容2", value: "val2" },
          ],
          loading: false,
          method: function (query) {
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
          data: { label: "内容2", value: "val2" },
        },
        {
          title: "date",
          key: "date",
          type: "date",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: "2019-10-15",
          method: function (childData, val) {
            self.modalItems[3].dataList = [{ label: 11111, value: 11 }]; //改其他项的dataList
            childData["text"] = "YYYY-MM-DD"; //改其他项的data
          },
        },
        {
          title: "inputsNumber",
          key: "inputsNumber",
          type: "inputsNumber",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: 10,
        },
        {
          title: "mulDate",
          key: "mulDate",
          type: "mulDate",
          labelWidth: "120px",
          // disabled: true,
          span: 10,
          required: true,
          // data: {
          //   start: "2019-01-01",
          //   end: "2019-12-01",
          // },
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
            { label: "状态3", value: 3 },
          ],
          data: [2, 3],
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
            { label: "选项3", value: 3 },
          ],
          data: 3,
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
            detail: "详细地址",
          },
        },
        {
          title: "switch",
          key: "switch",
          type: "switch",
          labelWidth: "120px",
          span: 8,
          required: true,
          data: true,
          method: function (childData, val) {
            console.log("###", val);
          },
        },
        {
          title: "textarea",
          key: "textarea",
          type: "textarea",
          labelWidth: "120px",
          span: 24,
          required: false,
          data: null,
        },
        {
          title: "uploadFile",
          key: "uploadFile",
          type: "uploadFile",
          listType: "picture-card",
          // accept: "image/*",
          // name: "file",
          labelWidth: "120px",
          span: 24,
          required: true,
          data: [{ name: "文件1", url: "" }],
        },
        {
          title: "autoupload",
          key: "autoupload",
          type: "autoupload",
          listType: "picture-card",
          accept: "image/*",
          action: "/fileUpload/protocol",
          headers: {},
          name: "files",
          labelWidth: "120px",
          span: 24,
          required: true,
          data: [{ name: "文件1", url: "" }],
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
                { label: "选项1-2", id: "1-2" },
              ],
            },
            {
              label: "选项2",
              id: "2",
              children: [{ label: "选项2-1", id: "2-1" }],
            },
          ],
          default_expanded_keys: ["1"],
          default_checked_keys: ["1-1"],
        },
        {
          key: "customer",
          type: "slot",
        },
      ],
      baseTablePages: {},
      queryParams: {
        url: "#",
        method: "post",
        data: {},
      },
      querytableItems: [
        {
          key: "id",
          title: "id",
        },
        {
          key: "firstName",
          title: "姓名",
          sortable: true,
          checkable: false,
        },
        {
          key: "age",
          title: "年龄",
          sortable: true,
        },
        {
          key: "color",
          title: "喜欢颜色",
          sortable: true,
          sortGrade: true,
        },
        {
          key: "animal",
          title: "喜欢动物",
        },
        {
          key: "customer",
          type: "slot",
          width: 200,
          title: "按钮",
        },
      ],
      basetableData: [
        {
          id: "001",
          firstName: "zhang",
          age: 18,
          color: "m",
          animal: "seal",
          checkable: false,
        },
        {
          id: "001",
          firstName: "zhang",
          age: 18,
          color: "d",
          animal: "monkey",
        },
        {
          id: "002",
          firstName: "li",
          age: 40,
          color: "o",
          animal: "horse",
        },
        {
          id: "003",
          firstName: "wang",
          age: 20,
          color: "z",
          animal: "tiger",
        },
        {
          id: "003",
          firstName: "wang",
          age: 20,
          color: "b",
          animal: "tiger",
        },
        {
          id: "002",
          firstName: "li",
          age: 40,
          color: "h",
          animal: "horse",
        },
        {
          id: "003",
          firstName: "wang",
          age: 20,
          color: "y",
          animal: "tiger",
        },
        {
          id: "001",
          firstName: "zhang",
          age: 18,
          color: "k",
          animal: "monkey",
        },
      ],
      addTableItems: [
        {
          type: "text",
          key: "username",
          title: "用户名",
          required: true,
        },
        {
          type: "number",
          key: "num",
          title: "数量",
          rules: [],
        },
        {
          type: "select",
          key: "age",
          title: "年龄",
          rules: [],
        },
        {
          type: "select",
          key: "height",
          title: "身高",
        },
        {
          type: "switch",
          key: "beauty",
          title: "是否美女",
        },
        {
          type: "date",
          key: "dates",
          title: "日期",
          rules: [],
        },
        {
          key: "customer",
          type: "slot",
        },
      ],
      selectAge: [
        {
          label: "年龄1",
          value: 1,
        },
        {
          label: "年龄2",
          value: 2,
        },
      ],
      selectHeight: [
        {
          label: "170",
          value: 170,
        },
        {
          label: "175",
          value: 175,
        },
        {
          label: "180",
          value: 180,
        },
      ],
      addTableData: [
        {
          age: {
            label: "年龄2",
            value: 2,
          },
          username: "zhang",
          beauty: true,
          disabled: true,
        },
        {
          age: {
            label: "年龄1",
            value: 1,
          },
          username: "wang",
          checkable: false,
          selectDefault: ["age"],
          mulDisabled: ["age"],
        },
      ],
    };
  },
  methods: {
    consoles(val) {
      console.log(val);
    },
    post() {
      const postParams = {};
      const options = getOptions({
        url: "#",
        method: "post",
        data: postParams,
      });
      axios(options)
        .then((res) => {
          if (res.data.code != 0) {
            this.$message.error(res.data.message || "网络错误!");
            return;
          }
          let data = (res.data && res.data.data) || {};
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err || "请求错误",
          });
        });
    },
    calculate(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
    dealDate(time) {
      return dealDate({ value: time });
    },
    beforeUpload(file) {
      const limit_2M = file.size / 1024 / 1024 < 2;
      if (!limit_2M) {
        this.$message.error("请上传2M以下的文件");
        return false;
      }
    },
    uploadTempFile() {
      const file = document.getElementById("fileInput1").files[0];
      if (!file) return;
      this.beforeUpload(file);
      upload({
        url: "/Mch/importItem",
        data: [file],
        name: "file",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          // "Content-Type": "application/Json; charset=UTF-8",
          "X-Authorization": "Bearer" + sessionStorage.getItem("token"),
        },
        params: {},
      })
        .then(({ res, data }) => {
          if (res.data.code !== 0) {
            this.$message({
              type: "error",
              message: res.data.message || "网络错误!",
            });
            return;
          }
          this.$message({
            type: "success",
            message: res.data.message || "导入成功",
          });
          this.queryParams = Object.assign({}, this.queryParams);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.message || "请求错误!",
          });
        })
        .then(() => {
          document.getElementById("fileInput1").value = null;
        });
    },
    getChecked() {
      let checkedData = this.$refs.baseTableRef.getChecked();
      console.log(checkedData);
    },
    addTableFun(scope) {
      console.log(scope);
    },
    inputSearch(data) {
      console.log(data);
    },
    afterQuery({ res, data }) {
      return this.basetableData;
      // return data;
    },
    tablePageChange({ pageSize, pageNum }) {
      setTimeout(() => {
        let res = {
          pageNum: 5,
          pageSize: 20,
          totalPageNum: 30,
          total: 298,
        };
        this.baseTablePages = res;
      }, 3000);
    },
    operate(scope) {
      console.log(scope);
    },
    cradle(scope) {},
    addBtn() {
      this.modalVisible = true;
      this.modalType = "add";
      this.modalTitle = "新增";
    },
    modalAdd(data, params) {
      console.log(data);
    },
    modalEdit(data, params) {},
    modalError(err) {
      console.log(err);
    },
    modalCancel() {
      this.modalVisible = false;
    },
    selectChangeAge(val, row) {
      console.log("age:::", val, row);
    },
    selectChangeHeight(val, row) {
      console.log("height:::", val, row);
    },
    getAddTableData() {
      this.$refs.addTableRef
        .getData()
        .then((res) => {
          console.log(res);
        })
        .catch(() => {
          console.log("验证有错误！");
        });
    },
  },
  mounted() {
    // let category = Array.from(
    //   new Set(
    //     _.map(this.basetableData, (unit) => {
    //       return unit.id;
    //     })
    //   )
    // );
    // let classify = {};
    // _.map(category, (unit) => {
    //   classify[unit] = {
    //     index: this.basetableData.findIndex((val) => {
    //       return val.id === unit;
    //     }),
    //     length: this.basetableData.filter((d) => {
    //       return d.id == unit;
    //     }).length,
    //   };
    // });
    // let iArr = _.map(category, (unit) => {
    //   return this.basetableData.findIndex((val) => {
    //     return val.id == unit;
    //   });
    // });
    // this.basetableData = this.basetableData
    //   .map((unit, index) => {
    //     return {
    //       ...unit,
    //       rowSpanLength:
    //         iArr.indexOf(index) != -1 ? classify[unit.id].length : 0,
    //     };
    //   })
    //   .sort((a, b) => {
    //     return a.id - b.id;
    //   });
  },
};
</script>
<style lang="less" scoped>
.helloWorld {
  overflow: scroll;
}
.uploadBtn {
  padding: 9px 20px;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    // color: rgba(28, 207, 191, 1);
    // background: rgba(28, 207, 191, 0.1);
    color: #409eff;
    background: #ecf5ff;
  }
}
</style>
