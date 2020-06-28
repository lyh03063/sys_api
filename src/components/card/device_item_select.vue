<template>
  <div class="item-box DPF">
    <!-- <div class="" >
      {{item._selected}}---{{item._is_open}}---
    </div> -->
    
    <van-checkbox
      v-model="item._selected"
      checked-color="#07c160"
      class="MR10"
      @change="changeSelected"
    ></van-checkbox>
    <div class="DP3 W40 H40 OFH n-img-box MR10">
      <img :src="item.equipment_type_icon" @error="imgError" />
    </div>
    <p class="FS14 MB15 MT4 FX1">{{item.equipment_name}}</p>
    
  </div>
</template>

<script>
export default {
  name: "device_item_select",
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