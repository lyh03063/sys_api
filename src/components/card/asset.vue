<template>
  <a class="link-box n-a" target="_blank" :href="`javascript:;`">
    <div class="item-box MB15">
      <div class="DP3 W70 H70 OFH n-img-box MR15">
        <img :src="item.resourceTypePic" alt />
      </div>
      <span class="FX1">
        <p class="FS16">{{item.resourceName}}</p>
      </span>
      <span class="W100">
        <div class="icon-box W64 H31 MR20">
          <i
            class="icon-zhg  state-text"
            :class="`${item.state==1?'icon_normal':'icon_abnormal_2'}`"
            style="transform: scale(0.7);"
          >{{item.state==1?"正常":"异常"}}</i>
        </div>
      </span>
    </div>
  </a>
</template>

<script>
export default {
  props: ["item"],
   mixins: [MIX.base],
  data() {
    return {
      mapIcon: { "1": "atmos", "2": "switch" }

    };
  },
  computed: {
    classIcon() {
      let type = this.item.type || 2;
      return `icon_${this.mapIcon[type]}`
    }
  },
  methods: {},
  created() { }
};
</script>

<style scoped>
.item-box {
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding: 20px 25px;
  align-items: center;
}

.state-text {
  font-style: normal;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
}
</style>