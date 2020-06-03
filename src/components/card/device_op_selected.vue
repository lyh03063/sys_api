<template>
  <div class="item-box DPF">
    <div class="DP3 W36 H36 OFH n-img-box MR10">
      <img :src="item.equipment_type_icon" />
    </div>
    <p class="FS14 MB15 MT6 FX1">{{item.equipment_name||item.equipment_type_name}}</p>
    <div class="DPF MR6">
      <div class="MR5 MT2">{{item.cmd=="2"?"开":"关"}}</div>
      <van-switch
        v-model="item.cmd"
        active-value="2"
        inactive-value="3"
        active-color="#07c160"
        inactive-color="#ccc"
        size="24px"
      />
    </div>
    <div class="W40 TAC">
      <van-icon name="close" color="#f60" @click="deleteData" size="24px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "device_op_selected",//动作设备选择列表
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_card_device],
  props: ["item"],
  data() {
    return {
      checked: false,

    };
  },
  computed: {



  },
  methods: {

    //函数：{删除数据函数}
    deleteData: async function () {
      this.$emit("single-action", { action: "delete", doc: this.item });//传值给父组件-

    },

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  border-radius: 5px;
  padding: 9px 5px 6px 6px;
   align-items: center;
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