

//#region 基本配置
window.PUB = window.PUB || {}
//PUB.domain = "http://localhost:3000"
PUB.domain = "https://www.dmagic.cn"
//PUB.domain = 'http://test.dmagic.cn'









//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: () => import("@/page/detail_group") },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
{ path: '/detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
{
  path: '/study_home', component: () => import("@/page/study_home"),
  children: [//子路由
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
  ]
},]
//#endregion


PUB.arrListName.forEach(itemEach => {//循环：{列表模块名数组}
  import(`@/assets/js/config/list_${itemEach}.js`);
})


// PUB.arrDetailGroupMoudles.forEach(itemEach=>{//循环：{分组数据列表模块名数组}
//   import(`@/assets/js/config/detail_group/detail_group_${itemEach}.js`);
// })

//#region 列表模块名数组配置 


//#region 列表模块名数组配置
PUB.arrListName = ["html_api", "html_api_category", "css_api", "css_api_category", "js_api",
  "js_api_category", "familiarity", "exercises", "front_demo"];
//#endregion



//#endregion
//#region 分组下的案例列表页
{
  let _dataType = "relation";


  PUB.listCF.detail_group_front_demo = {
    isShowBreadcrumb: false, //面包屑
    isShowSearchForm: false, //查询表单-
    idKey: "_id", //键名
    pageSize: 20,
    listIndex: "detail_group_front_demo", //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦

    // ...PUB.listCFCommon,//展开公共配置
    ...PUB.listCFCommon3, //展开公共配置
    singleBtns: PUB.singleBtns_copy_detail_sort,
    batchBtns: {
      addon: [
        { uiType: "slot", slot: "slot_btn_select" },
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,

      ],
    },
    sortJsonDefault: {
      "sort": -1
    },
    findJsonDefault: {

    },
    objParamAddon: {
      findJson: {},

      _systemId,
      _dataType
    },
    //公共的附加参数，针对所有接口
    paramAddonPublic: {
      _systemId,
      _dataType
    },

    //-------列配置数组-------
    columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link, COLUMNS.sort],

    //-------筛选表单字段数组-------
    searchFormItems: [],
    //-------详情字段数组-------
    detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
    //-------新增、修改表单字段数组-------
    formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]

  }

}
//#endregion

export default {}