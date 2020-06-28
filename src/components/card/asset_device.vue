<template>
  <div class="MB10 out">
   
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
    <!--摄像头-->
    <div class="item-box DPF C_666" v-if="item.equipment_type==10" @click="playVedio">
      <div class="DP3 W50 H50 OFH n-img-box MR12 Circle">
        <img :src="item.equipment_type_icon" @error="imgError" />
      </div>
      <div class="FX1">
        <p class="FS16 MB8">{{item.equipment_name}}</p>
        <div :class="`TAL ${$dictLable('equipment_state_class',item.state)}`">
          <i class="point MR5"></i>
          {{$dictLable('equipment_state',item.state)}}
        </div>
      </div>
      <!-- <div class="DP3 W30 PT16 TAR MR10">
        <van-icon name="arrow" size="20px" />
      </div>-->
      <span class="W30 TAC" @click.prevent.stop="actionDialogShow">
        <van-icon name="setting-o" size="24px" color="#999" />
      </span>
    </div>

    <!--策略-->
    <div class="item-box DPF" v-else-if="item.equipment_type==7">
      <!-- getLinkStrategy(item) -->
      <a class="link-box n-a FX1 DPF" href="javascript:;" @click="goListStrategy">
        <div class="FX1">
          <p class="FS16 MB8">{{item.equipment_name}}</p>
          <div :class="`TAL ${$dictLable('equipment_state_class',item.state)}`">
            <i class="point MR5"></i>
            {{$dictLable('equipment_state',item.state)}}
          </div>
        </div>
      </a>

      <span class="W30 TAC" @click.prevent="actionDialogShow">
        <van-icon name="setting-o" size="24px" color="#999" />
      </span>
    </div>
    <!--控制设备-->
    <div class="item-box DPF" v-else-if="arr_type_control.includes(item.equipment_type)">
      <a class="link-box n-a FX1 DPF" :href="getLink(item)">
        <div class="DP3 W50 H50 OFH n-img-box MR12 Circle">
          <img :src="item.equipment_type_icon" @error="imgError" />
        </div>
        <div class="FX1">
          <p class="FS16 MB8">{{item.equipment_name}}</p>
          <div :class="`TAL ${$dictLable('equipment_state_class',item.state)}`">
            <i class="point MR5"></i>
            {{$dictLable('equipment_state',item.state)}}
          </div>
        </div>
      </a>
      <div class="FS14 C_999 W80 TAR MR10">
        <van-switch
          :value="item.value"
          active-value="1"
          inactive-value="0"
          @input="onInput(item)"
          v-model="item.is_open"
          :loading="item.loading"
          active-color="#07c160"
          size="26px"
          inactive-color="#ccc"
        />
      </div>
      <span class="W30 TAC" @click.prevent="actionDialogShow">
        <van-icon name="setting-o" size="24px" color="#999" />
      </span>
    </div>

    <!--环境设备-->
    <div class="item-box DPF C_666" v-else-if="arr_type_env.includes(item.equipment_type)">
      <div class="DP3 W50 H50 OFH n-img-box MR12 Circle">
        <img :src="item.equipment_type_icon" @error="imgError" />
      </div>
      <div class="FX1">
        <p class="FS16 MB8">{{item.equipment_name}}</p>
        <div :class="`TAL ${$dictLable('equipment_state_class',item.state)}`">
          <i class="point MR5"></i>
          {{$dictLable('equipment_state',item.state)}}
        </div>
      </div>
      <div class="FS14 C_999 W80 TAR MR10">
        <span>{{item.value}}</span>
      </div>
      <span class="W30 TAC" @click.prevent="actionDialogShow">
        <van-icon name="setting-o" size="24px" color="#999" />
      </span>
    </div>
  </div>
</template>

<script>
export default {

  name: "asset_device",
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_card_device],
  props: ["item"],
  data() {
    return {
      showDialogVedio: false,
      cfVedioPlay: {
        cfVedio: {

          style: {
            width: "9rem",
            height: "4.5rem",
          },
          src: "https://hls01open.ys7.com/openlive/f55d1ba63cac47eea07a8d3c564b3ec3.hd.m3u8",
          poster: "xxx",
        }
      },
    };
  },
  computed: {

  },
  methods: {

    //函数：{选择菜单后的回调函数}
    async actionDialogShow() {
      this.$emit("action-dialog-show", this.item,this);//向父组件传值1
    },
    //函数：{跳转到策略列表函数}
    goListStrategy: async function () {
      this.$emit("single-action", { action: "go_list_strategy", doc: this.item });//传值给父组件-
    },


  },
  created() { }
};
</script>

<style scoped>
.item-box {
  background: #fff;
  padding: 5px 0 10px 5px;
  align-items: center;
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