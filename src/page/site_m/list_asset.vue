<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <div class="n-m-main-box BC_f0f0f0">
      <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft" />
      <list_data_zhihuigeng class :cf="cfList"></list_data_zhihuigeng>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.page_list_zhihuigeng],
  data() {
    return {
      title: "果园111",
      cfList: {
        com_card: "card_asset",
        cf_list_flex: { col: 1 },
        listTest111: [],
        listTest: [
        {
          "resourceName": "南边农场",
          "typeId": 1,
          "id": 1,
          "state": 0,
          "resourceTypeName": "果园",
          "resourceTypePic": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B"
        },
        {
          "resourceName": "南边农场2",
          "typeId": 1,
          "id": 1,
          "state": 1,
          "resourceTypeName": "果园",
          "resourceTypePic": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B"
        },
        {
          "resourceName": "南边农场3",
          "typeId": 1,
          "id": 1,
          "state": 1,
          "resourceTypeName": "果园",
          "resourceTypePic": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B"
        },
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
