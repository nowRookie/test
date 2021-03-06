<template>
  <div class="add_table">
    <div class="between operate">
      <div v-if="title">{{title}}</div>
      <div v-else>
        <slot name="title"></slot>
      </div>
      <div>
        <a class="iconfont blue mr10" @click="handleAdd">&#xe62b;</a>
        <a class="iconfont gray" @click="handleDel" v-if="!(deletable===false)">&#xe638;</a>
      </div>
    </div>
    <el-table ref="tableRef" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" :selectable="selectableFun"></el-table-column>
      <el-table-column
        :label="item.title"
        v-for="(item,index) in items"
        :key="index"
        :width="item.width||''"
      >
        <template slot-scope="scope">
          <el-form
            :model="scope.row"
            :ref="`tableFormRef${index}_${scope.$index}`"
            :disabled="disabled"
          >
            <!-- text -->
            <el-form-item
              v-if="!item.type||item.type=='text'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'change' },{ required: true, message: `请输入${item.title}`, trigger: 'blur' },{ validator: validateTrim, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'change'},{ required: true, message: `请输入${item.title}`, trigger: 'blur' },{ validator: validateTrim, trigger: 'blur' }]:[]"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row[item.key]?scope.row[item.key].toString():''"
                placement="top"
              >
                <el-input
                  v-model="scope.row[item.key]"
                  :disabled="scope.row.disabled||(scope.row.mulDisabled?scope.row.mulDisabled.indexOf(item.key)!=-1:false)"
                  clearable
                ></el-input>
              </el-tooltip>
            </el-form-item>
            <!-- number -->
            <el-form-item
              v-if="item.type=='number'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'change' },{ required: true, message: `请输入${item.title}`, trigger: 'blur' },{type:'number',message:'请输入数字',trigger:'change'},{type:'number',message:'请输入数字',trigger:'blur'},{ validator: validateTrim, trigger: 'blur' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'change'},{ required: true, message: `请输入${item.title}`, trigger: 'blur' },{type:'number',message:'请输入数字',trigger:'change'},{type:'number',message:'请输入数字',trigger:'blur'},{ validator: validateTrim, trigger: 'blur' }]:[]"
            >
              <el-input
                v-model.number="scope.row[item.key]"
                :disabled="scope.row.disabled||(scope.row.mulDisabled?scope.row.mulDisabled.indexOf(item.key)!=-1:false)"
                clearable
              ></el-input>
            </el-form-item>
            <!-- select -->
            <el-form-item
              v-else-if="item.type=='select'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row[item.key]?scope.row[item.key].label.toString():''"
                placement="top"
              >
                <el-select
                  clearable
                  filterable
                  :disabled="scope.row.disabled||(scope.row.mulDisabled?scope.row.mulDisabled.indexOf(item.key)!=-1:false)"
                  style="width:100%;"
                  value-key="value"
                  v-model="scope.row[item.key]"
                  @change="(val)=>selectChange(item.key,val,scope.row,scope.$index)"
                >
                  <!-- 如果row数据中hasDefault里有当前项的key，就用hasDefault-key的值(当前row内)
                  否则，根据selectDefault中是否有key，来判断使用select-key-default的值(父组件上)
                  最后，使用select-key的值(父组件上)-->
                  <el-option
                    v-for="unit in (scope.row.hasDefault||[]).indexOf(item.key)!=-1?scope.row['hasDefault-'+[item.key]]:(scope.row.selectDefault||[]).indexOf(item.key)!=-1?$attrs['select-'+[item.key]+'-default']:$attrs['select-'+[item.key]]"
                    :key="unit.key"
                    :label="unit.label"
                    :value="unit"
                  ></el-option>
                </el-select>
              </el-tooltip>
            </el-form-item>
            <!-- switch -->
            <el-form-item
              v-else-if="item.type=='switch'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-switch
                v-model="scope.row[item.key]"
                :disabled="scope.row.disabled||(scope.row.mulDisabled?scope.row.mulDisabled.indexOf(item.key)!=-1:false)"
              ></el-switch>
            </el-form-item>
            <!-- date -->
            <el-form-item
              v-else-if="item.type=='date'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row[item.key]?moment(scope.row[item.key].toString()):''"
                placement="top"
              >
                <el-date-picker
                  v-model="scope.row[item.key]"
                  style="width:100%;"
                  type="date"
                  :disabled="scope.row.disabled||(scope.row.mulDisabled?scope.row.mulDisabled.indexOf(item.key)!=-1:false)"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-tooltip>
            </el-form-item>
            <!-- slot -->
            <el-form-item v-else-if="item.type=='slot'">
              <slot
                :name="item.key"
                :index="scope.$index"
                :row="scope.row"
                :column="scope.column"
                :childData="tableData"
              ></slot>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import _ from "lodash";
import moment from "moment";
export default {
  name: "add_table",
  props: ["title", "items", "data", "disabled", "deletable", "doAdd"],
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  computed: {},
  methods: {
    validateTrim(rule, value, callback) {
      let trim = /^\s+|\s+$/;
      if (trim.test(value)) {
        callback(new Error("首尾不能为空格"));
      } else {
        callback();
      }
    },
    moment(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    selectableFun(row, index) {
      if (row.checkable === false) return false;
      return true;
    },
    selectChange(key, val, row) {
      this.$emit(`change-${key}`, val, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      if (this.doAdd) {
        this.$emit("addFn");
      } else {
        this.tableData.push({});
      }
    },
    handleDel() {
      let _this = this;
      let arr = [];
      let val = this.multipleSelection;
      if (val) {
        val.forEach(function(item) {
          _this.tableData.forEach(function(itemI, indexI) {
            if (item === itemI) {
              _this.tableData.splice(indexI, 1);
            }
          });
        });
      }
      this.$refs.tableRef.clearSelection();
    },
    // 暴露的方法-获取table数据
    getData() {
      let count = 0;
      return new Promise((resolve, reject) => {
        for (let i = 0; i < this.items.length; i++) {
          for (let j = 0; j < this.tableData.length; j++) {
            this.$refs[`tableFormRef${i}_${j}`][0].validate(boolean => {
              if (boolean) count++;
            });
          }
        }
        if (count == this.items.length * this.tableData.length) {
          resolve(this.tableData);
        } else {
          reject("表格验证不通过");
        }
      });
    }
  },
  mounted() {
    this.tableData = this.data.length ? [].concat(this.data) : [];
  },
  watch: {
    data() {
      this.tableData = this.data.length ? [].concat(this.data) : [];
    }
  }
};
</script>
<style lang="less" scoped>
.el-form-item {
  margin: 0;
}
.operate {
  .iconfont {
    font-size: 24px;
  }
}
</style>