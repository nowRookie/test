<template>
  <div class="newNote">
    <container-input
      ref="containerInputRef"
      :items="inputItems"
      content
      :span="24"
      label-width="80px"
      @ok="inputSearch"
    >
      <template v-slot:tips>
        <div class="el-form-item">
          <div class="el-form-item__label" style="width: 80px">标签</div>
          <div class="el-form-item__content">
            <div v-for="(unit, index) in tipsList" :key="index" class="tips">
              {{ unit.name }}
            </div>
          </div>
        </div>
      </template>
      <template v-slot:markdown>
        <div class="el-form-item">
          <div class="el-form-item__label" style="width: 80px">内容</div>
          <div class="el-form-item__content">
            <div class="row textarea">
              <el-input
                type="textarea"
                :value="markdown"
                @input="renderMarkdown"
                class="w50 mr10"
              ></el-input>
              <div v-html="markdownHTML" class="p10 w50 border markdown-body"></div>
            </div>
          </div>
        </div>
      </template>
    </container-input>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import marked from "marked";
import "github-markdown-css";

import { getOptions } from "@/utils/utils";

import containerInput from "@/components/container_input_form";

export default {
  name: "newNote",
  components: { containerInput },
  data() {
    return {
      markdown: "",
      markdownHTML: "",
      tipsList: [
        {
          key: "1",
          name: "细嫩",
        },
      ],
      inputItems: [
        {
          key: "title",
          title: "标题",
        },
        {
          key: "tips",
          title: "标签",
          type: "slot",
        },
        {
          key: "summarize",
          title: "概述",
          type: "textarea",
        },
        {
          key: "markdown",
          title: "内容",
          type: "slot",
        },
      ],
    };
  },
  methods: {
    renderMarkdown(val) {
      this.markdown = val;
      let html = marked(val);
      this.markdownHTML = html;
    },
    inputSearch() {},
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.textarea /deep/textarea {
  min-height: 400px !important;
}
</style>