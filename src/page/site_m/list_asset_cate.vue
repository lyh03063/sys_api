<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <page_h5_zhihuigeng class :title="title">
      <!-- PSF T5 R5 -->
      <div class="PT10 PR15 TAR " style="z-index:999">
        <van-button plain type="primary" :url="linkAdd" size="small">添加资产</van-button>
      </div>

      <list_data_zhihuigeng class :cf="cfList" v-if="ready"></list_data_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>
<script>



export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_page_list],
  data() {
    return {
      title: "我的资产",
      cfList: {
        com_card: "card_asset_cate",
        ajax: {//ajax配置
          url: `/resource/merchant_resource_list`, params: { },
        },
        cf_list_flex: {
          col: 2,
          style_g: { width: '48%', 'margin-bottom': 0 },//固定两列，不自动响应
        },
        list: [
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
  computed: {
    linkAdd() {//注意是computed属性返回一个函数
      return `${this.hashBase}asset_add_modify?pre_page=${this.pageUrlEncode}`
    },
  },
  methods: {




  },
  async created() {
    window.document.title = `我的资产`
    this.ready = true;
  }
};
</script>


<style scoped>
</style>
