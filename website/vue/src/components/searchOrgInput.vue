<template>
  <!-- 查询搜索框 -->
  <div class="searchOrgInput">
    <div class="row">
      <div
        class="border mh40px px15 input"
        style="flex: 1"
        @click="triggerFocus"
      >
        <a
          v-for="(unit, index) in personList"
          :key="'sendPeson' + index"
          @click="(e) => clickOne(e, index, unit)"
          :class="
            unit.actived
              ? 'mr10 border px10 py4 border-item white bgblue'
              : 'mr10 border px10 py4 border-item bgf'
          "
        >
          <span class="br pr5">{{ unit.label }}</span>
          <i
            class="ml5 el-icon-close"
            @click="(e) => delOne(e, index.unit)"
          ></i>
        </a>
        <el-select
          ref="selectRef"
          v-show="isFocus"
          class="select noborder"
          v-model="selectVal"
          :multiple="mulSelect"
          filterable
          clearable
          placeholder
          @change="selectChange"
        >
          <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
      </div>
      <el-button plain @click="$emit('select')">...</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { getOptions, dealDate } from "@/utils/utils";

export default {
  name: "",
  props: {
    mulSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {},
  directives: {
    focus: {
      inserted(el, binding, vnode, oldNode) {
        if (binding.value === true) {
          el.focus();
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      selectVal: "",
      // select数据
      optionList: [
        {
          label: "第1项",
          value: 1,
        },
        {
          label: "第2项",
          value: 2,
        },
        {
          label: "第3项",
          value: 3,
        },
      ],
      isFocus: false,
      personList: [
        {
          label: "张",
        },
        {
          label: "王",
        },
      ],
    };
  },
  computed: {},
  methods: {
    remoteMethod() {},
    selectChange(item) {
      console.log(item);
      this.personList.push({
        label: item.label,
        value: item.value,
      });
      this.selectVal = "";
    },
    clickOne(e, index, unit) {
      this.$set(this.personList, index, {
        ...unit,
        actived: !unit.actived,
      });
      e.stopPropagation();
    },
    delOne(e, index, unit) {
      this.personList.splice(index, 1);
      e.stopPropagation();
    },
    triggerFocus() {
      this.isFocus = true;
      setTimeout(() => {
        this.$refs.selectRef.focus();
      }, 100);
    },
  },
  mounted() {
    // 获取自定义门户=>模版设置(简单列表)
    // this.$store
    //   .dispatch("getTemplateSetSimpleList")
    //   .then(({ res, data }) => {
    //     console.log("#######", res, data);
    //     console.log("====", this.$store.state);
    //     this.layoutList = _.map(data, (unit) => {
    //       return {
    //         ...unit,
    //       };
    //     });
    //   })
    //   .catch((err) => {});
  },
};
</script>

<style lang="less" scoped>
.searchOrgInput {
  .input {
  }
}
.noborder {
  /deep/ input {
    border: none;
    height: 40px !important;
  }
  /deep/.el-input__suffix-inner {
    display: none;
  }
}

.bgblue {
  background: #3a95f0;
}
.white {
  color: #fff;
}
.border-item {
  border-radius: 30px;
}
</style>