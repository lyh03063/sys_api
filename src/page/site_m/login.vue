<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="userInfo" />
      <dm_debug_item v-model="urlFrom" />
    </dm_debug_list>

    <page_h5_zhihuigeng :title="title">
      <dm_space height="65"></dm_space>
      <div class="PL30 PR30">
        <van-cell-group>
          <van-field
            v-model="formData.phone_num"
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
          <van-field
            v-model="formData.password"
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
        <van-button class="MT10 MB10" type="primary" block round @click="goLogin">登录</van-button>
        <dm_space height="15"></dm_space>
        <van-button type="default" block round>注册</van-button>
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
      title: "登录",
      ready: true,
      formData: {
        phone_num: "15011101179",
        password: "1234561",
      },
      urlFrom: null,//登录前的来源地址
    };
  },
  methods: {
    async goLogin() {
      let { phone_num, password } = this.formData
      password = md5(password)//密码进行md5加密
      //请求接口
      let data = await this.$ajax({ url: `/user/login`, data: { phone_num, password } });
      let { code, msg } = data;
      if (code != 0) {//如果登录失败
        return this.$toast(msg);
      }
      let userInfo = data.data;//2级data
      this.userInfo = userInfo;
      if (userInfo) {//将用户信息写入公共变量和本地存储
        util.zhihuigeng.globalData.userInfo = userInfo;
        util.setLocalStorageObj("zhihuigeng_userInfo", userInfo)//调用：{设置一个对象到LocalStorage}
      }
      if (this.urlFrom) {
        this.$router.replace({ path: this.urlFrom });//跳转到来源页
      }
    },
  },
  async created() {
    let { fullPath, code, msg } = this.$route.query;
    this.urlFrom = fullPath;
    if (msg) {
      this.$notify(msg);//警告信息
    }

    $.cachedScript("//qn-static.dmagic.cn/md5.min.js")
      .done(() => {})


  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>
