Vue.config.productionTip = false
window.lodash = lodash
Vue.prototype.$lodash = lodash//让vue实例中可访问$store
import axios from "axios";
window.axios = axios;
import ajax from "@/assets/js/ajax.js";
window.ajax = ajax;
import moment from "moment";
window.moment = moment;
import "@/assets/js/config.js";
import "@/assets/css/util.scss"; //导入公共样式文件
Vue.use(VueRouter)
import manage from "@/manage";
let arrRouteListName = PUB.arrRouteListName
let arrRouteListPage = arrRouteListName.map((item) => {
  return {
    path: `/${item}`,
    component: () => import(`@/page/${item}`)
  }
})
// window.util=util;
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import("@/login") },
    ...PUB.arrRouteAddon,//附加的一级路由
    {
      path: '/manage',
      component: manage,
      redirect: '/listHome', //跳转
      children: [//子路由
        ...arrRouteListPage,
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // 如果用户未登录，跳转登录页面
  if (localStorage[PUB.keyIsLogin] != 1) {
    if (to.path == '/login') {
      next();
    } else {
      PUB.goUrlAfterLogin = to.fullPath//变量赋值：{登录后要跳转的地址}
      next('/login');
    }
  } else {
    PUB.goUrlAfterLogin = null//变量赋值：{登录后要跳转的地址}
    next();
  }
})
const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    debug: false,
    activeMenuIndex: "",//当前激活的菜单index
    listState: {//存放列表的共享状态，
    },
    defultFindJson: {//存放列表的默认查询参数，
      // list_article:{articleCategory:3  }
    },
    arrLookup: {//存放列表的联合查询参数值，
      // list_article:{articleCategory:3  }
    },
  },
  mutations: {//变更事件
    setDebug(state, param) {//设置debug模式
      state.debug = param;
    },
    setListArrLookup(state, param) {//设置列表的联合查询参数值
      state.arrLookup[param.listIndex] = param.arrLookup;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      state.arrLookup = lodash.cloneDeep(state.arrLookup);  //深拷贝
    },
    setListFindJson(state, param) {//设置列表的初始筛选参数值
      state.defultFindJson[param.listIndex] = param.findJson;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.defultFindJson)//对象转换成字符串
      state.defultFindJson = JSON.parse(str)//字符串转换成对象
    },
    initListState(state, param) {//改变列表的初始状态值
      state.listState[param.listIndex] = param.objState;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.listState)//对象转换成字符串
      state.listState = JSON.parse(str)//字符串转换成对象
    },
    changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
      state.activeMenuIndex = activeMenuIndex
    },
    openDialogAdd(state, listIndex) {//打开新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = true;
    },
    closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = false;
    },
    openDialogDetail(state, param) {//打开详情弹窗事件
      state.listState[param.listIndex].isShowDialogDetail = true;
      state.listState[param.listIndex].row = param.row;//将行数据保存到vuex
    },
    closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
      state.listState[listIndex].isShowDialogDetail = false;
    },
  }
})
Vue.prototype.$store = store//让vue实例中可访问$store
Vue.prototype.$handelItem = util.handelItem//让vue实例中可访问$handelItem
import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')