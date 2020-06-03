<template>
  <div class>
    <van-tabbar v-model="active" @change="onChange" active-color="#3ACC80" inactive-color="#000">
      <van-tabbar-item icon="home-o" name="home">首页</van-tabbar-item>
      <van-tabbar-item icon="contact" name="user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    cf: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {
    return {
      active: null,

    }

  },
  computed: {


  },
  methods: {
    onChange(index) {
      if (index == "home") {//Q1:首页
        this.$router.replace({ path: `../home` });//跳转到来源页

      } else if (index == "user") { //Q2:我的
        this.$router.replace({ path: `./user/index` });//跳转到来源页
      }


    },
  },
  created() {
    let { fullPath, path } = this.$route
    if (fullPath.includes(`/zhihuigeng/home`)) {//Q1:首页
      this.active = "home";

    } else if (fullPath.includes(`/zhihuigeng/user`)) { //Q2:我的
      this.active = "user";
    }


  },
  mounted() {

  }
};
</script>

<style scoped>
</style>