<template>
  <div class="HP100" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
      <dm_debug_item v-model="pre_page" />
    </dm_debug_list>

    <page_h5_zhihuigeng class :title="title">
      <div class="PT10 PR15 TAR">
        <van-button plain type="primary" :url="linkAdd" size="small">添加资产</van-button>
      </div>
      <list_data_zhihuigeng class :cf="cfList" @single-action="singleAction"></list_data_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_page_list],
  data() {
    return {
      title: "",
      type_id: null,
      cfList: {
        com_card: "card_asset",

        ajax: {//ajax配置
          url: `/resource/merchant_resource_detail_list`, params: { "page_index": 1, "page_size": 10 },
        },
        cf_list_flex: { col: 1 },
        list: [
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

        ],
        actions: [
          { action: "modify", name: '修改资产' },
          { action: "delete", name: '删除资产', },
        ]
      },
    };
  },
  computed: {
    linkAdd() {//注意是computed属性返回一个函数
      return `${this.hashBase}asset_add_modify?resource_type_id=${this.type_id}&pre_page=${this.pageUrlEncode}`
    },
  },
  methods: {


    async singleAction({ action, doc, vm_list }) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showAction = false;
      if (action == "modify") {//Q1:修改
        let path = `asset_add_modify?resource_id=${doc.id}&pre_page=${this.pageUrlEncode}`;
        this.$router.push({ path });//跳转登录页
      } else if (action == "detail") { //Q2:查看详情
        alert(`查看详情`);
      } else if (action == "delete") { //Q3:删除
        let clickStatus = await this.$dialog.alert({
          title: '确认', message: '确认删除该资产？',
        })
        if (clickStatus != "confirm") return
        let param = { resource_ids: doc.id }
        let data = await this.$ajax({ url: `/resource/del_resource`, data: param });
        this.$toast('删除成功');
        vm_list.ajaxGetList()//子组件请求数据
      }

    },

  },
  async created() {
    let { type_id, resource_type_name } = this.$route.query;
    this.type_id = type_id;
    this.title = resource_type_name;//修改标题
    window.document.title = `${this.title}-我的资产`
    Object.assign(this.cfList.ajax.params, { resource_type: type_id });//合并对象-ajax参数
   
  }
};
</script>
<style scoped>
</style>
