<template>
  <div class="newNote">
    <container-input
      ref="containerInputRef"
      :items="inputItems"
      content
      :span="24"
      @ok="inputSearch"
    >
    </container-input>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";

import { getOptions } from "@/utils/utils";

import containerInput from "@/components/container_input_form";

export default {
  name: "newNote",
  components: { containerInput },
  data() {
    return {
      inputItems: [
        {
          key: "",
          title: "标题",
        },
      ],
    };
  },
  methods: {
    inputSearch() {},
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>