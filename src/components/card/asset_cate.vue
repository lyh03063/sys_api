<template>
  <div class="item-box MB10 TAC">
    <a class="link-box n-a" :href="getLink(item)">
      <div class="DP3 W50 H50 OFH n-img-box Circle">
        <img :src="item.resource_type_pic" alt />
      </div>
      <p class="FS16 MB8 MT4">{{item.resource_type_name}}</p>
    </a>
    <div class="DPF FS12 C_333">
      <div class="WP50 TAL ">正常：{{item.param_normal}}</div>
      <div class="WP50 TAR ">异常：<span :class="{C_f00:item.param_exception>0}">{{item.param_exception}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "asset_cate",
  mixins: [MIX.base, MIX.zhihuigeng_base],
  props: ["item"],
  data() {
    return {
    };
  },
  computed: {
    getLink(item) {//getLink注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}list_asset?type_id=${item.type_id}&resource_type_name=${item.resource_type_name}&pre_page=${this.pageUrlEncode}`
      }
    },
  },
  methods: {

  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  border-radius: 5px;
  padding: 12px 15px;
}
</style>