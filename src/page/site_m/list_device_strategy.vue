<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <div class="n-m-main-box BC_f0f0f0">
      <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft" />
      <list_data_zhihuigeng class :cf="cf"></list_data_zhihuigeng>
    </div>
  </div>
</template>
<script>



export default {
  mixins: [MIX.base, MIX.page_list_zhihuigeng],
  data() {
    return {
      title: "策略",
      cf: {
        com_card: "card_device_strategy",
        cf_list_flex: {col:1},
        listTest111: [],
        listTest: [
          {
            "id": 1,
            "icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "strategy_name": "策略1222"
          },
          {
            "id": 2,
            "icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "strategy_name": "策略2"
          },
          {
            "id": 3,
            "icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "strategy_name": "策略3"
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
