Vue.config.productionTip = false
window.lodash = lodash
Vue.prototype.$lodash = lodash//让vue实例中可访问$store
window.axios = axios;
import moment from "moment";
window.moment = moment;
import "@/assets/js/config.js";
import "@/components/registComponents.js";//引入注册全局组件


import "@/assets/css/util.scss"; //导入公共样式文件
Vue.use(VueRouter)
import manage from "@/manage";

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
      redirect: 'listHome', //跳转
      children: [//子路由
        ...PUB.arrRouteListPage,
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {

  let systemId = to.params.sysId || from.params.sysId || PUB._systemId;//***获取地址上的_systemId
  let $sys = util.getLocalStorageObj(systemId); //调用：{从LocalStorage获取一个对象的函数}
  PUB.keyPower = `${systemId}_power`;

  
  window.rolePower = util.getLocalStorageObj(PUB.keyPower);

  // 如果用户未登录，跳转登录页面
  if ($sys.isLogin != 1) {//Q1：未登录
    if (to.path.includes('/site/') || to.path.includes('/site_m/')|| to.path.includes('/open/')) {//QK1：to路径中包含/site/表示网站首页
      next();
    } else if (to.path.includes('login')) {//QK2：to路径中包含login
      next();
    } else {//QK3：to路径中包含login

      PUB.goUrlAfterLogin = to.fullPath//变量赋值：{登录后要跳转的地址}
      if (systemId == "sys_api") {//QKK1:是sys_api系统
        next('login');
      } else { //QKK2:否则
        next(`/system/${systemId}/login`);
      }


    }
  } else {//Q2：已登录
    PUB.goUrlAfterLogin = null//变量赋值：{登录后要跳转的地址}
    next();
  }
})


import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')