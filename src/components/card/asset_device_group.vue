<template>
  <div class="">
    <div class="LH20 C_999   BC_f0f0f0 PL10 PT15 PB4">
      <!--根据设备类型获取设备分类名-->

      {{item.equipment_type_name}}
    </div>
    <div class="item-box">
      <card_asset_device
        @action-dialog-show="actionDialogShow"
        @single-action="singleAction"
        class="item_in_box"
        :item="doc"
        v-for="doc in item.list"
        :key="doc.equipment_id"
      ></card_asset_device>
    </div>
  </div>
</template>

<script>
export default {
  name: "asset_device_group",
  mixins: [MIX.base, MIX.zhihuigeng_base],
  components: {

    card_asset_device: () => import("@/components/card/asset_device.vue"),

  },
  props: ["item"],
  data() {
    return {
    };
  },
  computed: {
    getLink(item) {//注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}device_modify?equipment_id=${item.equipment_id}&equipment_name=${item.equipment_name}&pre_page=${this.pageUrlEncode}`
      }
    },
  },
  methods: {
    //函数：{选择菜单后的回调函数}
    async actionDialogShow(item) {
      this.$emit("action-dialog-show", item);//向父组件传值2

    },
    //函数：{处理单项操作的回调函数}
    async singleAction({ action, doc, vm }) {
      this.$emit("single-action", { action, doc });//传值给父组件-
    },
  

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  padding: 15px 15px 0 15px;
}

.item_in_box:not(:last-child) {
  border-bottom: 1px #f0f0f0 solid;
  margin-bottom: 6px;
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