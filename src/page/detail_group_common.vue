<template>
  <div class="main" style="padding:10px">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="arrLookup" text="arrLookup" />
      <dm_debug_item v-model="arrSelect2" text="arrSelect2" />
    </dm_debug_list>

    <!-- <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form> -->

    <dm_list_data ref="listData" :cf="cfList" v-if="ready" @single-btn-click="singleEvent">
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
        ></dm_select_list_data>
      </template>
    </dm_list_data>
  </div>
</template>

<script>
// let cfSelectList = ;

export default {
  components: {
    detail_data: () => import("@/page/detail_data.vue") //数据详情页组件
  },
  mixins: [MIX.listGroupData],
  props: {},
  
  data() {
    return {};
  },
  methods: {},
  async created() {}
};
</script>


<style scoped>

</style>
