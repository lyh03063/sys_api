<template>
  <div class="item-box MB15">
    <a
      class="link-box n-a FX1 DPF"
      target="_blank"
      :href="`javascript:;`"
      style="align-items: center;"
    >
      <div class="DP3 W70 H70 OFH n-img-box MR15">
        <img :src="item.icon" alt />
      </div>
      <span class="FX1">
        <p class="FS16">{{item.strategy_name}}</p>
      </span>
    </a>
    <span
      @click="dialogDelete"
      class="W50 TAR DPF BC_f0f0f0 P10 Cur1"
      style="align-items: center;color:#999"
    >
      <van-icon name="delete" size="26px" />
    </span>
  </div>
</template>

<script>
export default {
  name: "device_strategy",
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
  methods: {
    dialogDelete() {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '是否确定删除选中的策略',
      }).then(() => {
        this.$toast('删除成功');
      });
    }
  },
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