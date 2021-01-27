<template>
  <div class="newNote">
    <container-input
      ref="containerInputRef"
      :items="inputItems"
      content
      :span="24"
      label-width="80px"
    >
      <template v-slot:tips>
        <div class="el-form-item">
          <div class="el-form-item__label" style="width: 80px">标签</div>
          <div class="el-form-item__content">
            <div
              v-for="(unit, index) in cacheTipsList"
              :key="index"
              class="tips"
            >
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
                class="w50 mr10 markdown-edit"
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

import { getOptions, throttle } from "@/utils/utils";

export default {
  name: "newNote",
  data() {
    return {
      markdown: "",
      markdownHTML: "",
      curtips: [],
      cacheTipsList: [
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
    submitForm() {
      this.$refs.containerInputRef
        .getData()
        .then((data) => {
          const options = getOptions({
            url: "/api/note",
            method: "put",
            data: {
              ...data,
              tips: this.curtips,
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
    getDetail() {
      const options = getOptions({
        url: "/backend/note",
        method: "get",
        params: {
          _id: this.$route.query.id,
        },
      });
      axios(options)
        .then((res) => {
          let data = res.data.data || {};
          let content = data.content || "";
          let html = data.html || "";
          this.markdown = content;
          this.markdownHTML = html;

          this.$refs.containerInputRef.formData = data;
        })
        .catch((err) => {
          this.$message({ type: "error", message: err || "请求错误" });
        });
    },
    syncScroll() {
      $(".markdown-edit textarea").on("scroll", function () {
        let scrollTop = $(this).scrollTop();
        $(".markdown-body").scrollTop(scrollTop);
      });
    },
  },
  mounted() {
    this.getDetail();
    this.syncScroll();
  },
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