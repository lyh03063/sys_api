<template>
  <div class="main" style="padding:10px">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="arrLookup" text="arrLookup" />
      <dm_debug_item v-model="arrSelect2" text="arrSelect2" />
    </dm_debug_list>

    <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form>

    <dm_list_data
      ref="listData"
      :cf="cfList"
      v-if="ready"
      @after-search="afterSearch"
      @single-btn-click="singleEvent"
    >
      <!--自定义详情弹窗插槽-->
      <template v-slot:customDetail="{detailData}">
        <detail_data :propDataId="detailData._idRel2"></detail_data>
      </template>
      <!--熟悉度插槽-->
      <template v-slot:slot_column_familiarity="{row}">
        <div class>
          <familiarity_select
            v-model="row.familiarityDoc"
            :data="row"
            data-type="note"
            idKey="_idRel2"
          ></familiarity_select>
        </div>
      </template>
      <!--分组数据选择列表按钮插槽-->
      <template v-slot:slot_btn_select>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelect2"
          :cf="cfSelectList2"
          @select="afterSelect"
        ></dm_select_list_data>
      </template>
      <!--计分板和筛选按钮插槽-->
      <template v-slot:slot_in_toolbar="{data}">
        <score_panel
          ref="scorePanel"
          v-if="data"
          :param="data.objParam"
          idKey="_idRel2"
          :listIndex="cfList.listIndex"
          data-type="note"
          :arrLookup="arrLookupScore"
          @switch="searchList"
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
    score_panel: () => import("@/components/common/score_panel.vue"),
    detail_data: () => import("@/page/detail_data.vue") //数据详情页组件
    //src\page\detail_data.vue
  },
  mixins: [MIX.listGroupData],
  props: {},
  data() {
    return {};
  },

  methods: {},

   created() {}
};
</script>


<style scoped>

</style>
