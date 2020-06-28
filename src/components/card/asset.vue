<template>
  <div class v-if="!isDelete">
    <a class="link-box n-a" :href="getLink(item)">
      <div class="item-box ">
        <div class="DP3 W50 H50 OFH n-img-box MR15 Circle">
          <img :src="item.resourceTypePic" @error="imgError" />
        </div>
        <span class="FX1">
          <p class="FS16">{{item.resourceName}}</p>
        </span>
        <span class="W70">
          <div class="icon-box W64 H31 MR20">
            <i
              class="icon-zhg state-text"
              :class="`${item.state==1?'icon_normal':'icon_abnormal_2'}`"
              style="transform: scale(0.7);"
            >{{item.state==1?"正常":"异常"}}</i>
          </div>
        </span>
        
         <span class="W40 TAC PT3" @click.prevent="actionDialogShow">
          <van-icon name="setting-o" size="24px" color="#999" />
        </span>
      </div>
    </a>
    

  </div>
</template>

<script>
export default {
  props: ["item"],
  mixins: [MIX.base, MIX.zhihuigeng_base],
  data() {
    return {
      isDelete: false,//是否被删除
      showAction: false,
     
    };
  },
  computed: {

    getLink(item) {//getLink注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}detail_asset?resource_id=${item.id}&pre_page=${this.pageUrlEncode}`
      }

    },
  },
  methods: {
     //函数：{选择菜单后的回调函数}
    async actionDialogShow() {
      this.$emit("action-dialog-show", this.item);//向父组件传值1
    },
    //函数：{获取修改当前资产的地址函数}
    getLinkModify() {
      return `asset_add_modify?resource_id=${this.item.id}&pre_page=${this.pageUrlEncode}`

    },

  },
  created() {


  }
};
</script>

<style scoped>
.item-box {
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding: 10px 5px 10px 10px;
  align-items: center;
}

.state-text {
  font-style: normal;
  text-align: center;
  line-height: 44px;
  color: #fff;
  font-size: 14px;
}
</style>