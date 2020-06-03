<template>
  <div class="HP100 out">
    <dm_debug_list>
      <dm_debug_item v-model="doc" />
      <dm_debug_item v-model="cfListEnv" />
      <dm_debug_item v-model="cfListControl" />
      <dm_debug_item v-model="cfListVedio" />
      <dm_debug_item v-model="camera_url" />
    </dm_debug_list>

    <page_h5_zhihuigeng class :title="doc.resource_name">
      <div class="PT10 PR10 PB10 TAR">
        <van-button plain type="primary" :url="linkAddDevice" size="small">添加设备</van-button>
      </div>
      <!--直播视频占位图-->
      <div
        class="n-img-box TAC banner-box"
        :style="`background-image: url(${doc.resource_photo});`"
        v-if="!playing"
      >
        <div class="DP3 W80 H80" style="z-index:1" @click="playing=true" v-if="camera_url">
          <div class="icon-zhg icon_play"></div>
        </div>
      </div>
      <!--直播视频-->
      <play_live_vedio :cf="cfVedioMain" v-if="playing"></play_live_vedio>

      <van-tabs
        v-model="active"
        color="#3ACC80"
        title-active-color="#3ACC80"
        @click="tabsClick"
        v-if="ready"
      >
        <van-tab name="intro" title="概况" :title-style="tabTitleStyle">
          <div class="BC_fff P10">
            <ul class="n-flex-ul">
              <li>
                <b>编号</b>
                <i>{{doc.resource_no}}</i>
              </li>
              <li>
                <b>负责人</b>
                <i>{{doc.resource_owner}}</i>
              </li>
              <li>
                <b>面积</b>
                <i>{{doc.resource_size}}亩</i>
              </li>
              <li>
                <b>品种</b>
                <i>{{doc.xxxxxx}}</i>
              </li>
              <li>
                <b>当前阶段</b>
                <i>{{doc.xxxxx||"暂无"}}</i>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab name="env" title="环境" :title-style="tabTitleStyle">
          <list_data_zhihuigeng class="" :cf="cfListEnv" @single-action="singleAction"></list_data_zhihuigeng>
        </van-tab>
        <van-tab name="control" title="控制" :title-style="tabTitleStyle">
          <list_data_zhihuigeng
            class=""
            :cf="cfListControl"
            @single-action="singleAction"
            @action-dialog-show="actionDialogShow"
          ></list_data_zhihuigeng>
        </van-tab>
        <van-tab name="vedio" title="视频" :title-style="tabTitleStyle">
          <list_data_zhihuigeng
            class=""
            :cf="cfListVedio"
            @single-action="singleAction"
            @action-dialog-show="actionDialogShow"
          ></list_data_zhihuigeng>
        </van-tab>
      </van-tabs>
    </page_h5_zhihuigeng>
  </div>
</template>
<script>


// window.addEventListener("popstate", function (e) {
//   alert(`返回-${window.pageUrlEncode}`);//根据自己的需求实现自己的功能 


// }, false);





let cfAjaxList = {//ajax配置
  url: `/resource/resource_device_info_v2`, params: { mold: 1 },
}


//变量：{单项操作按钮配置-针对普通设备}
let actions_device = [
  { action: "modify", name: '修改设备' },
  { action: "unbind", name: '解除绑定', },
];

//变量：{单项操作按钮配置-针对控制策略}
let actions_strategy = [
  ...actions_device,
  { action: "go_list_strategy", name: '查看/修改策略', },
];

//变量：{单项操作按钮配置-针对视频}
let actions_vedio = [
  { action: "play_vedio", name: '查看视频', },
  ...actions_device,

];


let cfList = {//列表配置
  ajax: lodash.cloneDeep(cfAjaxList),

  cfVanList: {
    style: { padding: 0 }
  },
  com_card: "card_asset_device_group",

  cf_list_flex: { col: 1,style_g:{"margin-bottom":0} },
  list: [
    { id: 1, equipment_name: "大气压1", equipment_type: 1, state: 0, value: "0.5" },
    { id: 2, equipment_name: "大气压2", equipment_type: 1, state: 1, value: "0.5" },
    { id: 3, equipment_name: "开关", equipment_type: 2, state: 2, value: "0.5", is_open: true },
  ],
  actions: actions_device,

}


export default {
  mixins: [MIX.base, MIX.zhihuigeng_base, MIX.zhihuigeng_page_list],
  data() {

    return {
      camera_url: null,
      playing: false,//视频是否开始播放
      cfVedioMain: {
        cfVedio: {
          style: {
            width: "10rem",
            height: "5rem",
          },
          // src: "https://hls01open.ys7.com/openlive/f55d1ba63cac47eea07a8d3c564b3ec3.hd.m3u8",
          poster: "xxx",
        }
      },
      ready: false,//是否准备好基础信息
      active: "control1",
      resource_id: null,
      doc: {
        resource_name: "xxx",
      },
      tabTitleStyle: "font-size:16px",
      cfListEnv: lodash.cloneDeep(cfList),//环境设备列表配置
      cfListControl: lodash.cloneDeep(cfList),//控制设备列表配置
      cfListVedio: lodash.cloneDeep(cfList),//视频设备列表配置
    };
  },
  computed: {
    linkAddDevice() {//注意是computed属性返回一个函数
      let link = `${this.hashBase}asset_bind_device?resource_id=${this.resource_id}`
      // link += `&pre_page=${this.pageUrlEncode}`
      return link
    },
  },
  methods: {
    //函数：{打开操作菜单函数}-根据不同的设备类型显示不同的单项操作菜单（策略or设备）
    async actionDialogShow(doc, cf) {
      if (doc.equipment_type == 7) {//如果是策略
        cf.actions = actions_strategy
      } else if (doc.equipment_type == 10) {
        cf.actions = actions_vedio
      } else {
        cf.actions = actions_device
      }
    },
    //函数：{选择单项操作菜单后的回调函数}
    async singleAction({ action, doc, vm }) {//vm是子组件对象，牛逼的用法
      if (action == "modify") {//Q1:修改
        let path = `device_modify?equipment_id=${doc.equipment_id}&equipment_name=${doc.equipment_name}&pre_page=${this.pageUrlEncode}`;
        this.$router.push({ path });//跳转
      } else if (action == "detail") { //Q2:查看详情
        alert(`查看详情`);
      } else if (action == "unbind") { //Q3:删除
        let clickStatus = await this.$dialog.confirm({
          title: '确认', message: '确认解绑该设备？',
        }).catch(() => { })
        if (clickStatus != "confirm") return
        let param = { resource_id: this.resource_id, equipment_ids: doc.equipment_id }
        let data = await this.$ajax({ url: `/resource/unbind_equipment`, data: param });
        this.$toast('解绑成功');
        let index = this.cfListEnv.list.findIndex((d) => d.equipment_id = doc.equipment_id)
        vm.ajaxGetList()//子组件请求数据
      } else if (action == "go_list_strategy") { //Q4:跳转策略列表
        // `${this.hashBase}list_device_strategy?equipment_id=${item.equipment_id}&pre_page=${this.pageUrlEncode}`
        let path = `list_device_strategy?equipment_id=${doc.equipment_id}&resource_id=${this.resource_id}&pre_page=${this.pageUrlEncode}`;
        this.$router.push({ path });//跳转

      }
    },
    //函数：{tabs页点击的处理函数}
    tabsClick: async function (name, title) {
      let { fullPath } = this.$route//要使用fullPath，使用path的话会清除掉其他参数
      this.$router.replace({ path: fullPath, query: { tab: name } })//跳转tab路由---replace
    },

    //函数：{处理资产下设备列表数据}-mold
    ajaxAndhandleList: async function (_json) {
      let { mold, arr_type_fixed } = _json
      let param = { resource_id: this.resource_id, mold };
      let data = await this.$ajax({ url: `/resource/resource_device_info_v2`, data: param });
      if (data === false) return
      // this.cfListControl.list = data;
    },
    //函数：{处理ajax后数据列表函数}
    fnHandleListOut: function (_json) {
      let { arr_type_fixed, list } = _json

      //按equipment_type进行归类
      let arr_equipment_type_1 = list.map(doc => doc.equipment_type)//变量：{真实数据的设备类型数组（未去重）}
      //这里搞个固定的数组主要是会了控制循环的顺序！！！！
      let arr_equipment_type = arr_type_fixed.concat(arr_equipment_type_1)//设备的类型数组
      arr_equipment_type = Array.from(new Set(arr_equipment_type))//去重

      let arrMain = arr_equipment_type.map(equipment_type => {
        let listIn = list.filter(doc => doc.equipment_type == equipment_type);//同类型的设备列表
        if (!(listIn && listIn.length)) return
        let equipment_type_name = listIn[0].equipment_type_name;//获取第一条数据的设备类型名称
        return {
          equipment_type_name, equipment_type, list: listIn
        }
      })
      arrMain = util.clearArr(arrMain)
      return arrMain; //调用：{清除数组中的无效元素（null,undefined,空格等）}

    },


  },
  async created() {
    let { resource_id, tab } = this.$route.query;
    this.active = tab//标签页聚焦


    this.resource_id = resource_id;
    // util.zhihuigeng.resource_id = resource_id;//***保存到公共变量，供后续页面使用（如添加策略条件）
    let data = await this.$ajax({ url: `/resource/query_resource_detail_v2`, data: { resource_id } });
    if (data === false) return
    this.doc = data
    this.title = this.doc.resource_name;//修改标题
    window.document.title = this.title

    /****************************环境设备列表配置改造-START****************************/
    Object.assign(this.cfListEnv.ajax.params, { resource_id, mold: 1 });//合并对象-ajax参数
    this.cfListEnv.fnHandleList = (list) => {//配置处理函数
      let arr_type_fixed = util.zhihuigeng.globalData.arr_type_env;//环境设备类型数组
      return this.fnHandleListOut({ list, arr_type_fixed })//
    }
    /****************************环境设备列表配置改造-END****************************/

    /****************************环境设备列表配置改造-START****************************/
    Object.assign(this.cfListControl.ajax.params, { resource_id, mold: 2 });//合并对象-ajax参数
    this.cfListControl.fnHandleList = (list) => {//配置处理函数
      let arr_type_fixed = util.zhihuigeng.globalData.arr_type_control;//控制设备类型数组
      return this.fnHandleListOut({ list, arr_type_fixed })//
    }
    /****************************环境设备列表配置改造-END****************************/

    /****************************摄像头设备列表配置改造-START****************************/
    Object.assign(this.cfListVedio.ajax.params, { resource_id, mold: 3 });//合并对象-ajax参数
    this.cfListVedio.fnHandleList = (list) => {//配置处理函数
      return this.fnHandleListOut({ list, arr_type_fixed: [10] })//
    }
    /****************************摄像头设备列表配置改造-END****************************/

    this.camera_url = lodash.get(this.doc, `camera.camera_url`);
    if (this.camera_url) {//如果第一个摄像头地址存在
      this.cfVedioMain.cfVedio.src = this.camera_url
    }





    this.ready = true;//是否准备好基础信息

  },
  mounted() {
    // alert(`mounted`);
    window.pageUrlEncode = this.pageUrlEncode





  }
};
</script>
<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
.out >>> .van-tab__pane {
  /**减去标题栏1，按钮栏，视频，tab栏的高度 ，注意小程序中是没有标题栏的（优先满足）*/
  height: calc( 100vh - 50px - 5rem - 45px );
    overflow-y: auto;
}


.n-flex-ul > li {
  padding: 6px 0;
}

.n-flex-ul > li > b {
  width: 90px;
}

.banner-box {
  width: 10rem;
  height: 5rem;

  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>



