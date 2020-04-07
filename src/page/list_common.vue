<template>
  <div class>
    <dm_list_data :cf="cfList" v-if="ready">

 

    </dm_list_data>
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

  created() {
    // D_ITEMS.relNoteList = {
    //   label: "相关笔记列表",
    //   prop: "relNoteList"
    // };
    // COLUMNS.relNoteList = { ...D_ITEMS.relNoteList, width: 120 };

    // //笔记的相关笔记网址
    // let relNoteList = {
    //   ...D_ITEMS.relNoteList,
    //   type: "select_list_data",
    //   cfSelectList: {
    //     //选择列表配置
    //     dataName: "笔记",
    //     valueKey: "_id",
    //     labelKey: "title",
    //     multiple: true, //多选
    //     //需要保留的集合字段
    //     selectJson: {
    //       _id: 1,
    //       title: 1
    //     },
    //     cfList: util.deepCopy(PUB.listCF.list_note)
    //   }
    // };
    // this.cfList.formItems.push(relNoteList);
  }
};
</script>


<style>
</style>
