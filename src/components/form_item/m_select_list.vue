<template>
  <div>
    <van-popup v-model="cf.showPopup" v-bind="cf.cfPopup">
      <div class="DPF H40 PR20 PL10 PSF WP100 BC_f0f0f0" style="align-items:center;z-index:999">
        <div >
          <a href="javascript:;" class="n-a" @click="cancel">取消</a>
        </div>
        <div class="FX1 TAC">{{cf.title||""}}</div>
        <div class>
          <a href="javascript:;" @click="confirm" style="color:#3ACC80">确认</a>
        </div>
      </div>
      <list_data_zhihuigeng class="MT30" :cf="cf.cfList" @single-action="singleAction"></list_data_zhihuigeng>
    </van-popup>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  name: "m_select_list",
  components: {
    list_data_zhihuigeng: () => import("@/page/site_m/zhihuigeng/components/list_data_zhihuigeng.vue"),
  },
  props: {
    value: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      currentTime: "",
      defaultIndex: 0,//默认选中位置
      showPopup: true,
      showText: "",
      columns: [],

    };
  },
  methods: {
    //函数：{ajax获取选项列表函数}
    ajaxGetList: async function () {


    },
    confirm(obj) {
      this.cf.showPopup = false;
      this.$emit("confirm", {listSelected:this.listSelected});//传值给父组件-

    },
    //函数：{列表单项数据操作的处理函数}
    singleAction(obj) {
      let {listSelected}=obj;
      this.listSelected=listSelected

    },

    cancel(obj) {

      this.cf.showPopup = false;
    },
  },
  async created() {



    let cfPopup = this.cf.cfPopup || {}

    //树默认配置
    let cfPopupDefault = {

      position: 'bottom',
      style: { height: '70%' },
    }

    util.setObjDefault(cfPopup, cfPopupDefault);


    util.setObjDefault(this.cf, {
      showPopup: false,
      cfPopup,


    });

    let cfAjax = lodash.get(this.cf, `cfPicker.cfAjax`);
    if (cfAjax) {//Q1:存在ajax配置

    } else { //Q2:否则

    }





  }
};
</script>
