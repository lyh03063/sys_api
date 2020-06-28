<template>
  <div class="out" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="userInfo" />
    </dm_debug_list>

    <page_h5_zhihuigeng :title="title">
      <div class="PL15 PR15">
        <dm_space height="15"></dm_space>
        <div class=" user_info" >
          <div class="DP3 W50 H50 OFH n-img-box MR10 Circle">
            <img :src="userInfo.avatar"  @error="headError" />
          
          </div>
          <div class>
            <div class="FM4  FS18 MB3">{{userInfo.phone_num}}</div>
            <div class>{{userInfo.nick_name}}</div>
          </div>

        </div>
        <!-- <div class="MT10">导航1</div>
        <div  class="MT10">导航2</div> -->
        <div class="MT30">
          <van-button class="MT10 MB10" type="primary" block round to="../home" >返回首页</van-button>
        </div>
        <div class="MT10">
          <van-button class="MT10 MB10" type="primary" plain block round @click="logout">退出登录</van-button>
        </div>
      </div>

      <!--底部菜单栏-->
      <tabbar_zhihuigeng></tabbar_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>





export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {

    return {
      title: "我的",
      ready: true,

    };
  },
  methods: {
    //函数：{退出登录函数}
    logout: async function () {
      delete localStorage.zhihuigeng_userInfo
      window.location.reload();//函数调用：{重载页面}
      this.$toast('退出登录成功');

    },
   

  },
  async created() {
    window.document.title = this.title

    if (!localStorage.zhihuigeng_userInfo) {//如果{000}000
      let { fullPath } = this.$route
      //判断登录信息，如果不存在就跳转到登录页
      let prePageInfo = {
        fullPath, msg: "请登录"
      }
      this.$router.replace({ path: '../login', query: { ...prePageInfo } });//跳转登录页
    }



  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}

.user_info{
  align-items: center;
  display: flex;
}
</style>
