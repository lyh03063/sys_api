<template>
  <div class>
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
      async handler(newVal, oldVal) {
        let type = this.$route.query.type;
        this.ready = false;
        this.cfList = util.deepCopy(PUB.listCF[`list_${type}`]);
        await this.$nextTick(); //延迟到视图更新
        this.ready = true;
      },
      immediate: true,
      deep: true
    }
  },
 
  created() {}
};
</script>


<style>
</style>
