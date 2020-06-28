<template>
  <div class="HP100 out">
    <dm_debug_list>
      <dm_debug_item v-model="$data" />
    </dm_debug_list>
    <div class="n-m-main-box BC_f0f0f0" v-if="readyBase">
      <!--在小程序中则不显示这个标题栏-->
      <div class="H45" v-if="!inWxMiniProgram">
        <div class="PSF T0 R0 WP100" style="z-index:100">
          <van-nav-bar
            class
            :title="title||cf.title"
            left-text
            left-arrow
            @click-left="onClickLeft"
          />
        </div>
      </div>

      <!-- inWxMiniProgram: {{inWxMiniProgram}}
     <div class="" >debugText: {{debugText}}</div>
      <el-button plain @click="checkWxEnv" size="mini">checkWxEnv</el-button>-->
      <!--插槽-->
      <slot class></slot>
      <!-- <dm_space height="30"></dm_space> -->
    </div>
  </div>
</template>

<script>

export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  props: {
    title: {},
    cf: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  name: "page_h5_zhihuigeng",

  data() {
    return {

    };
  },
  computed: {
    pageUrlEncode() {
      let path = this.$route.fullPath;
      return encodeURIComponent(path);//进行url编码

    },
  },

  methods: {




  },
  async created() {


  },
  mounted() {


  }
};
</script>

<style scoped>
.out >>> .n-a:link,
.out >>> .n-a:visited {
  color: #000;
}
</style>