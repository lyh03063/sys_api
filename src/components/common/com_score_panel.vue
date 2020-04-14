



<template>
  <div class="DPIB">
    <!-- <div class="" >data:{{data}}</div> -->
    <!-- <div class="" >arrLookupScore:{{arrLookupScore}}</div> -->
    <score_panel
      ref="scorePanel"
      v-if="data"
      :param="data.objParam"
      idKey="_idRel2"
      listIndex="detail_group_note"
      data-type="note"
      :arrLookup="arrLookupScore"
      @switch="filterData"
    >
      <!-- 计分板组件 -->
    </score_panel>
  </div>
</template>

<script>
export default {
  name: "com_score_panel",
  components: {
    score_panel: () => import("@/components/common/score_panel.vue"),

  },
  //用于列表模糊查询的组件
  props: ["data"],
  data() {
    return {
      arrLookupScore: null //计分板需要联合查询配置数组-

    };
  },

  methods: {
    //函数：{设置ArrLookupScore函数}-供外部调用
    setArrLookupScore(arrLookupScore) {
      this.arrLookupScore = arrLookupScore
    },
    //函数：{过滤数据函数}
    async filterData() {
      // this.$emit("searchList");
      this.$emit("list-event-in", { eventType: "filterDataByFamiliarity" });


    },
  }
};
</script>
