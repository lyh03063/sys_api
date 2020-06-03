<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <page_h5_zhihuigeng class :title="title">
      <ul class="PL15 PR15 PT1">
        <li class="n-flex-group" @click="goPage_bluetooth" style="margin-bottom:-5px">
          <div class="item-box MT10">
            <div class="icon-box W60 H60 MR12 n-img-box">
              <img
                src="https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/E7EAAF85FD08310FF1C0FA0D147B1C04"
                alt
              />
            </div>
            <span class="FX1">
              <p class="FS16 MB10 MT4 DPF">
                <span class="MR8 C_666">蓝牙设备</span>
              </p>
            </span>
          </div>
        </li>
      </ul>
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
      title: "我的设备",
      cfList: {
        com_card: "card_device_cate",
        ajax: {//ajax配置
          url: `/device/device_category_list`, params: { "page_index": 1, "page_size": 10 },
        },
        cf_list_flex: { col: 1 },
        list: [
          { id: 1, device_type_name: "大气压1", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 2, device_type_name: "大气压2", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 3, device_type_name: "开关", device_type: 2, device_online: 1, device_offline: 4, device_fault: 5, },
        ],
      },
    };
  },

  methods: {
    //函数：{跳转小程序蓝牙设备页函数}
    goPage_bluetooth() {
      $.cachedScript("//res.wx.qq.com/open/js/jweixin-1.3.2.js")
        .done(() => {
          wx.miniProgram.navigateTo({ url: '/pages/bluetooth/bluetooth' })
          wx.miniProgram.switchTab({ url: '/pages/bluetooth/bluetooth' })
        })


    },


  },
  async created() {
    window.document.title = this.title
    this.ready = true;


  }
};
</script>


<style scoped>
.item-box {
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding: 12px 12px;
}
</style>
