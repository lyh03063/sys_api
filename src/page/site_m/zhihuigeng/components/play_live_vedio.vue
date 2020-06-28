<template>
  <div class>
    <video :id="id" v-bind="cf.cfVedio" controls playsinline v-if="cf.cfVedio.src"></video>
    <div class="C_f60 TAC FS12 PT10 PB10" v-else>未找到视频播放地址</div>
  </div>
</template>

<script>
export default {
  name: "play_live_vedio",
  props: {
    cf: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  mixins: [MIX.base],
  data() {
    return {
      id: `id_${util.getTimeRandom()}`


    };
  },
  computed: {

  },
  methods: {},
  created() {

    let cfVedio = this.cf.cfVedio || {}
    let cfVedioDefault = {
      autoplay: true,//自动播放
    }
    util.setObjDefault(cfVedio, cfVedioDefault);
    util.setObjDefault(this.cf, { cfVedio });


  },
  async mounted() {
    await util.loadJs({ url: PUB.urlJS.ezuikit })//引入萤石云JSSDK
    if (this.cf.cfVedio.src) {//如果视频地址存在
      new EZUIPlayer(this.id);//初始化播放器
    }

  }
};
</script>

<style scoped>
</style>