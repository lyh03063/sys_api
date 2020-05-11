<template>
  <a class="link-box n-a" target="_blank" :href="`javascript:;`">
    <div class="item-box MB15">
      <div class="icon-box W70 H70 MR20">
        <i class="icon-zhg size_100_100" :class="classIcon" style="transform: scale(0.7);"></i>
      </div>
      <span class="FX1">
        <p class="FWB FS18 MB15 MT4">{{item.device_type_name}}</p>
        <div class="DPF FS16 C_999">
          <div class="WP33">在线：{{item.device_online}}</div>
          <div class="WP33 TAC">离线：{{item.device_offline}}</div>
          <div class="WP33 TAR">故障：{{item.device_fault}}</div>
        </div>
      </span>
    </div>
  </a>
</template>

<script>
export default {
   mixins: [MIX.base],
  props: ["item"],
  
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
}
</style>