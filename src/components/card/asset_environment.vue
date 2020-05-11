<template>
  <div class="MB10  ">
    <div class="LH20 C_999 MB8 PL5">{{item.equipment_name}}</div>

    <div class="item-box">
      <a class="link-box n-a DPF" target="_blank" :href="`javascript:;`">
        <div class="DP3 W70 H70 OFH MR20">
          <i class="icon-zhg size_100_100" :class="classIcon" style="transform: scale(0.7);"></i>
        </div>
        <div class>
          <p class="FS18 MB15 MT4">{{item.equipment_name}}</p>
          <div :class="`TAL ${$dictLable('equipment_state_class',item.state)}`">
            <i class="point MR5"></i>
            {{$dictLable('equipment_state',item.state)}}
          </div>
        </div>
      </a>
      <div class="DPF FS14 C_999 MT8">
        <span>大气压：{{item.value}}mbar</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "asset_environment",
  mixins: [MIX.base],
  props: ["item"],
  data() {
    return {
      mapIcon: { "1": "atmos", "2": "switch" }
    };
  },
  computed: {
    classIcon() {
      let type = this.item.equipment_type || 2;
      return `icon_${this.mapIcon[type]}`
    }
  },
  methods: {
    async onInput(item) {
      item.is_open = !item.is_open//这句是让状态先回退
      item.loading = true;
      console.log(`onInput:`, item);
      await util.timeout(1500); //延迟
      item.is_open = !item.is_open
      delete item.loading
    },

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  padding: 20px 25px;
}

.point {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #000;
  border-radius: 50%;
}
.offline {
  color: #999;
}
.offline .point {
  background: #999;
}

.online {
  color: #3acc80;
}
.online .point {
  background: #3acc80;
}
.abnormal {
  color: #fb595a;
}
.abnormal .point {
  background: #fb595a;
}
</style>