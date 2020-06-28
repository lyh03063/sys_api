<template>
  <div>
    <div class v-if="forbid">
      <van-count-down :time="this.cf.time" @finish="finishCountDown">
        <template v-slot="timeData">
          <span class="btn-forbid">{{ timeData.seconds }}秒后重新获取</span>
        </template>
      </van-count-down>
    </div>
    <van-button size="small" plain type="primary" @click="sendVcode" v-else>发送验证码</van-button>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  name: "m_btn_send_vcode",
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
      forbid: false,

    };
  },
  methods: {

    //函数：{发送验证码函数}
    sendVcode: async function () {
      this.forbid = true;
      let { cfAjax } = this.cf
      let { url } = cfAjax
      let dataRs = await this.$ajax({ url, data: { [this.cf.keyPhone]: this.value } });
      console.log(`dataRs:`, dataRs);
      if (dataRs.code != 0) {//如果请求异常
        this.forbid = false;
      } 


    },
    //函数：{倒计时结束执行函数}
    finishCountDown: async function () {
      this.forbid = false;

    },
  },
  async created() {
    let cfAjax = lodash.get(this.cf, `cfAjax`, {});
    let cfAjaxDefault = {
      url: "/msg/smscode", params: {},
    }
    util.setObjDefault(cfAjax, cfAjaxDefault);
    util.setObjDefault(this.cf, {
      time: 60 * 1000,
      keyPhone: "phone_num",
      cfAjax
    });
  }
};
</script>

<style scoped>
.btn-forbid {
  color: #999;
  display: inline-block;
  padding: 0 20px;
  height: 28px;
  line-height: 26px;

  cursor: pointer;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  border: 1px #ddd solid;
  border-radius: 5px;
}
</style>