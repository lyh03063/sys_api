//#region 基本配置
window.PUB = window.PUB || {}


PUB.domain = "https://www.dmagic.cn"
if (document.URL.startsWith(`http://localhost`)) {//如果是本地网址
  PUB.domain = "http://localhost:3000"
}

PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=dmagic";




const listHome = { template: '<dm_manage_home></dm_manage_home>' }
const list_common = { template: '<dm_list_common></dm_list_common>' }
const modify_password = { template: '<dm_modify_password></dm_modify_password>' }
const detail_audio = { template: '<dm_detail_audio></dm_detail_audio>' }
const group_audio = { template: '<dm_group_audio></dm_group_audio>' }

PUB.arrRouteListPage = [
  { path: 'listHome', component: listHome },
  { path: 'list_common', component: list_common },
  { path: 'modify_password', component: modify_password },
]








let arrRouteZhihuigeng = [//智慧耕子路由数组
  { path: 'home', component: () => import("@/page/site_m/home") },
  { path: 'icons', component: () => import("@/page/site_m/icons") },
  { path: 'list_asset_cate', component: () => import("@/page/site_m/list_asset_cate") },
  { path: 'list_asset', component: () => import("@/page/site_m/list_asset") },
  { path: 'list_device_cate', component: () => import("@/page/site_m/list_device_cate") },
  { path: 'list_device', component: () => import("@/page/site_m/list_device") },
  { path: 'list_device_strategy', component: () => import("@/page/site_m/list_device_strategy") },
  { path: 'detail_asset', component: () => import("@/page/site_m/detail_asset") },
  { path: 'login',  component: () => import("@/page/site_m/login") },
  { path: 'register',  component: () => import("@/page/site_m/register") },
  { path: 'device_modify', component: () => import("@/page/site_m/device_modify") },
  { path: 'asset_add_modify', component: () => import("@/page/site_m/asset_add_modify") },
  { path: 'asset_bind_device', component: () => import("@/page/site_m/asset_bind_device") },
  { path: 'strategy_add_modify', component: () => import("@/page/site_m/strategy_add_modify") },
  { path: 'user/index', component: () => import("@/page/site_m/user/index") },
]


//常量：{分组列表全局组件}
const detail_group = { template: '<dm_detail_group></dm_detail_group>' }
const auto_layout = { template: '<dm_auto_layout></dm_auto_layout>' }
const detail_bankruptcy_case = { template: '<dm_detail_bankruptcy_case></dm_detail_bankruptcy_case>' }

//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: detail_group },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_audio', component: detail_audio },
{ path: '/group_audio', component: group_audio },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
{ path: '/detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
{ path: '/open/auto_layout', component: auto_layout },
{
  path: '/study_home', component: () => import("@/page/study_home"),
  children: [//子路由
    { path: 'detail_group', component: detail_group },
    { path: 'auto_layout', component: auto_layout },
    { path: 'study_user', component: () => import("@/page/study_user") },
    { path: 'search_result', component: () => import("@/page/search_result") },
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
    ...PUB.arrRouteListPage 
  ]
},
{
  path: '/group_home/:gid', component: () => import("@/page/group_home"),
  children: [//子路由
    { path: 'detail_group', component: detail_group },
    { path: 'study_user', component: () => import("@/page/study_user") },
    { path: 'search_result', component: () => import("@/page/search_result") },
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
    ...PUB.arrRouteListPage 
  ]
},
{
  path: '/system/:sysId/', component: () => import("@/page/system/system"), redirect: 'manage',
  children: [//子路由
    { path: 'login', component: () => import("@/login") },
    {
      path: 'manage', component: () => import("@/page/system/manage"),
      children: [//子路由
        { path: 'detail_group', component: detail_group },
        { path: 'search_result', component: () => import("@/page/search_result") },
        { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
        { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
        ...PUB.arrRouteListPage ,
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
    { path: 'detail_bankruptcy_case', component: detail_bankruptcy_case },//案件详情
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
      readyBase: false,//是否准备好基础资源
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
      console.log(`$ajax####`);

      //请求接口
      let { data } = await this.$ajaxBase(params);
      let { code, msg } = data;

      let { fullPath, name } = this.$route
      if (params.url == "/user/login") {//登录接口特殊处理
        return data//注意返回一级data,具体在登录页自行处理
      }

      if (code != 0) {//如果{code}不为0
        console.warn(`服务异常！！！！！！${code},${msg}`);

        let prePageInfo = {
          fullPath, code, msg
        }
        //注意这个跳转应该要判断code
        if (code >= 400001) {//Q1:400001以上的异常,跳转到登录页
          this.$router.replace({ path: 'login', query: { ...prePageInfo } });//跳转登录页
        } else { //Q2:其他异常
          if (code != 300013) {//	请先升级为商家用户--先不提示
            this.$notify(msg);//警告信息
          } 
          
        }

        return false

      } else {
        return data.data||data//注意返回2级data，如果没有2级的就返回一级的，有点坑啊！！！！
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
        if (count >= 8) {//如果大于8次
          return data
        } else {//否则
          await util.timeout(2000); //延迟
          return this.rollQuery(uuid, count)//递归***
        }
      } else {//Q2：指令下发失败或成功
        return data
      }
    },
    async loadNecessary() {//函数：{加载必要的静态资源函数}
      await util.loadCss({ url: PUB.urlCss.vant })
      await util.loadCss({ url: PUB.urlCss.zhihuigeng })

      await util.loadJs({ url: PUB.urlJS.md5 })//加载md5

      await util.loadJs({ url: PUB.urlJS.wxJsSDK })
      await util.loadJs({ url: PUB.urlJS.vant })//有赞
      this.checkWxEnv()//调用：{判断微信小程序环境函数}
      this.readyBase = true;




      if (this.afterReadyBase) {//如果{后续执行的函数存在}
        this.afterReadyBase()//****执行 */
      }



    },

    //执行登录的函数
    async goLogin(params) {

      let {phone_num,password}=params
      // let { phone_num, password } = this.formData
      password = md5(password)//密码进行md5加密
      //请求接口
      let data = await this.$ajax({ url: `/user/login`, data: { phone_num, password } });
      let { code, msg } = data;
      if (code != 0) {//如果登录失败
        return this.$toast(msg);
      }

      let userInfo = data.data;//2级data
      
      this.userInfo = userInfo;
      if (userInfo) {//将用户信息写入公共变量和本地存储
        util.zhihuigeng.globalData.userInfo = userInfo;
        util.setLocalStorageObj("zhihuigeng_userInfo", userInfo)//调用：{设置一个对象到LocalStorage}
        localStorage.zhihuigeng_user=userInfo.phone_num;//用户名单独存储，登录表单要用
      }
      this.urlFrom=this.urlFrom||"home"
      if (this.urlFrom) {
        this.$router.replace({ path: this.urlFrom });//跳转到来源页
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


    },
     //函数：{头像加载失败的处理函数}
     headError:  function(ev) {
      ev.target.src=util.zhihuigeng.img.headPlaceholder//加入占位图
    },
     //函数：{普通图片加载失败的处理函数}
     imgError:  function(ev) {
      console.log(`imgError#############`);
      ev.target.src=util.zhihuigeng.img.imgPlaceholder//加入占位图
    },

  },
  async created() {




    let { pre_page } = this.$route.query;
    this.pre_page = pre_page;
    this.userInfo = util.getLocalStorageObj("zhihuigeng_userInfo")//调用：{从LocalStorage获取一个对象的函数}
    if (this.userInfo) {//如果用户信息存在
      util.zhihuigeng.globalData.userInfo = this.userInfo
    }


    this.loadNecessary()//调用：{加载必要的静态资源函数}

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
          this.$toast('操作失败，超时！');
        } else {
          this.$toast('操作失败');
          item.is_open = !item.is_open; item.is_open = !item.is_open;//联系更改两次来取消loading
        }
      }
      item.loading = false

      delete item.loading//清除loading
       
    },

  },
  async created() {
  }
}




export default {}