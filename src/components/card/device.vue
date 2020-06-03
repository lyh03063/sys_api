<template>
  <div class="item-box MB10 TAC">
    <a class="link-box n-a" :href="getLink(item)">
      <div :class="`TAR ${$dictLable('equipment_state_class',item.state)}`">
        <i class="point MR5"></i>
        {{$dictLable('equipment_state',item.state)}}
      </div>
      <div class="DP3 W60 H60 OFH n-img-box">
        <img :src="item.equipment_type_icon" />
      </div>
      <p class="FS16 MB15 MT4">{{item.equipment_name}}</p>
    </a>
    <div class="DPF FS14 C_999">
      <!-- <span v-if="item.equipment_type==170">大气压：{{item.value}}mbar</span> -->

      <div class="PR10 TAC M_0" v-if="item.equipment_type==10">
        <van-button plain round type="primary" size="small" @click="playVedio">预览</van-button>
      </div>
      <div class="TAC LH32 DPF M_0" v-else-if="item.equipment_type==6">
        <van-switch
          :value="item.value"
          active-value="1"
          inactive-value="0"
          @input="onInput(item)"
          v-model="item.is_open"
          :loading="item.loading"
          active-color="#07c160"
          inactive-color="#ccc"
        />
        <div class="ML5">{{item.is_open=="1"?"开":"关"}}</div>
      </div>
       <div class="TAC M_0" v-else>{{item.value}}</div>
     
    </div>
    <!--弹窗视频播放-->
   <van-dialog
      width="9rem"
      v-model="showDialogVedio"
      title="视频播放"
    :show-confirm-button="false"
      show-cancel-button
      cancelButtonText="关闭"
    >
      <play_live_vedio :cf="cfVedioPlay" v-if="showDialogVedio"></play_live_vedio>
    </van-dialog>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_card_device],
  props: ["item"],
  data() {
    return {
      showDialogVedio: false,
      cfVedioPlay: {
        cfVedio: {
          width: "360",
          height: "200",
          src: "https://hls01open.ys7.com/openlive/f55d1ba63cac47eea07a8d3c564b3ec3.hd.m3u8",
          poster: "xxx",
        }
      },
    };
  },
  computed: {

    // getLink(item) {//getLink注意是computed属性返回一个函数
    //   return function (item) {
    //     return `${this.hashBase}device_modify?equipment_id=${item.equipment_id}&equipment_name=${item.equipment_name}&pre_page=${this.pageUrlEncode}`
    //   }
    // },

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
  padding: 10px 15px;
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