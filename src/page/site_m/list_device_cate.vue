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
      title: "我的设备",
      cfList: {
        com_card: "card_device_cate",
        cf_list_flex: { col: 1 },
        listTest111: [],
        listTest: [
          { id: 1, device_type_name: "大气压1", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 2, device_type_name: "大气压2", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 3, device_type_name: "开关", device_type: 2, device_online: 1, device_offline: 4, device_fault: 5, },
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
