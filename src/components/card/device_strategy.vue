<template>
  <div class >
    <div class="item-box MB15">
      <a class="link-box n-a FX1 DPF" :href="`javascript:;`" style="align-items: center;">
        <div class="DP3 W70 H70 OFH n-img-box MR15">
          <img :src="item.icon" alt />
        </div>
        <span class="FX1">
          <p class="FS16">{{item.strategy_name}}</p>
        </span>
      </a>
      
      <span class="W40 TAC PT3" @click.prevent="actionDialogShow">
        <van-icon name="setting-o" size="24px" color="#999" />
      </span>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "device_strategy",
  mixins: [MIX.base, MIX.zhihuigeng_base],
  props: ["item"],
  data() {
    return {
     
    };
  },
  computed: {

  },
  methods: {

   //函数：{选择菜单后的回调函数}
    async actionDialogShow() {
      this.$emit("action-dialog-show", this.item);//向父组件传值1
    },
   
    
  },
  created() {

    window.document.title = `资产策略`
    this.ready = true;
  }
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