<template>
  <div class="main" style="padding:10px">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="arrLookup" text="arrLookup" />
      <dm_debug_item v-model="arrSelect2" text="arrSelect2" />
      <dm_debug_item v-model="cfAddDialogEntity" text="添加实体数据配置" />
    </dm_debug_list>

    <!-- <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form> -->
    <!--独立的查询表单-->
    <div class="n-boder-box PT18 PL10 PR10 MB10" v-if="cfFormSearch.formItems.length">
      <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form>
    </div>

    <!--数据列表-->
    <dm_list_data
      ref="listData"
      :cf="cfList"
      v-if="ready"
      @single-btn-click="singleEvent"
      @bacth-btn-click="bacthEvent"
      @after-search="afterSearch"
      @list-event-in="handleListEventIn"
    >
      <!--分数列插槽-->
      <template v-slot:slot_column_score="{row}">{{$lodash.get(dictScore, `${row._idRel2}.score`)}}</template>
      <!--自定义详情弹窗插槽-->
      <template v-slot:customDetail="{detailData}">
        <detail_data :propDataId="detailData._idRel2"></detail_data>
      </template>

      <!--分组数据选择列表按钮插槽-->
      <template v-slot:slot_btn_select>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelect2"
          :cf="cfSelectList2"
          @select="afterSelect"
          v-if="$power('groupDataList.all.modify')"
        ></dm_select_list_data>
      </template>
    </dm_list_data>
    <!-- 编辑实体数据弹窗 -->
    <dm_dialog_edit :cf="cfEditDialogEntity" @after-modify="$refs.listData.getDataList()"></dm_dialog_edit>
    <!-- 新增实体数据弹窗 -->
    <dm_dialog_add :cf="cfAddDialogEntity" @after-add="afterAddEntity" v-if="readyAddDialogEntity"></dm_dialog_add>
  </div>
</template>

<script>
// let cfSelectList = ;

export default {
  name:"detail_group_common",
  components: {
    detail_data: () => import("@/page/detail_data.vue") //数据详情页组件
  },
  mixins: [MIX.base, MIX.listGroupData],
  props: {},

  data() {
    return {

    };
  },
  methods: {

  },
  async created() {

  

    //关系表补充公共参数
    Object.assign(PUB.listCF.list_relation.paramAddonPublic, PUB._paramAjaxAddon);//合并对象
   Object.assign(this.cfList.objParamAddon, PUB._paramAjaxAddon);//合并对象




    // PUB._paramAjaxAddon = {
    //   _systemId: "sys_longting"
    // }


  }
};
</script>


<style scoped>
</style>
