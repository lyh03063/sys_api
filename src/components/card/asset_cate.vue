<template>
  <div class="item-box MB15 TAC">
    <a class="link-box n-a" target="_blank" :href="`javascript:;`">
      <div class="DP3 W70 H70 OFH n-img-box">
        <img :src="item.resource_type_icon" alt />
      </div>
      <p class="FS18 MB15 MT4">{{item.resource_type_name}}</p>
    </a>
    <div class="DPF FS16 C_999">
      <div class="WP50 TAL">正常：11</div>
      <div class="WP50 TAR">异常：22</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "asset_cate",
  mixins: [MIX.base],
  props: ["item"],
  data() {
    return {
    };
  },
  computed: {

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
  padding: 20px 25px;
}
</style>