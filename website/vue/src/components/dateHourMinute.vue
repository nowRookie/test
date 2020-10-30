<template>
  <el-form-item :label="label" :prop="prop" :required="required" :rules="rules">
    <!-- 起始日时分 -->
    <div class="row" v-if="multiple">
      <el-date-picker
        :disabled="disabled"
        class="w140"
        placeholder="开始日期"
        v-model="startDate"
        type="date"
        :picker-options="startDateOptions"
      ></el-date-picker>
      <el-select :disabled="disabled" class="ml5 w70" placeholder="时" v-model="startHour">
        <el-option v-for="i in 23" :key="'startHour'+i" :value="i">{{i}}</el-option>
      </el-select>
      <span class="ml5 mr5">时</span>
      <el-select :disabled="disabled" class="w70" placeholder="分" v-model="startMinute">
        <el-option v-for="i in 11" :key="'startMinute'+i" :value="i*5">{{i*5}}</el-option>
      </el-select>
      <span class="ml5">分</span>
      <span class="ml10 mr15">至</span>
      <el-date-picker
        :disabled="disabled"
        class="w140"
        placeholder="结束日期"
        v-model="endDate"
        type="date"
        :picker-options="endDateOptions"
      ></el-date-picker>
      <el-select :disabled="disabled" class="ml5 w70" placeholder="时" v-model="endHour">
        <el-option v-for="i in 23" :key="'endHour'+i" :value="i">{{i}}</el-option>
      </el-select>
      <span class="ml5 mr5">时</span>
      <el-select :disabled="disabled" class="w70" placeholder="分" v-model="endMinute">
        <el-option v-for="i in 11" :key="'endMinute'+i" :value="i*5">{{i*5}}</el-option>
      </el-select>
      <span class="ml5">分</span>
    </div>
    <!-- 单选日时分 -->
    <div v-else>
      <el-date-picker
        :disabled="disabled"
        class="w140"
        placeholder="选择日期"
        v-model="date"
        type="date"
      ></el-date-picker>
      <el-select :disabled="disabled" class="ml5 w70" placeholder="时" v-model="minute">
        <el-option v-for="i in 23" :key="'minute'+i" :value="i">{{i}}</el-option>
      </el-select>
      <span class="ml5 mr5">时</span>
      <el-select :disabled="disabled" class="w70" placeholder="分" v-model="second">
        <el-option v-for="i in 11" :key="'second'+i" :value="i*5">{{i*5}}</el-option>
      </el-select>
      <span class="ml5">分</span>
    </div>
  </el-form-item>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    label: {
      type: String,
      required: true,
    },
    prop: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: Array,
      required: false,
      deault: [],
    },
    multiple: {
      type: Boolean,
      required: false,
      defalut: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    let self = this;
    return {
      date: null,
      minute: null,
      second: null,

      startDate: null,
      startHour: null,
      startMinute: null,
      startDateOptions: {
        disabledDate(date) {
          if (self.endDate !== null) {
            return date.getTime() > self.endDate.getTime();
          } else {
            return false;
          }
        },
      },

      endDate: null,
      endHour: null,
      endMinute: null,
      endDateOptions: {
        disabledDate(date) {
          if (self.startDate !== null) {
            return date.getTime() < self.startDate.getTime();
          } else {
            return false;
          }
        },
      },
    };
  },
  computed: {},
  methods: {
    getData() {
      return this.multiple
        ? {
            startDate: this.startDate,
            startHour: this.startHour,
            startMinute: this.startMinute,
            endDate: this.endDate,
            endHour: this.endHour,
            endMinute: this.endMinute,
          }
        : {
            date: this.date,
            hour: this.hour,
            minute: this.minute,
          };
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.w70 {
  width: 70px;
}
.w140 {
  width: 140px;
}
</style>