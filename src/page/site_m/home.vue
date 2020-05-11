
<template>
  <div class="main-box2">
    <div class="layoutWidth">

     

      <com_block class="MB20">首页</com_block>
    </div>
  </div>
</template>

<script>



export default {
  components: {
  },

  data() {

    return {
      arrIconOtherBig: [
        { en: "default_avatar", ch: "默认头像", x: "-175px", y: "-735px", w: "130px", h: "130px" },
        { en: "default_picture", ch: "默认图片", x: "-1510px", y: "-840px", w: "160px", h: "160px" },
        { en: "no_record", ch: "暂无记录", x: "-3070px", y: "-621px", w: "200px", h: "140px" },
        { en: "network_failure ", ch: "网络失败", x: "-3351px", y: "-609px", w: "200px", h: "140px" },
        { en: "home_entry ", ch: "首页入口bg", x: "-3070px", y: "-305px", w: "124px", h: "124px" },
        // { en: "banner", ch: "主图", x: "-150px", y: "-127px", w: "750px", h: "340px" },
        { en: "scan_big", ch: "扫一扫", x: "-3907px", y: "-432px", w: "518px", h: "518px" },

      ]
    };
  },
  methods: {

  },
  async created() {
    





  }


};
</script>

<style lang="scss" >
@import "@/assets/css/util.scss"; //导入公共样式文件



</style>