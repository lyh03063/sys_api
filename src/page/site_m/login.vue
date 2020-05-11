<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="ready" />
    </dm_debug_list>

    <div class="layoutWidth mobile-main-box">
      <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft" />
      <dm_space height="15"></dm_space>

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
      </div>
    </div>
  </div>
</template>

<script>
// PUB.domain=
const HOST_ONLINE = "https://zhy.club/zhy";
// const HOST_ONLINE = "http://47.107.49.84:8088/zhy";
export default {
  data() {
    return {
      title: "登录",
      ready: true,
      formData: {
        phone_num: "13677778888", password: ""
      },



    };
  },
  methods: {
    onClickLeft() {
      alert(`onClickLeft`);

    },
    async goLogin() {
      console.log(`this.formData:`, this.formData);
      let { data } = await axios({//请求接口
        method: "post",
        url: `${HOST_ONLINE}//user/login`,
        data: this.formData
      });
      console.log(`data:`, data);



    },





  },
  async created() {

  }
};
</script>


<style scoped>
.mobile-main-box {
  background-color: #fff;
}

.layoutWidth {
  min-width: 360px;
  max-width: 640px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.item-box {
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding: 20px 25px;
}
</style>
