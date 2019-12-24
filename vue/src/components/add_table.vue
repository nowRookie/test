<template>
  <div class="add_table">
    <div class="between operate">
      <div>
        <slot name="title"></slot>
      </div>
      <div>
        <a class="iconfont blue mr10" @click="handleAdd">&#xe62b;</a>
        <a class="iconfont gray" @click="handleDel">&#xe638;</a>
      </div>
    </div>
    <el-table
      ref="tableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column :label="item.title" v-for="(item,index) in items" :key="index">
        <template slot-scope="scope">
          <el-form :model="scope.row" :ref="`tableFormRef${index}_${scope.$index}`">
            <!-- text -->
            <el-form-item
              v-if="!item.type||item.type=='text'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'change'}]:[]"
            >
              <el-input v-model="scope.row[item.key]" clearable></el-input>
            </el-form-item>
            <!-- number -->
            <el-form-item
              v-if="item.type=='number'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请输入${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请输入${item.title}`,trigger:'change'}]:[]"
            >
              <el-input v-model="scope.row[item.key]" type="number" min="0"></el-input>
            </el-form-item>
            <!-- select -->
            <el-form-item
              v-else-if="item.type=='select'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-select
                clearable
                filterable
                style="width:100%;"
                value-key="value"
                v-model="scope.row[item.key]"
                @change="(val)=>selectChange(item.key,val,scope.row)"
              >
                <el-option
                  v-for="unit in $attrs['select-'+[item.key]]"
                  :key="unit.key"
                  :label="unit.label"
                  :value="unit"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- switch -->
            <el-form-item
              v-else-if="item.type=='switch'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-switch v-model="scope.row[item.key]"></el-switch>
            </el-form-item>
            <!-- date -->
            <el-form-item
              v-else-if="item.type=='date'"
              :prop="item.key"
              :rules="item.rules?[{ required: true, message: `请选择${item.title}`, trigger: 'change' }].concat(item.rules):item.required?[{required:true,message:`请选择${item.title}`,trigger:'change'}]:[]"
            >
              <el-date-picker
                v-model="scope.row[item.key]"
                style="width:100%;"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  name: "add_table",
  props: ["items", "data", "disabled"],
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  computed: {},
  methods: {
    selectChange(key, val, row) {
      this.$emit(`change-${key}`, val, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAdd() {
      this.tableData.push({ id: Math.floor(Math.random() * 100000) });
      console.log(this.tableData);
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
      console.log(this.tableData);
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
          reject();
        }
      });
    }
  },
  mounted() {
    this.tableData = this.data ? [].concat(this.data) : [];
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