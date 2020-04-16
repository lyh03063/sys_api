<template>
  <div class>
    <!--数据列表-->
    <dm_list_data :cf="cfList" v-if="ready"></dm_list_data>
  </div>
</template>
<script>



export default {
  components: {},

  data() {
    return {
      ready: false,
      cfList: util.deepCopy(PUB.listCF.list_html_api_category)
    };
  },

  watch: {
    "$route.query.type": {
      async handler(newUrl, oldUrl) {
        if (newUrl != oldUrl) {
          let type = this.$route.query.type;
          this.ready = false;
          this.cfList = util.deepCopy(PUB.listCF[`list_${type}`]);
          FN.listCFaddItemSystemId(this.cfList)//调用：{补充_systemId列表字段配置函数}
          await this.$nextTick(); //延迟到视图更新
          this.ready = true;
        }


      },
      immediate: true,
      deep: true
    }
  },


  created() {





  }, mounted() {

  }
};
</script>


<style>
</style>
