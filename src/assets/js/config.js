//#region 基本配置
window.PUB = window.PUB || {}
PUB.domain$$$$$$$$$$$$$$$$ = "http://localhost:3000"
PUB.domain = "https://www.dmagic.cn"
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
  { path: 'login', component: () => import("@/page/site_m/login") },
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



MIX.page_list_zhihuigeng = {
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






export default {}