<template>
  <div class="out" v-if="readyBase">
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
        <van-button class="MT10 MB10" type="primary" block round @click="goLogin(formData)">登录</van-button>
        <dm_space height="15"></dm_space>
        <van-button type="default" block round to="register">注册</van-button>
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
      formData: {
        phone_num: "",
        password: "",
        // phone_num: "15011101179",
        // password: "1234561",
        // phone_num: "13691916429",
        // password: "888888",
      },
      urlFrom: null,//登录前的来源地址
    };
  },
  methods: {

    //自定义生命周期函数：{准备好基础资源的后续函数}--
    afterReadyBase: async function () {
      window.document.title = this.title
      let { fullPath, code, msg } = this.$route.query;
      this.urlFrom = fullPath;
      if (msg) {
        this.$notify(msg);//警告信息
      }
      this.formData.phone_num = localStorage.zhihuigeng_user || ""

    },

  },
  async created() {








  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>
