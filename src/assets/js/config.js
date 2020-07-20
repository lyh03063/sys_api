//#region 基本配置
window.PUB = window.PUB || {}


PUB.domain = "https://www.dmagic.cn"
if (document.URL.startsWith(`http://localhost`)) {//如果是本地网址
  PUB.domain = "http://localhost:3000"
}

PUB.urlGetQiniuToken = PUB.domain + "/api_third_part/get_qiniu_token?scope=dmagic";

PUB._paramAjaxAddon = { _systemId: "sys_api" }


const listHome = { template: '<dm_manage_home></dm_manage_home>' }
const list_common = { template: '<dm_list_common></dm_list_common>' }
const modify_password = { template: '<dm_modify_password></dm_modify_password>' }
const detail_audio = { template: '<dm_detail_audio></dm_detail_audio>' }
const group_audio = { template: '<dm_group_audio></dm_group_audio>' }
const detail_data = { template: '<dm_detail_data></dm_detail_data>' }

PUB.arrRouteListPage = [
  { path: 'listHome', component: listHome },
  { path: 'list_common', component: list_common },
  { path: 'modify_password', component: modify_password },
]





const zhy_main = { template: '<zhy_main></zhy_main>' }
const zhy_home = { template: '<zhy_home></zhy_home>' }
const zhy_icons = { template: '<zhy_icons></zhy_icons>' }
const zhy_list_asset_cate = { template: '<zhy_list_asset_cate></zhy_list_asset_cate>' }
const zhy_list_asset = { template: '<zhy_list_asset></zhy_list_asset>' }
const zhy_list_device_cate = { template: '<zhy_list_device_cate></zhy_list_device_cate>' }
const zhy_list_device = { template: '<zhy_list_device></zhy_list_device>' }
const zhy_list_device_bluetooth = { template: '<zhy_list_device_bluetooth></zhy_list_device_bluetooth>' }
const zhy_list_device_strategy = { template: '<zhy_list_device_strategy></zhy_list_device_strategy>' }
const zhy_detail_asset = { template: '<zhy_detail_asset></zhy_detail_asset>' }
const zhy_login = { template: '<zhy_login></zhy_login>' }
const zhy_register = { template: '<zhy_register></zhy_register>' }
const zhy_device_modify = { template: '<zhy_device_modify></zhy_device_modify>' }
const zhy_asset_add_modify = { template: '<zhy_asset_add_modify></zhy_asset_add_modify>' }
const zhy_asset_bind_device = { template: '<zhy_asset_bind_device></zhy_asset_bind_device>' }
const zhy_device_bind_asset = { template: '<zhy_device_bind_asset></zhy_device_bind_asset>' }
const zhy_strategy_add_modify = { template: '<zhy_strategy_add_modify></zhy_strategy_add_modify>' }
const zhy_user_index = { template: '<zhy_user_index></zhy_user_index>' }
const zhy_user_info = { template: '<zhy_user_info></zhy_user_info>' }
const zhy_user_modify_nickname = { template: '<zhy_user_modify_nickname></zhy_user_modify_nickname>' }
const zhy_user_modify_avatar = { template: '<zhy_user_modify_avatar></zhy_user_modify_avatar>' }



let arrRouteZhihuigeng = [//智慧耕子路由数组
  { path: 'home', component: zhy_home },
  { path: 'icons', component: zhy_icons },
  { path: 'list_asset_cate', component: zhy_list_asset_cate },
  { path: 'list_asset', component: zhy_list_asset },
  { path: 'list_device_cate', component: zhy_list_device_cate },
  { path: 'list_device', component: zhy_list_device },
  { path: 'list_device_bluetooth', component: zhy_list_device_bluetooth },
  { path: 'list_device_strategy', component: zhy_list_device_strategy },
  { path: 'detail_asset', component: zhy_detail_asset },
  { path: 'login', component: zhy_login },
  { path: 'register', component: zhy_register },
  { path: 'device_modify', component: zhy_device_modify },
  { path: 'asset_add_modify', component: zhy_asset_add_modify },
  { path: 'asset_bind_device', component: zhy_asset_bind_device },
  { path: 'device_bind_asset', component: zhy_device_bind_asset },
  { path: 'strategy_add_modify', component: zhy_strategy_add_modify },
  { path: 'user/index', component: zhy_user_index },
  { path: 'user/user_info', component: zhy_user_info },
  { path: 'user/modify_nickname', component: zhy_user_modify_nickname },
  { path: 'user/modify_avatar', component: zhy_user_modify_avatar },
]


//常量：{分组列表全局组件}
const detail_group = { template: '<dm_detail_group></dm_detail_group>' }
const auto_layout = { template: '<dm_auto_layout></dm_auto_layout>' }
const detail_bankruptcy_case = { template: '<dm_detail_bankruptcy_case></dm_detail_bankruptcy_case>' }


const search_result = { template: '<search_result></search_result>' }
const detail_g_card_link = { template: '<detail_g_card_link></detail_g_card_link>' }
const detail_group_g_card = { template: '<detail_group_g_card></detail_group_g_card>' }
const group_home = { template: '<group_home></group_home>' }
const study_collect = { template: '<study_collect></study_collect>' }
const study_home = { template: '<study_home></study_home>' }
const study_user = { template: '<study_user></study_user>' }

const dm_system = { template: '<dm_system></dm_system>' }
const site_home = { template: '<site_home></site_home>' }
const site_list_course = { template: '<site_list_course></site_list_course>' }
const site_main = { template: '<site_main></site_main>' }
const dm_manage_base = { template: '<dm_manage_base></dm_manage_base>' }
const dm_login = { template: '<dm_login></dm_login>' }


const dm_manage = { template: '<dm_manage></dm_manage>' }
//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: detail_group },
{ path: '/detail_data', component: detail_data },
{ path: '/detail_audio', component: detail_audio },
{ path: '/group_audio', component: group_audio },
{ path: '/detail_group_g_card', component: detail_group_g_card },
{ path: '/detail_g_card_link', component: detail_g_card_link },
{ path: '/open/auto_layout', component: auto_layout },
{
  path: '/study_home', component: study_home,
  children: [//子路由
    { path: 'detail_group', component: detail_group },
    { path: 'auto_layout', component: auto_layout },
    { path: 'study_user', component: study_user },
    { path: 'search_result', component: search_result },
    { path: 'detail_group_g_card', component: detail_group_g_card },
    { path: 'detail_g_card_link', component: detail_g_card_link },
    ...PUB.arrRouteListPage
  ]
},
{
  path: '/group_home/:gid', component: group_home,
  children: [//子路由
    { path: 'detail_group', component: detail_group },
    { path: 'study_user', component: study_user },
    { path: 'search_result', component: search_result },
    { path: 'detail_group_g_card', component: detail_group_g_card },
    { path: 'detail_g_card_link', component: detail_g_card_link },
    ...PUB.arrRouteListPage
  ]
},
{
  path: '/system/:sysId/', component: dm_system, redirect: 'manage',
  children: [//子路由
    { path: 'login', component: dm_login },
    { path: 'detail_data', component: detail_data },
    {
      path: 'manage', component: dm_manage,//dm_manage_base
      children: [//子路由
        { path: 'detail_group', component: detail_group },
        { path: 'search_result', component: search_result },
        { path: 'detail_group_g_card', component: detail_group_g_card },
        { path: 'detail_g_card_link', component: detail_g_card_link },
        { path: 'detail_data', component: detail_data },
        ...PUB.arrRouteListPage,
        ...arrRouteZhihuigeng,
      ]

    },


  ]
},
{
  path: '/site/:sysId/', component: site_main,
  children: [//子路由
    { path: 'login', component: dm_login },
    { path: 'home', component: site_home },
    { path: 'list_course', component: site_list_course },
    { path: 'detail_bankruptcy_case', component: detail_bankruptcy_case },//案件详情
  ]
},
{
  path: '/site_m/:sysId/', component: zhy_main,
  children: [//子路由
    ...arrRouteZhihuigeng,
  ]
},
]
//#endregion



//#endregion











export default {}