<template>
  <div class="item-box DPF">
    <div class="DP3 W36 H36 OFH n-img-box MR10">
      <img :src="item.equipment_type_icon" @error="imgError"/>
    </div>
    <div class="FS14 MB15 MT6 FX1">
      <div class>{{item.equipment_name}}</div>
      <div class="DPF MT8" v-if="item.equipment_type!=6">
        <select class="select-compare MR8" v-model="item.compare">
          <option value="2">等于</option>
          <option value="0">小于</option>
          <option value="1">小于或等于</option>
          <option value="4">大于</option>
          <option value="3">大于或等于</option>
        </select>
        <input class="input-value MR8" type="text" name="name" v-model="item.value" />
        <span class="C_999">{{item.unit}}</span>
      </div>
    </div>
    <div class="DPF MR6" v-if="item.equipment_type==6">
      <div class="MR5 MT5">{{item.value=="2"?"开":"关"}}</div>  
      <van-switch
        v-model="item.value"
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
  name: "device_item_selected",
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
.select-compare {
  border: none;
  border: 1px #f0f0f0 solid;
  width: 90px;
}
.input-value {
  border: 1px #f0f0f0 solid;
  width: 100px;
}
</style>