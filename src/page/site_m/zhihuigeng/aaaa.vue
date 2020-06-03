<template>
  <div class="TAC">
    <div class="DP3 OFH" style="width:100px;height:70px;">
      <div class="icon-zhg icon_no_record" style="transform: scale(0.5);"></div>
    </div>
    <div class="C_999">
      当前页面暂无数据
      <!-- 您还没有添加策略，
      <a target="_blank" class="a-zhg-green" href="javascript:;">立即添加</a>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "has_no_data",
  props: ["item"],
  mixins: [MIX.base],
  data() {
    return {


    };
  },
  computed: {

  },
  methods: {},
  created() { }
};
</script>

<style scoped>
</style>