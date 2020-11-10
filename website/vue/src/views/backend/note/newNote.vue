<template>
  <div class="newNote">
    <container-input
      ref="containerInputRef"
      :items="inputItems"
      content
      :span="24"
      label-width="80px"
    >
      <!-- <template v-slot:tips>
        <div class="el-form-item row">
          <div class="el-form-item__label" style="width: 80px">分类</div>
          <div class="el-form-item__content">
            <treeSelect></treeSelect>
          </div>
        </div>
      </template> -->
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
              <div
                v-html="markdownHTML"
                class="p10 w50 border markdown-body"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </container-input>
    <div><el-button @click="submitForm">提交</el-button></div>
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
import treeSelect from "@/components/treeSelect";

export default {
  name: "newNote",
  components: { containerInput, treeSelect },
  data() {
    return {
      markdown: "",
      markdownHTML: "",
      // curtips: [],
      // cacheTipsList: [
      //   {
      //     key: "1",
      //     name: "细嫩",
      //   },
      // ],
      inputItems: [
        {
          key: "title",
          title: "标题",
        },
        // {
        //   key: "tips",
        //   title: "标签",
        //   type: "slot",
        // },
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
    submitForm() {
      this.$refs.containerInputRef
        .getData()
        .then((data) => {
          const options = getOptions({
            url: "/backend/note",
            method: "post",
            data: {
              ...data,
              // tips: this.curtips,
              classifyId: this.$route.query.classifyId,
              content: this.markdown,
              html: this.markdownHTML,
            },
          });
          axios(options)
            .then((res) => {
              this.$router.push({
                path: "/backend/noteList" + "/" + this.$route.query.classifyId,
                query: {},
              });
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.textarea /deep/textarea {
  height: 500px !important;
}
.markdown-body {
  height: 500px;
  overflow-y: auto;
}
</style>