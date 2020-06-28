<template>
  <div class="HP100" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="cfList" />
    </dm_debug_list>
    <page_h5_zhihuigeng class :title="title">
      <ul class="PL15 PR15 PT1" style="margin-bottom:-5px">
        <li class="n-flex-group" @click="goPage_bluetooth">
          <div class="item-box MT10">
            <div class="icon-box W50 H50 MR12 n-img-box Circle OFH">
              <img
                src="https://ranktop-agriculture.oss-cn-shenzhen.aliyuncs.com/1591351467441.png"
                alt
                @error="imgError"
              />
            </div>
            <span class="FX1">
              <p class="FS16 MB10 MT4 DPF">
                <span class="MR8 C_000">蓝牙设备(传递用户信息)</span>
              </p>
            </span>
          </div>
        </li>

         <li class="n-flex-group" @click="goPage_bluetoothOld">
          <div class="item-box MT10">
            <div class="icon-box W50 H50 MR12 n-img-box Circle OFH">
              <img
                src="https://ranktop-agriculture.oss-cn-shenzhen.aliyuncs.com/1591351467441.png"
                alt
                @error="imgError"
              />
            </div>
            <span class="FX1">
              <p class="FS16 MB10 MT4 DPF">
                <span class="MR8 C_000">蓝牙设备(直接跳转)</span>
              </p>
            </span>
          </div>
        </li>
       
      </ul>
      <list_data_zhihuigeng class :cf="cfList"></list_data_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>
<script>

export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_page_list],
  data() {
    return {
      title: "我的设备",
      cfList: {
        com_card: "card_device_cate",
        ajax: {//ajax配置
          url: `/device/device_category_list`, params: { "page_index": 1, "page_size": 10 },
        },
        cf_list_flex: { col: 1 },
        //无数据配置-不显示
        cfNoData: {
          text: "", iconType: "no",
        },
        list: [
          { id: 1, device_type_name: "大气压1", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 2, device_type_name: "大气压2", device_type: 1, device_online: 1, device_offline: 4, device_fault: 5, },
          { id: 3, device_type_name: "开关", device_type: 2, device_online: 1, device_offline: 4, device_fault: 5, },
        ],
      },
    };
  },
  computed: {
    
  },

  methods: {
    //函数：{跳转小程序蓝牙设备页函数}
    async goPage_bluetooth() {
   
      wx.miniProgram.postMessage({ data: { action: "bluetoothDebug",userInfo:this.userInfo } })
      wx.miniProgram.navigateBack({ delta: 0 })//要先执行这个操作才能触发postMessage

      // wx.miniProgram.navigateTo({ url: '/pages/bluetooth/bluetooth' })
      // wx.miniProgram.switchTab({ url: '/pages/bluetooth/bluetooth' })
    },
    
 //函数：{跳转小程序蓝牙设备页函数}
    async goPage_bluetoothOld() {
   
    

      wx.miniProgram.navigateTo({ url: '/pages/bluetooth/bluetooth' })
      wx.miniProgram.switchTab({ url: '/pages/bluetooth/bluetooth' })
    },
  },
  async created() {
    window.document.title = this.title


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
