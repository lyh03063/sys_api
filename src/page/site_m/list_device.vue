<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>

    <page_h5_zhihuigeng class :title="title">
      <list_data_zhihuigeng class :cf="cfList" v-if="ready"></list_data_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>
<script>



export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_page_list],
  data() {
    return {
      ready: false,
      title: "xxx",
      cfList: {
        com_card: "card_device",//卡片组件
        ajax: {//ajax配置
          url: `/device/device_list`, params: { "page_index": 1, "page_size": 10 },
        },
        cf_list_flex: {
          col: 2, style_g: { width: '48%', 'margin-bottom': 0 },//固定两列，不自动响应
        },
        listTest111: [],
        list: [
          { id: 1, equipment_name: "大气压1", equipment_type: 1, state: 0, value: "0.5" },
          { id: 2, equipment_name: "大气压2", equipment_type: 1, state: 1, value: "0.5" },
          { id: 3, equipment_name: "开关", equipment_type: 2, state: 2, value: "0.5", is_open: true },
        ],
      },
    };
  },

  methods: {



  },
  async created() {
    let { device_type, device_type_name } = this.$route.query;
    this.title = device_type_name;//修改标题
    window.document.title = `${this.title}-我的设备-智慧耕`
    Object.assign(this.cfList.ajax.params,{ device_type });//合并对象-ajax参数
    this.ready = true;
  }, mounted() {

  }
};
</script>


<style scoped>
</style>
