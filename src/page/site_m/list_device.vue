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
      title: "大气压",
      cfList: {
        com_card: "card_device",
        cf_list_flex: { col: 2 },
        listTest111: [],
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
