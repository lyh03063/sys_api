<template>
  <div class="TAC" :class="cf.class">
    <component :is="cf.component" v-if="cf.component" ></component>
    <div class="DP3 OFH MT20" style="width:100px;height:70px;" v-if="cf.iconType=='default'">
      <div class="icon-zhg icon_no_record" style="transform: scale(0.5);"></div>
    </div>
    <!--插槽-->
    <slot class name="slot_no_data"></slot>

    <div class="C_999 " v-if="cf.text">
      {{cf.text}}
      <!-- 您还没有添加策略，
      <a target="_blank" class="a-zhg-green" href="javascript:;">立即添加</a>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "has_no_data",
  props: {
    cf: {
      default: function () {
        return {}
      }
    }
  },
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