<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="formData" />
    </dm_debug_list>
    <page_h5_zhihuigeng :title="title">
      <dm_space height="15"></dm_space>
      <div class="PL30 PR30">
        <van-cell-group>
          <van-field
            v-model="formData.equipment_code"
            label
            placeholder="请输入设备编号或扫码获取"
            error-message
            clearable
            size="large"
          >
            <template #button>
              <van-icon class="MT3" name="scan" @click="scanQRCode" size="20px" />
            </template>
          </van-field>
        </van-cell-group>
        <dm_space height="35"></dm_space>

        <van-button class="MT10 MB10" type="primary" block round @click="submit">绑定</van-button>
        <dm_space height="15"></dm_space>
      </div>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>





export default {
  name: "asset_bind_device",
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {

    return {


      formData: {
        "resource_id": 1,
        "equipment_code": "304A2659AB1800A0"
      },
      urlFrom: null,//登录前的来源地址
    };
  },
  methods: {
    //函数：{调起微信扫一扫函数}
    scanQRCode() {
      if (!window.wx) return alert(`scanQRCode功能不存在`);
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: (res) => {
          alert(`扫描结果：${res.resultStr}`);
          this.formData.equipment_code = `${res.resultStr || "xxx"}`

        }
      });
    },
    async submit() {
      let { resource_id, equipment_code } = this.formData
      if (!resource_id) return this.$toast('缺少资产ID！');
      if (!equipment_code) return this.$toast('名称必填！');
      let data = await this.$ajax({ url: `/resource/bind_equipment`, data: this.formData });
      if (data === false) return;
      this.$toast('绑定成功');
      this.$router.back()

    },





  },
  async created() {
    let { resource_id, } = this.$route.query;
    this.formData.resource_id = resource_id;
    this.title = "绑定设备";//修改标题
    window.document.title = this.title

    util.setWXJSSDK()//调用：{设置微信JS-SDK函数}


  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>
