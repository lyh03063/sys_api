<template>
  <div class="out" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="formData" />
    </dm_debug_list>

    <page_h5_zhihuigeng :title="title">
      <dm_space height="65"></dm_space>
      <div class="PL30 PR30">
        <van-cell-group>
          <van-field
            v-model="formData.reg_id"
            left-icon="user-o"
            label
            placeholder="请输入手机号"
            error-message
            clearable
            size="large"
          >
            <template #left-icon>
              <div class="icon-box W30 H30 MR20">
                <i class="icon-zhg icon_phone" style="transform: scale(0.6);"></i>
              </div>
            </template>
          </van-field>
          <van-field v-model="formData.token" label placeholder="请输入验证码" error-message>
            <template #left-icon>
              <div class="icon-box W30 H30 MR20">
                <i class="icon-zhg icon_vCode" style="transform: scale(0.6);"></i>
              </div>
            </template>
            <template #button>
              <m_btn_send_vcode :cf="cfBtnSendVcode" v-model="formData.reg_id"></m_btn_send_vcode>
            </template>
          </van-field>
          <van-field
            v-model="formData.ext_token"
            left-icon="records"
            label
            type="password"
            placeholder="请输入密码"
            error-message
          >
            <template #left-icon>
              <div class="icon-box W30 H30 MR20">
                <i class="icon-zhg icon_password" style="transform: scale(0.6);"></i>
              </div>
            </template>
          </van-field>
        </van-cell-group>
        <dm_space height="35"></dm_space>
        <van-button class="MT10 MB10" type="primary" block round @click="goRegister">注册</van-button>
        <dm_space height="15"></dm_space>
        <!-- <van-button type="default" block round @click="autoLogin">自动登录测试</van-button> -->
        <!--通知栏-->
        <van-notify id="van-notify" />
      </div>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>





export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {

    return {
      title: "注册",
      formData: {
        "reg_type": 0,//注册类型， 目前只支持手机号，后续考虑微信，QQ等
        token: "",
        reg_id: "13691916429", //手机的验证码或是微信的token,用于后台验证
        ext_token: "888888",
      },
      cfBtnSendVcode: {
        time111:30000
      }
    };
  },
  methods: {
    async goRegister() {
      let { reg_id, ext_token, reg_type, token } = this.formData
      ext_token = md5(ext_token)//密码进行md5加密
      //请求接口
      let data = await this.$ajaxBase({ url: `/user/user_reg`, data: { reg_id, ext_token, reg_type, token } });
      let { code, msg } = data.data;
      if (code != 0) {//如果失败
        return this.$toast(msg);
      }
      this.$toast(`注册成功`);
      this.goLogin({ phone_num: this.formData.reg_id, password: this.formData.ext_token, })//自动登录

    },
    //函数：{自动登录函数}
    autoLogin: async function () {
      this.goLogin({ phone_num: this.formData.reg_id, password: this.formData.ext_token, })//自动登录

    },
  },
  async created() {
    window.document.title = this.title
  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}


</style>
