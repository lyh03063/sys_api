<template>
  <div class="item-box MB15 TAC">
    <a class="link-box n-a" target="_blank" :href="`javascript:;`">
      <div :class="`TAR ${$dictLable('equipment_state_class',item.state)}`">
        <i class="point MR5"></i>
        {{$dictLable('equipment_state',item.state)}}
      </div>
      <div class="DP3 W70 H70 OFH">
        <i class="icon-zhg size_100_100" :class="classIcon" style="transform: scale(0.7);"></i>
      </div>
      <p class="FS18 MB15 MT4">{{item.equipment_name}}</p>
    </a>
    <div class="DPF FS14 C_999">
      <span v-if="item.equipment_type==1">大气压：{{item.value}}mbar</span>
      <div class="TAC LH32 DPF M_0" v-else-if="item.equipment_type==2">
        <van-switch
          :value="item.value"
          @input="onInput(item)"
          v-model="item.is_open"
          :loading="item.loading"
          active-color="#07c160"
          inactive-color="#ccc"
        />
        <div class="ML5">{{item.is_open?"开":"关"}}</div>
      </div>
    </div>
  </div>
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
  border-radius: 5px;
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