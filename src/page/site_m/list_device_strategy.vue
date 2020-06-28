<template>
  <div class="HP100" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>

    <page_h5_zhihuigeng class :title="title">
      <div class="PT10 PR15 TAR">
        <van-button plain type="primary" :url="linkAdd" size="small">添加策略</van-button>
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
      title: "策略",
      cfList: {
        com_card: "card_device_strategy",
        ajax: {//ajax配置
          url: `/strategy/queryList`, params: {},
        },
        cf_list_flex: { col: 1 },
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
        actions: [
          { action: "modify", name: '修改策略', },
          { action: "delete", name: '删除策略', },
        ],

      },



    };
  },
  computed: {
    linkAdd() {//注意是computed属性返回一个函数
      return `${this.hashBase}strategy_add_modify?resource_id=${this.resource_id}&equipment_id=${this.equipment_id}&pre_page=${this.pageUrlEncode}`
    },

  },
  methods: {

    //函数：{列表单项操作的处理函数}
    async singleAction({ action, doc, vm_list }) {
      if (action == "modify") {//Q1:修改

        let path = `strategy_add_modify?resource_id=${this.resource_id}&equipment_id=${this.equipment_id}&strategy_id=${doc.id}&pre_page=${this.pageUrlEncode}`;
        this.$router.push({ path });//跳转
        // this.$router.push({ path });//跳转页

      } else if (action == "detail") { //Q2:查看详情
        alert(`查看详情`);
      } else if (action == "delete") { //Q3:删除
        let clickStatus = await this.$dialog.confirm({
          title: '确认', message: '确认删除该策略？',
        }).catch(() => { })
        if (clickStatus != "confirm") return
        let param = { strategy_id: doc.id }
        let { data } = await this.$ajaxBase({ url: `/strategy/delStrategy`, data: param });
        if (data.code == 0) {//Q1:操作成功
            let { uuid } = data.data;
            let dataRS = await this.rollQuery(uuid, 0)//调用：{轮询指令设置结果函数}
            if (dataRS.code === 0) {//如果调用成功
              let text2 = '操作成功'
              this.$toast(`${doc.equipment_name}${text2}`);//
              this.onClickLeft()//返回上一页
            } else if (dataRS.code === 100001) {
              this.$toast('操作失败，超时');
            } else {
              this.$toast(`操作失败:${dataRS.msg}`);
            }
        } else { //Q2:异常
          this.$toast(data.msg);
        }
      } 

    },

  },
  async created() {
    let { equipment_id, resource_id } = this.$route.query;//网关设备ID
    this.resource_id = resource_id//资源id
    this.equipment_id = equipment_id
    Object.assign(this.cfList.ajax.params, { equipment_id });//合并对象-ajax参数
  }
};
</script>


<style scoped>
</style>
