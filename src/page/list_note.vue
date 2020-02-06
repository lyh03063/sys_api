<template>
  <div class>
    <dm_list_data ref="listData" :cf="cfList" @after-search="afterSearch">
      <template v-slot:slot_column_familiarity="{row}">
        <div class>
          <familiarity_select v-model="row.familiarityDoc" :data="row" data-type="note"></familiarity_select>
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
   components: {
    familiarity_select: () =>
      import("@/components/common/familiarity_select.vue"),
    score_panel: () => import("@/components/common/score_panel.vue")
  },
  data() {
    return {
      cfList: util.deepCopy(PUB.listCF.list_note)
    };
  },
  computed: {
    arrLookup: function() {
      return this.$store.state.arrLookup["list_note"]||[];
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
      // immediate: true,
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

    //笔记的相关demo网址
    let note_linkList = {
      ...D_ITEMS.note_linkList,
      type: "select_list_data",
      cfSelectList: {
        //选择列表配置
        dataName: "网址",
        valueKey: "_id",
        labelKey: "title",
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: {
          _id: 1,
          title: 1,
          link: 1
        },
        // pageName: "tangball_member",
        cfList: util.deepCopy(PUB.listCF.list_url)
      }
    };

    this.cfList.formItems.push(note_linkList);

    //笔记的相关demo网址
    let note_noteList = {
      ...D_ITEMS.note_noteList,
      type: "select_list_data",
      cfSelectList: {
        //选择列表配置
        dataName: "网址",
        valueKey: "_id",
        labelKey: "title",
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: {
          _id: 1,
          title: 1
        },
        cfList: util.deepCopy(PUB.listCF.list_note)
      }
    };
    this.cfList.formItems.push(note_noteList);
  }
};
</script>


<style >
</style>
