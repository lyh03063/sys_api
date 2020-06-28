<template>
  <div class="item-box DPF">
    <!-- <div class="" >
      {{item._selected}}-
    </div> -->
    
    <van-checkbox
      v-model="item._selected"
      checked-color="#07c160"
      class="MR10"
      @change="changeSelected"
    ></van-checkbox>
    <div class="DP3 W40 H40 OFH n-img-box MR10">
      <img :src="item.equipment_type_icon" @error="imgError"/>
    </div>
    <p class="FS14 MB15 MT4 FX1">{{item.equipment_name}}</p>
    
  </div>
</template>

<script>
export default {
  name: "device_op_select",
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
    //函数：{改变选中状态函数}
    changeSelected: async function (value) {
      this.$emit("single-action", { action: "change_selected", doc: this.item });//传值给父组件-

    },


  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  border-radius: 5px;
  padding: 10px 5px;
}

</style>