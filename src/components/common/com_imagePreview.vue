



<template>
  <div class>
    <img :src="src" alt style="max-width:80px;max-height:60px;" @click="fnClick" />
  </div>
</template>

<script>
export default {
  name: "com_imagePreview",
  //用于列表模糊查询的组件
  props: ["doc"],
  data() {
    return {};
  },
  computed: {
    src() {
      let url = lodash.get(this.doc, `file[0].url`, "");
      return url
    }
  },
  methods: {
    fnClick() {
    }
  }
};
</script>
