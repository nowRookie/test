<template>
  <div class="treeSelect" @mouseover="mouseover" @mouseout="mouseout">
    <el-input readonly :placeholder="placeholder||'请选择'" :value="curChecked.label">
      <a slot="suffix" v-show="curChecked.id" class="mt12 el-icon-circle-close" @click="clearAll"></a>
    </el-input>
    <div class="minw100 tree">
      <el-tree
        :default-checked-keys="defaultChecked"
        v-show="visibleTree"
        ref="treeRef"
        :props="props"
        node-key="id"
        accordion
        :data="treeData"
        show-checkbox
        check-strictly
        @check-change="handleCheckChange"
      ></el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      visibleTree: false,
      props: {
        label: "label",
        children: "children",
      },
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      timer: null,
      defaultChecked: [],
      curChecked: {
        label: "",
        id: "",
      },
    };
  },
  methods: {
    clearAll() {
      this.curChecked = {};
      this.resetTree();
    },
    mouseover() {
      if (this.curChecked.id) {
        this.defaultChecked = [this.curChecked.id];
      }
      this.visibleTree = true;
      clearTimeout(this.timer);
    },
    mouseout() {
      this.timer = setTimeout(() => {
        this.visibleTree = false;
        this.resetTree();
      }, 400);
    },
    resetTree() {
      this.$refs.treeRef.setCheckedKeys([]);
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
      if (checked) {
        this.curChecked = {
          ...data,
        };
        this.$refs.treeRef.setCheckedKeys([data.id]);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.treeSelect {
  position: relative;
  .tree {
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 5;
  }
}
.minw100 {
  min-width: 100%;
}
</style>