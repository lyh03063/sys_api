//#region 基本配置
window.PUB = window.PUB || {}


PUB.domain = "https://www.dmagic.cn"
if (document.URL.startsWith(`http://localhost`)) {//如果是本地网址
  PUB.domain = "http://localhost:3000"
}

PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=dmagic";





PUB.arrRouteListPage = PUB.arrRouteListName.map((item) => {
  return {
    path: `${item}`,///
    component: () => import(`@/page/${item}`)
  }
})


PUB.arrRouteListPageNew = PUB.arrRouteListName.map((item) => {
  return {
    path: `${item}`,//没有斜杠
    component: () => import(`@/page/${item}`)
  }
})




PUB.arrRouteListPageForStudy = PUB.arrRouteListName.map((item) => {
  return {
    path: `${item}`,
    component: () => import(`@/page/${item}`)
  }
})



let arrRouteZhihuigeng = [//智慧耕子路由数组
  { path: 'home', component: () => import("@/page/site_m/home") },
  { path: 'icons', component: () => import("@/page/site_m/icons") },
  { path: 'list_asset_cate', component: () => import("@/page/site_m/list_asset_cate") },
  { path: 'list_asset', component: () => import("@/page/site_m/list_asset") },
  { path: 'list_device_cate', component: () => import("@/page/site_m/list_device_cate") },
  { path: 'list_device', component: () => import("@/page/site_m/list_device") },
  { path: 'list_device_strategy', component: () => import("@/page/site_m/list_device_strategy") },
  { path: 'detail_asset', component: () => import("@/page/site_m/detail_asset") },
  { path: 'login', name: "zhihuigeng_login", component: () => import("@/page/site_m/login") },
  { path: 'device_modify', component: () => import("@/page/site_m/device_modify") },
  { path: 'asset_add_modify', component: () => import("@/page/site_m/asset_add_modify") },
  { path: 'asset_bind_device', component: () => import("@/page/site_m/asset_bind_device") },
  { path: 'strategy_add_modify', component: () => import("@/page/site_m/strategy_add_modify") },
  { path: 'user/index', component: () => import("@/page/site_m/user/index") },
]


//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: () => import("@/page/detail_group") },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
{ path: '/detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
{
  path: '/study_home', component: () => import("@/page/study_home"),
  children: [//子路由
    { path: 'detail_group', component: () => import("@/page/detail_group") },
    { path: 'study_user', component: () => import("@/page/study_user") },
    { path: 'search_result', component: () => import("@/page/search_result") },
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
    ...PUB.arrRouteListPageForStudy
  ]
},
{
  path: '/group_home/:gid', component: () => import("@/page/group_home"),
  children: [//子路由
    { path: 'detail_group', component: () => import("@/page/detail_group") },
    { path: 'study_user', component: () => import("@/page/study_user") },
    { path: 'search_result', component: () => import("@/page/search_result") },
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
    ...PUB.arrRouteListPageForStudy
  ]
},
{
  path: '/system/:sysId/', component: () => import("@/page/system/system"), redirect: 'manage',
  children: [//子路由
    { path: 'login', component: () => import("@/login") },
    {
      path: 'manage', component: () => import("@/page/system/manage"),
      children: [//子路由
        { path: 'detail_group', component: () => import("@/page/detail_group") },
        { path: 'search_result', component: () => import("@/page/search_result") },
        { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
        { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
        ...PUB.arrRouteListPageNew,
        ...arrRouteZhihuigeng,
      ]

    },


  ]
},
{
  path: '/site/:sysId/', component: () => import("@/page/site/main"),
  // path: '/site/:sysId/list_course', component: () => import("@/page/site/home"),
  children: [//子路由
    { path: 'login', component: () => import("@/login") },
    { path: 'home', component: () => import("@/page/site/home") },
    { path: 'list_course', component: () => import("@/page/site/list_course") },
  ]
},
{
  path: '/site_m/:sysId/', component: () => import("@/page/site_m/main"),
  children: [//子路由
    ...arrRouteZhihuigeng,
  ]
},
]
//#endregion



//#endregion



MIX.zhihuigeng_page_list = {
  components: {
    list_data_zhihuigeng: () => import("@/page/site_m/zhihuigeng/components/list_data_zhihuigeng.vue"),
  },
  data() {
    return {

    };
  },

  methods: {


  },
  async created() {
  }
}

MIX.zhihuigeng_base = {
  data() {
    return {
      hashBase: "#/site_m/zhihuigeng/",
      userInfo: null,
      inWxMiniProgram: true,//在微信小程序内
      debugText: "",
    };
  },
  computed: {
    pageUrlEncode() {
      let path = this.$route.fullPath;
      return encodeURIComponent(path);//进行url编码

    },
  },

  methods: {
    //函数：{标题栏返回按钮点击函数}
    onClickLeft() {
      if (this.pre_page) {//如果pre_page存在
        return this.$router.push({ path: this.pre_page, });//跳转上一个页面
      }
      this.$router.back()//路由回退
    },
    $ajaxBase: util.zhihuigeng.ajax,//基础ajax
    //函数：{智慧耕ajax函数}
    $ajax: async function (params) {

      //请求接口
      let { data } = await this.$ajaxBase(params);
      let { code, msg } = data;

      let { fullPath, name } = this.$route
      if (name == "zhihuigeng_login") {//登录页特殊处理
        return data//注意返回一级data,具体在登录页自行处理
      }

      if (code != 0) {//如果{code}不为0
        // alert(`服务异常`);
        console.warn(`服务异常！！！！！！${code},${msg}`);

        let prePageInfo = {
          fullPath, code, msg
        }
        //注意这个跳转应该要判断code
        if (code >= 400001) {//Q1:400001以上的异常
          this.$router.replace({ path: 'login', query: { ...prePageInfo } });//跳转登录页
        } else { //Q2:其他异常

          this.$notify(msg);//警告信息
        }

        return false

      } else {
        return data.data//注意返回2级data
      }
    },
    // $ajax: util.zhihuigeng.ajax,
    //函数：{返回数据字典标签函数}
    $dictLable(key, val) {
      return util.getDictLabel(key, val)
    },

    async rollQuery(uuid, count = 1) {//函数：{轮询指令设置结果函数}
      count++
      console.warn(`轮询第${count}次`);
      let { data } = await this.$ajaxBase({ url: `/roll/polling_result`, data: { uuid } });
      if (data.code === 100001) {//Q1：指令下发中
        if (count >= 15) {//如果大于15次
          return data
        } else {//否则
          await util.timeout(2000); //延迟
          return this.rollQuery(uuid, count)//递归***
        }
      } else {//Q2：指令下发失败或成功
        return data
      }
    },



    checkWxEnv: function () { //函数：{判断微信小程序环境函数}

      this.debugText += `----geWxEnv`
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        this.debugText += `----geWxEnv-2`
        //ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
        wx.miniProgram.getEnv((res) => {
          this.debugText += `----geWxEnv-3`
          if (res.miniprogram) {
            this.inWxMiniProgram = res.miniprogram
          }
        })
      } else {
        this.inWxMiniProgram = false
      }


    }
  },
  async created() {
    $.cachedScript("//res.wx.qq.com/open/js/jweixin-1.3.2.js")
      .done(() => {
        this.checkWxEnv()//调用：{判断微信小程序环境函数}
      })



    // window.document.title="智慧耕"
    let { pre_page } = this.$route.query;
    this.pre_page = pre_page;
    this.userInfo = util.getLocalStorageObj("zhihuigeng_userInfo")//调用：{从LocalStorage获取一个对象的函数}
    if (this.userInfo) {//如果用户信息存在
      util.zhihuigeng.globalData.userInfo = this.userInfo
    }
  },
  mounted() {


  }
}



//设备卡片混入
MIX.zhihuigeng_card_device = {

  data() {
    return {

    };
  },
  computed: {
    arr_type_env() {
      return util.zhihuigeng.globalData.arr_type_env
    },
    arr_type_control() {
      return util.zhihuigeng.globalData.arr_type_control
    },
    getLink(item) {//注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}device_modify?equipment_id=${item.equipment_id}&equipment_name=${item.equipment_name}&pre_page=${this.pageUrlEncode}`
      }
    },
    getLinkStrategy(item) {//注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}list_device_strategy?equipment_id=${item.equipment_id}&pre_page=${this.pageUrlEncode}`
      }
    },
  },
  methods: {
    playVedio() {

      this.cfVedioPlay.cfVedio.src = this.item.camera_url
      this.showDialogVedio = true
    },


    async onInput(item) {
      //让状态先回退-进行Loading
      if (item.is_open == "1") {//
        item.is_open = "0"
      } else {
        item.is_open = "1"
      }
      // item.loading = true;
      this.$set(item, "loading", true);//这个要使用set方法，不然后面变成false时不响应


      let { equipment_id } = item;
      let cmd = 2;//变量：{指令}-开
      if (item.is_open == "1") {//如果y原来的状态是“开”
        cmd = 3;//关
      }
      let param = { equipment_id, cmd }
      let data = await this.$ajax({ url: `/device/send_cmd`, data: param });


      if (data) {//如果data存在
        let { uuid } = data;
        let dataRS = await this.rollQuery(uuid, 0)//调用：{轮询指令设置结果函数}
        if (dataRS.code === 0) {//如果调用成功
          //最终切换状态
          if (item.is_open == "1") {//
            item.is_open = "0"
          } else {
            item.is_open = "1"
          }


          let text2 = '关闭成功'
          if (item.is_open == "1") {
            text2 = '开启成功'
          }
          this.$toast(`${item.equipment_name}${text2}`);//
        } else if (dataRS.code === 100001) {
          this.$toast('操作失败，超时111111');
        } else {
          this.$toast('操作失败');
          item.is_open = !item.is_open; item.is_open = !item.is_open;//联系更改两次来取消loading
        }
      }
      item.loading = false

      delete item.loading//清除loading
        ;
    },

  },
  async created() {
  }
}




export default {}