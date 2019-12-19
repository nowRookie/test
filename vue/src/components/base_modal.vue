<template>
  <div class="modal">
    <el-dialog
      :visible="visible"
      ref="dialogRef"
      @close="$emit('cancel')"
      :width="width"
      :modal="true"
      :destroy-on-close="true"
    >
      <div class="head_title" slot="title">{{this.title||"title"}}</div>
      <div class="content">
        <el-form
          :model="formData"
          ref="formRef"
          :label-width="labelWidth||'80px'"
          :inline="false"
          label-position="right"
          :hide-required-asterisk="false"
          :disabled="type=='detail'"
        >
          <el-row>
            <el-col v-for="item in itemsConfig" :key="item.key" :span="item.span||span||24">
              <!-- text -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'blur'}]:[]"
                v-if="!item.type||(item.type=='text')"
              >
                <el-input v-model="formData[item.key]" autocomplete="off" :disabled="item.disabled"></el-input>
              </el-form-item>
              <!-- textarea -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'blur'}]:[]"
                v-if="(item.type=='textarea')"
              >
                <el-input
                  type="textarea"
                  v-model="formData[item.key]"
                  autocomplete="off"
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
              <!-- select -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="item.type=='select'"
              >
                <el-select
                  :disabled="item.disabled"
                  clearable
                  filterable
                  value-key="value"
                  @change="(val)=>selectChange(val,item)"
                  v-model="formData[item.key]"
                  :placeholder="`请选择${item.title}`"
                  style="width:100%;"
                >
                  <el-option
                    v-for="unit in item.dataList"
                    :key="unit.key"
                    :label="unit.label"
                    :value="unit"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- autocomplete -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="item.type=='autocomplete'"
              >
                <el-select
                  v-model="formData[item.key]"
                  :disabled="item.disabled"
                  filterable
                  clearable
                  remote
                  :loading="item.loading"
                  :remote-method="(query)=>{remoteMethod(query,item)}"
                  value-key="value"
                  :placeholder="`请选择${item.title}`"
                  style="width:100%;"
                >
                  <el-option
                    v-for="unit in item.dataList"
                    :key="unit.key"
                    :label="unit.label"
                    :value="unit"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- multipleDate -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='multipleDate')"
              >
                <el-col :span="11">
                  <el-date-picker
                    :disabled="item.disabled"
                    type="date"
                    placeholder="选择开始日期"
                    v-model="formData[item.key].start"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
                <el-col class="tc line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    :disabled="item.disabled"
                    type="date"
                    placeholder="选择结束日期"
                    v-model="formData[item.key].end"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <!-- date -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='date')"
              >
                <el-date-picker
                  :disabled="item.disabled"
                  type="date"
                  :placeholder="`选择${item.title}`"
                  v-model="formData[item.key]"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <!-- checkbox -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='checkbox')"
              >
                <el-checkbox-group v-model="formData[item.key]" :disabled="item.disabled">
                  <el-checkbox
                    v-for="(unit,index) in item.dataList"
                    :disabled="unit.disabled"
                    :key="index"
                    :label="unit.value"
                    :name="item.key"
                  >{{unit.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- radio -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='radio')"
              >
                <el-radio-group v-model="formData[item.key]" :disabled="item.disabled">
                  <el-radio
                    v-for="(unit,index) in item.dataList"
                    :disabled="unit.disabled"
                    :key="index"
                    :label="unit.value"
                  >{{unit.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- switch -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='switch')"
              >
                <el-switch
                  v-model="formData[item.key]"
                  :disabled="item.disabled"
                  @change="val=>switchChange(val,item)"
                ></el-switch>
              </el-form-item>
              <!-- uploadFile -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='uploadFile')"
              >
                <el-upload
                  class="upload-demo"
                  :multiple="true"
                  :ref="item.key"
                  :action="item.options?item.options.action||'':'#'"
                  :name="item.options?item.options.name:'file'"
                  :on-change="handleChange.bind(this,item.key)"
                  :on-remove="handleRemove.bind(this,item.key)"
                  :file-list="formData[item.key]"
                  :auto-upload="false"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="primary"
                    :disabled="item.disabled"
                  >选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">{{item.options?item.options.tip:""}}</div>
                </el-upload>
              </el-form-item>
              <!-- area省/市/区 -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='area')"
              >
                <el-cascader
                  :size="item.size"
                  :options="regionData"
                  placeholder="请选择:省 / 市 / 区"
                  v-model="formData[item.key].area"
                ></el-cascader>
                <el-input
                  v-model="formData[item.key].detail"
                  placeholder="详细地址"
                  style="margin-top:10px;"
                ></el-input>
              </el-form-item>
              <!-- tree -->
              <el-form-item
                :label-width="item.labelWidth||labelWidth"
                :label="item.title"
                :prop="item.key"
                :required="item.required"
                :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'blur'}]:[]"
                v-else-if="(item.type=='tree')"
              >
                <el-tree
                  :ref="item.key"
                  :data="formData[item.key].data"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="item.default_expanded_keys"
                  :default-checked-keys="item.default_checked_keys"
                  :props="defaultProps"
                ></el-tree>
              </el-form-item>
              <!-- slot -->
              <slot v-else-if="(item.type=='slot')" :name="item.key"></slot>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <footer slot="footer">
        <el-button type="primary" @click="ok">确定</el-button>
        <el-button @click="cancel">取消</el-button>
        <slot name="operate" v-bind="{data:formData,params:params}"></slot>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
// import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import regionData from "@/assets/js/province";
import _ from "lodash";
export default {
  name: "modal",
  inheritAttrs: false,
  props: [
    "title",
    "itemsConfig",
    "visible",
    "width",
    "labelWidth",
    "span",
    "params",
    "type"
  ],
  data() {
    let formData = {};
    _.each(this.$props.itemsConfig, item => {
      if (item.type == "checkbox" || item.type == "uploadFile") {
        formData[item.key] = item.data ? item.data : [];
      } else if (item.type == "multipleDate") {
        formData[item.key] = {};
        formData[item.key].start = item.data ? item.data.start : "";
        formData[item.key].end = item.data ? item.data.end : "";
      } else if (item.type == "area") {
        formData[item.key] = {};
        formData[item.key].area = item.data ? item.data.area : [];
        formData[item.key].detail = item.data ? item.data.detail : "";
      } else if (item.type == "tree") {
        formData[item.key] = {};
        formData[item.key].type = "tree";
        formData[item.key].data = item.data;
      } else {
        formData[item.key] = item.data !== undefined ? item.data : "";
      }
    });
    return {
      formData,
      regionData: regionData,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleChange(key, file, fileList) {
      this.formData[key] = fileList;
    },
    handleRemove(key, file, fileList) {
      this.formData[key] = fileList;
    },
    ok() {
      if (this.type == "detail") {
        this.$emit("cancel");
        return;
      }
      this.$refs.formRef.validate((boolean, object) => {
        if (boolean) {
          // 给tree单元，设置checked属性
          for (let i in this.formData) {
            if (this.formData[i].type == "tree") {
              this.formData[i].checked = this.computedTreeData({
                key: i,
                data: this.formData[i].data
              });
            }
          }
          // 根据type类型为add、edit触发不同方法
          if (this.type == "add") {
            this.$emit("add", this.formData);
          } else if (this.type == "edit") {
            this.$emit("edit", this.formData, this.params);
          }
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    reset() {
      this.$refs.formRef.resetFields();
    },
    selectChange(val, item) {
      item.method(val);
    },
    switchChange(val, item) {
      item.method(val);
    },
    // autocomplete的远程方法
    remoteMethod(query, item) {
      if (query !== "") {
        item.method(query);
      }
    },
    computedTreeData({ key, data }) {
      let tree = this.$refs[key][0];
      if (tree.getCheckedKeys().length == 0) {
        return {};
      }
      return {
        getCheckedNodes: tree.getCheckedNodes(),
        getCheckedKeys: tree.getCheckedKeys(),
        getHalfCheckedNodes: tree.getHalfCheckedNodes(),
        getHalfCheckedKeys: tree.getHalfCheckedKeys(),
        getCurrentKey: tree.getCurrentKey(),
        getCurrentNode: tree.getCurrentNode(),
        getNode: tree.getNode()
      };
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.head_title {
  font-size: 18px;
}
</style>
