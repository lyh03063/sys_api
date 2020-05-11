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
      title: "我的资产",
      cfList: {
        com_card: "card_asset_cate",
        cf_list_flex: { col: 2 },
        listTest111: [],
        listTest: [
          {
            "id": 1,
            "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
            "resource_type_name": "果园"
          },
          {
            "id": 2,
            "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
            "resource_type_name": "菜地"
          },
          {
            "id": 3,
            "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
            "resource_type_name": "养殖场"
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
