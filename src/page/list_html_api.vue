<template>
  <div class>
    <dm_list_data ref="listData" :cf="cfList" @after-search="afterSearch">
      <template v-slot:slot_column_familiarity="{row}">
        <div class>
          <familiarity_select v-model="row.familiarityDoc" :data="row" data-type="html_api"></familiarity_select>
        </div>
      </template>
      <template v-slot:slot_in_toolbar="{data}">
        <score_panel
          ref="scorePanel"
          v-if="data&&data.objParam"
          :param="data.objParam"
          :listIndex="cfList.listIndex"
        >
          <!-- 计分板组件 -->
        </score_panel>
      </template>
    </dm_list_data>
  </div>
</template>
<script>

export default {
  components: {
    familiarity_select: () =>
      import("@/components/common/familiarity_select.vue"),
    score_panel: () => import("@/components/common/score_panel.vue")
  },
  data() {
    return {
      cfList: util.deepCopy(PUB.listCF.list_html_api)
    };
  },
  computed: {
    //用于监听变化
    arrLookup: function() {
      return this.$store.state.arrLookup["list_html_api"];
    }
  },
  watch: {
    arrLookup: {
      async handler(newVal, oldVal) {
        //更新列表的联合查询参数-这句会有问题！！影响到原来的表单查询
        //cf.objParamAddon换成objParam解决！！！！
        this.$refs.listData.objParam.arrLookup = newVal;
        await this.$nextTick(); //延迟到视图更新
        //列表更新
        this.$refs.listData.getDataList();
      },
      deep: true
    }
  },
  methods: {
    afterSearch() {
      this.$refs.scorePanel.ajaxGetScore(); //调用：{ajax获取分数函数}
    }
  },
  created() {
    //补充熟悉度ajax配置（动态数据字典）
    window.setFamiliarityAjaxCF(this.cfList);
  }
};
</script>


<style >
</style>
