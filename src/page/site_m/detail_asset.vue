<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <div class="n-m-main-box BC_f0f0f0">
      <van-nav-bar :title="doc.title" left-text left-arrow @click-left="onClickLeft" />
      <com_block class height="200">实时视频</com_block>

      <van-tabs v-model="active" color="#3a0">
        <van-tab title="概况"></van-tab>
        <van-tab title="环境">
          <list_data_zhihuigeng class :cf="cfList"></list_data_zhihuigeng>
        </van-tab>
        <van-tab title="控制">xxxx3</van-tab>
        <van-tab title="视频">xxxx4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.page_list_zhihuigeng],
  data() {
    return {
      active: 1,
      doc: {
        title: "紫金果园",

      },
      cfList: {
        cfVanList: {
          style: { padding: 0 }
        },
        com_card: "card_asset_environment",
        cf_list_flex: { col: 1 },
        listTest: [
          { id: 1, equipment_name: "大气压1", equipment_type: 1, state: 0, value: "0.5" },
          { id: 2, equipment_name: "大气压2", equipment_type: 1, state: 1, value: "0.5" },
          { id: 3, equipment_name: "开关", equipment_type: 2, state: 2, value: "0.5", is_open: true },
        ],
      },
    };
  },
  methods: {
    onClickLeft() {
      alert(`onClickLeft`);
    },
  },
  async created() {
  }
};
</script>
<style scoped>
</style>
