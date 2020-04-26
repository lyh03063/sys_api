//#region 基本配置
window.PUB = window.PUB || {}
PUB.domain = "http://localhost:3000"
PUB.domain$$$$$$$$$$$$$$$$ = "https://www.dmagic.cn"
//PUB.domain = 'http://test.dmagic.cn'



//#region getLocalStorageObj:从LocalStorage获取一个对象的函数
util.getLocalStorageObj = function (key) {
  if (!localStorage[key]) return false;

  try {
    return JSON.parse(localStorage[key]);
  } catch (err) {
    return { error: "没有获取对应的localStorage" }
  }



}
//#endregion


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
]
//#endregion

PUB.cfForm = PUB.cfForm || {}
PUB.cfForm.watch = PUB.cfForm.watch || {}
PUB.cfForm.watch.file = {
  //传入监听器
  file(newVal, oldVal) {
    if (!(newVal && newVal.length)) return;//如果不是有效数组，退出
    let doc = lodash.get(newVal, `[0]`)
    let { name } = doc
    console.log(`doc:`, doc);
    if (!this.value.title) {//如果标题是空
      this.value.title = name;
    }
  }
}


PUB.arrGroupMoudlesSpe = [
  // "group"
]




PUB.$sys = PUB.$sys || util.getLocalStorageObj(PUB._systemId) || {}; //调用：{从LocalStorage获取一个对象的函数}

MIX.base = {
  data() {
    return {
    };
  },
  computed: {
    $sys() {
      let systemId = this.$route.params.sysId || PUB._systemId;//变量：{当前系统Id}
      let sys = util.getLocalStorageObj(systemId) || {}//调用：{从LocalStorage获取一个对象的函数}
      sys.env = PUB.domain == "https://www.dmagic.cn" ? "pro" : "dev";
      return sys
    },
  },
  methods: {
    //函数：{根据权限路径返回当前用户权限的函数}
    $power(powerPath) {
      return lodash.get(WIN.rolePower, `${powerPath}`);
    },
    //函数：{返回数据字典标签函数}
    $dictLable(key, val) {
      return util.getDictLabel(key, val)
    },
  },
  async created() {
  }
}
//#endregion

//#region 列表模块名数组配置
PUB.arrListName = [
  "html_api", "html_api_category", "css_api", "css_api_category", "js_api", "js_api_category", "familiarity",
  "exercises", "score", "front_demo", "task", "file", "image", "file_base", "person",
  "resume", "goods", "system", "order", "order_offline", "user", "project_case", "data_item"
];
//#endregion


//变量：{查看实体数据详情按钮}
util.cfList.sBtns.goSystem = {
  uiType: "link",
  text: "进入系统",
  target: "_blank",
  //地址格式函数
  urlFormatter: function (row) {
    return `#/system/${row.systemId}/manage/listHome`;
  },
};


//#region 订单商品说明
{
  let prop = "orderGoodsDesc", objBase = { label: "商品说明", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 270, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


F_ITEMS.addressObj = {
  col_span: 24, //控制显示一行多列
  label: "收货地址", prop: "addressObj",
  default: {}, //默认值必须要有，否则新增的时候会出问题
  cfForm: {
    col_span: 12, //控制显示一行多列
    formItems: [
      {
        label: "省市区", valueType: "arrObj", prop: "arrArea", type: "select_area"
      },
      {
        label: "详细地址",
        prop: "detail"
      },
    ]
  }
};

//#region 0000
{
  let prop = "aaaa", objBase = { label: "0000", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion
//#region 0000
{
  let prop = "aaaa", objBase = { label: "0000", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion




//#endregion

//#region 网址列表页


{
  let _dataType = "url";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "网址" }],
    ...PUB.listCFCommon3,//展开公共配置
    //objParamAddon列表接口的附加参数
    // singleBtns:PUB.singleBtns_copy_link_sort,
    objParamAddon: { _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

    //-------详情字段数组-------
    detailItems: ["title", "desc", "link"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "link", "desc", "album"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}

//#endregion





//#region 分组列表页
{
  let _dataType = "group";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "分组" }],
    ...PUB.listCFCommon,//展开公共配置
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...util.cfList.sBtns.arrAllBtns,
        {
          uiType: "link",
          text: "分组详情",
          target: "_blank",
          url: "#/detail_group?groupId=" //这里要配置好参数名，内部会把参数加进来
        }
      ]
    },
    objParamAddon: { _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

    //-------详情字段数组-------
    detailItems: ["_id", "title", "alias", "desc", "group_dataType"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "alias", "desc", "group_dataType"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "group_dataType", "alias"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "alias", "group_dataType", "iconSrc", "desc"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}
//#endregion






//#region 笔记列表页
{
  let _dataType = "note";
  let listIndex = `list_${_dataType}`
  PUB.listCF[listIndex] = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex, //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "笔记" }],
    ...PUB.listCFCommon2,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
        // { uiType: "slot", slot: "slot_in_toolbar" },
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.note_category
    ],
    //objParamAddon列表接口的附加参数//传入联表查询参数
    objParamAddon: { _dataType, arrLookup: [] },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _dataType },

    //操作列配置
    columnOperate: {
      "min-width": 210
    },


    //-------详情字段数组-------
    detailItems: ["title", "keyword", "detail", "desc", "category", "importance", "difficulty", "_id", "demoList", "note_linkList", "note_noteList"],
    //-------列配置数组-------
    columns: ["_id", "title_fixed_edit", "countGroup", "keyword_edit", "familiarity_select", "importance_edit", "difficulty_edit", "category_multiple", "demoList"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "note_category", "importance", "difficulty", "countGroup"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "link", "importance_radio", "difficulty_radio", "keyword", "note_category", "desc", "detail_paste", "_systemId"],
  }
  //调用：{改造列表字段配置形式的函数（字符串转对象）}
  util.reformCFListItem(PUB.listCF[listIndex])

}


//#endregion








//#region 分组下的分组列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_group"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.linkGroup
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    dynamicDict: [DYDICT.note_category], //dynamicDict动态数据字典配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "countData", "myScore", "group_dataType", "desc", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  //#endregion
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    dataType: "$targetDoc.dataType",
    countData: "$targetDoc.countData"
  }
}
//#endregion



//#region 分组下的笔记列表页
{

  let _dataType = "relation";
  let listIndex = "detail_group_note"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        ...PUB.cfListGPublic.batchBtns.addon,
        // { uiType: "slot", slot: "slot_in_toolbar" },
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
      ],
    },
    //列表单项操作按钮的配置
    // singleBtns: PUB.singleBtns_copy_detail_sort,
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //dynamicDict动态数据字典配置
    dynamicDict: [DYDICT.note_category],
    //-------详情字段数组-------
    detailItems: ["title", "detail", "desc", "category", "importance", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "familiarity_select", "importance", "difficulty", "category_multiple", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "importance", "difficulty",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    importance: "$targetDoc.importance", difficulty: "$targetDoc.difficulty"
  }

}
//#endregion


//#region 分组下的demo列表页
{
  let listIndex = "detail_group_front_demo"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.link
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion





//#region 分组下的任务列表页
{
  let listIndex = "detail_group_task"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    dynamicDict: [DYDICT.personCharge,],
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "complete_search", "prior", "personCharge",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    taskType: "$targetDoc.taskType", prior: "$targetDoc.prior", complete: "$targetDoc.complete",
    personCharge: "$targetDoc.personCharge", predictTime: "$targetDoc.predictTime", actualTime: "$targetDoc.actualTime",
  }
}
//#endregion






//#region 分组下的文件列表页
{
  let listIndex = "detail_group_file"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.download, util.cfList.sBtns.openFile,
      ]
    },

    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "file", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    file: "$targetDoc.file",
  }

}
//#endregion


//#region 分组下的图片列表页
{
  let listIndex = "detail_group_image"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.download,
        util.cfList.sBtns.openFile,
      ]
    },
    listIndex: "detail_group_image", //vuex对应的字段~
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["imagePreview", "title", "file", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    file: "$targetDoc.file",
  }

}
//#endregion

//#region 分组下的人员列表页
{
  let listIndex = "detail_group_person"
  let _dataType = "relation";
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic, listIndex, //vuex对应的字段~
    //列表单项操作按钮的配置
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["trueName", "phone", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["trueName_search", "phone"],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],


  }
  //需要补充的拆解字段****
  PUB.$projectAddon[listIndex] = {
    trueName: "$targetDoc.trueName", phone: "$targetDoc.phone",
  }


  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion



//#region 分组下的网址列表页
{
  let _dataType = "relation";
  let listIndex = "detail_group_url"
  PUB.listCF[listIndex] = {
    ...PUB.cfListGPublic,
    listIndex, //vuex对应的字段~
    singleBtns: {
      addon: [
        ...PUB.singleBtns_list_group_data.addon,
        util.cfList.sBtns.link
      ]
    },
    objParamAddon: { findJson: {}, _dataType },
    paramAddonPublic: { _dataType },//公共的附加参数，针对所有接口
    //dynamicDict动态数据字典配置
    dynamicDict: [DYDICT.note_category],
    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search",],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],
  }
  util.reformCFListItem(PUB.listCF[listIndex])
}
//#endregion



//#region 分组下的商品列表页
{
  let _dataType = "relation";


  PUB.listCF.detail_group_goods = {
    ...PUB.cfListGPublic,
    listIndex: "detail_group_goods", //vuex对应的字段~
    singleBtns: PUB.singleBtns_copy_detail_sort,


    objParamAddon: {
      findJson: {},
      _dataType
    },
    //公共的附加参数，针对所有接口
    paramAddonPublic: {
      _dataType
    },

    //-------详情字段数组-------
    detailItems: ["title", "desc", "countData", "_id", "_idRel", "_idRel2", "sort"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link", "sort"],
    //-------筛选表单字段数组-------
    searchFormItems: [],
    //-------新增、修改表单字段数组-------
    formItems: ["_idRel", "_idRel2", "sort"],



  }
  util.reformCFListItem(PUB.listCF.detail_group_goods)
}
//#endregion




//#region 菜单列表
//完整的菜单列表
PUB.menuList = [
  {
    //菜单
    index: "listHome",
    route: "listHome",
    icon: "el-icon-house",
    title: "首页"
  },
  {
    index: "apiCenter",
    icon: "el-icon-document",
    title: "API手册",
    menuItem: [
      {
        index: "list_html_api",
        // route: "list_html_api",
        route: "list_common?type=html_api",
        title: "Html-API"
      },
      {
        index: "list_css_api",
        // route: "list_css_api",
        route: "list_common?type=css_api",
        title: "Css-API"
      },
      {
        index: "list_js_api",
        // route: "list_js_api",
        route: "list_common?type=js_api",
        title: "Javascript-API"
      },
      {
        index: "list_note",
        // route: "list_note",
        route: "list_common?type=note",
        title: "笔记"
      },
      {
        index: "list_front_demo",
        route: "list_common?type=front_demo",
        title: "前端demo"
      },
      {
        index: "list_vedio",
        route: "list_common?type=vedio",
        title: "视频"
      },
      {
        index: "list_exercises",
        route: "list_common?type=exercises",
        title: "习题"
      },
      {
        index: "list_url",
        route: "list_common?type=url",
        title: "网址"
      }
    ]
  },
  {
    index: "otherData",
    icon: "el-icon-document",
    title: "其他数据",
    menuItem: [
      {
        index: "list_group",
        route: "list_common?type=group",
        title: "分组"
      },
      {
        index: "list_file",
        route: "list_common?type=file",
        title: "文件"
      },
      {
        index: "list_image",
        route: "list_common?type=image",
        title: "图片库"
      },
      {
        index: "list_file_base",
        route: "list_common?type=file_base",
        title: "基础文件信息"
      },
      {
        index: "list_score",
        route: "list_common?type=score",
        title: "记分项"
      },
      {
        index: "list_html_api_category",
        route: "list_common?type=html_api_category",
        title: "Html-API分类"
      },
      {
        index: "list_css_api_category",
        route: "list_common?type=css_api_category",
        title: "Css-API分类"
      },
      {
        index: "list_js_api_category",
        route: "list_common?type=js_api_category",
        title: "Javascript-API分类"
      },
      {
        index: "list_note_category",
        route: "list_common?type=note_category",
        title: "笔记分类"
      }
    ]
  },
  {
    index: "crm",
    icon: "el-icon-document",
    title: "客户管理",
    menuItem: [
      {
        index: "list_person",
        route: "list_common?type=person",
        title: "人员"
      },
      {
        index: "list_company",
        route: "list_common?type=company",
        title: "企业"
      },
    ]
  },
  {
    index: "projectManage",
    icon: "el-icon-document",
    title: "任务系统",
    menuItem: [
      {
        index: "list_task",
        route: "list_common?type=task",
        title: "任务"
      }
    ]
  },
  {
    index: "resumeSystem",
    icon: "el-icon-document",
    title: "简历系统",
    menuItem: [
      {
        index: "list_resume",
        route: "list_common?type=resume",
        title: "简历"
      },
      {
        index: "list_resume_project_experience",
        route: "list_common?type=resume_project_experience",
        title: "简历-项目经历"
      },
      {
        index: "list_resume_work_experience",
        route: "list_common?type=resume_work_experience",
        title: "简历-工作经历"
      },
      {
        index: "list_resume_education_experience",
        route: "list_common?type=resume_education_experience",
        title: "简历-教育经历"
      }
    ]
  },
  {
    index: "systemManage",
    icon: "el-icon-setting",
    title: "系统管理",
    menuItem: [
      {
        index: "list_system",
        route: "list_common?type=system",
        title: "系统表"
      },
      {
        index: "list_data_type",
        route: "list_common?type=data_type",
        title: "数据类型"
      },
      {
        index: "list_all",
        route: "list_common?type=all",
        title: "所有数据"
      },
      {
        index: "list_relation",
        route: "list_common?type=relation",
        title: "关系数据"
      },
      {
        index: "list_familiarity",
        route: "list_common?type=familiarity",
        title: "熟悉度"
      },
      {
        index: "list_admin",
        route: "list_common?type=admin",
        title: "管理员"
      },
      {
        index: "list_role",
        route: "list_common?type=role",
        title: "角色"
      },
      {
        index: "list_data_item",
        route: "list_common?type=data_item",
        title: "数据字段配置"
      }
    ]
  }
];
//#endregion
//调用：{初始化列表权限函数}
let fnInitList = async function () {
  //***循环异步-导入一些本站专用的数据列表配置，注意这里用map不能用forEach
  await Promise.all(PUB.arrListName.map(async itemEach => {//循环：{列表模块名数组}
    await import(`@/assets/js/config/list_${itemEach}.js`);
  }))
  //#region 【注意顺序】权限表单项，从菜单遍历拼接！！！
  let cfFormForPower = { labelWidth: "150px", formItems: [] }
  PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
    let { index: index_1, menuItem, title } = menuEach_1;
    let { formItems } = cfFormForPower
    let objMenu1 = {
      label: title,
      prop: index_1,
      style: styleMenuGPowerItem,
      default: {},
      cfForm: {
        col_span: 12,
        formItems: []
      }
    }
    if (!menuItem) return;
    menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
      let { index: index_2, title } = menuEach_2;
      if (!index_2) return;
      let objMenu2 = {
        prop: index_2,
        style: styleMenuPowerItem,
        cfForm: getFormMenuGPower({ menuName: title })
      }
      objMenu1.cfForm.formItems.push(objMenu2)
    })
    formItems.push(objMenu1)
  })
  //【】加入分组数据列表的权限选项*****
  cfFormForPower.formItems.push(
    {
      label: '分组数据列表',
      prop: "groupDataList",
      style: styleMenuGPowerItem,
      default: {},
      cfForm: {
        col_span: 12,
        formItems: [
          {
            prop: "all",
            style: styleMenuPowerItem,
            cfForm: getFormMenuGPower({ menuName: "所有分组数据" })
          }
        ]
      }
    }
  )
  let rolePower = {
    ...D_ITEMS.rolePower,
    default: {},
    cfForm: cfFormForPower
  };
  //****这里通过合并而不是直接赋值，来影响引进引用了F_ITEMS.rolePower的列表页配置
  Object.assign(F_ITEMS.rolePower, rolePower);//合并对象
  //#endregion
  //#region 【注意位置】菜单项批量添加权限路径
  PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
    let { index: index_1, menuItem } = menuEach_1;
    if (!menuItem) return;
    menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
      let { index: index_2 } = menuEach_2;
      if (!index_2) return;
      lodash.set(PUB.listCF, `${index_2}.powerPath`, `${index_1}.${index_2}`);//设置权限路径
    })
  })
  //变量：{分组数据列表页面配置名称数组}
  let arrGroupName = ["detail_group_front_demo", "detail_group_note", "detail_group_url", "detail_group_vedio", "aaaa", "aaaa", "aaaa",]
  //*** */
  arrGroupName.forEach(nameEach => {//循环：{分组数据列表页面配置名称数组}
    if (!PUB.listCF[nameEach]) return;
    PUB.listCF[nameEach].powerPath = `groupDataList.all`//设置权限路径
  })
  //#endregion
}

fnInitList()

//函数：{更新分组的用户学习缓存数据函数}
FN.updateGroupUserScore = async function ({ groupId, score }) {
  //变量：{对应的分组id}
  if (!groupId) return;
  let urlModify = PUB.listCF.list_familiarity.url.modify;
  let ajaxParam = {
    _idRel: groupId,
    findJson: { _idRel: groupId, _userId: PUB.$sys.userId }, //用户名
    _data: {
      _idRel: groupId,
      _userId: PUB.$sys.userId,
      score,
      dataType: "group"
    }
  };
  Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
  await axios({
    //请求接口
    method: "post",
    url: PUB.domain + urlModify,
    data: ajaxParam //传递参数
  });
}
//函数：{更新记分项缓存数据函数}
FN.updateItemScore = async function ({ scoreKey, score }) {
  //变量：{对应的分组id}
  if (!scoreKey) return;
  let urlModify = PUB.listCF.list_score.url.modify;
  let ajaxParam = {
    findJson: { scoreKey, _userId: PUB.$sys.userId }, //用户名
    _data: {
      _userId: PUB.$sys.userId,
      score, scoreKey
    }
  };
  Object.assign(ajaxParam, PUB.listCF.list_score.paramAddonPublic); //合并公共参数
  await axios({
    //请求接口
    method: "post",
    url: PUB.domain + urlModify,
    data: ajaxParam //传递参数
  });
}


//函数：{初始化处理arrLookup数组函数}
FN.initArrLookup = async function (listIndex) {
  let $projectAddon = {};
  if (listIndex) {
    $projectAddon = PUB.$projectAddon[listIndex] || {}
  }
  //****列表查询arrLookup数组由3部分组成：固定的查询，计分板的筛选参数，上方表单的筛选参数
  let arrLookupFromScore = this.arrLookup || []; //来自计分板筛选的arrLookup
  let formDataSearch = lodash.cloneDeep(this.formDataSearch); //深拷贝
  util.clearObj(formDataSearch); //调用：{清除对象中的空属性（null,undefined,空格等）}
  let isValid = util.isNotEmptyObj(formDataSearch); //调用：{判断是否为非空对象的函数}
  let arrLookupSearch = [];
  if (isValid) {
    //如果是非空对象
    arrLookupSearch.push({
      $match: {
        ...formDataSearch //**** */
      }
    });
  }

  //补充联合查询参数，很复杂！！！！

  //固定的查询部分
  let arrLookupFixed = [
    {
      //联合目标数据表
      $lookup: {
        from: "sheet232",
        localField: "_idRel2",
        foreignField: "_id",
        as: "relDoc2"
      }
    },
    //使用$project重新组装，此时targetDoc是数组形式
    {
      $project: {
        _id: 1,
        _idRel: 1,
        _idRel2: 1,
        sort: "$_data.sort", //序号获取
        targetDoc: "$relDoc2._data"
      }
    },
    //将targetDoc展开
    {
      $unwind: "$targetDoc"
    },
    //使用$project重新组装
    {
      $project: {
        _id: 1,
        _idRel: 1,
        _idRel2: 1,
        sort: 1, //序号获取
        title: "$targetDoc.title",
        link: "$targetDoc.link",//链接地址
        category: "$targetDoc.category",
        ...$projectAddon,//附加的属性***

      }
    }
  ];

  let arrLookup = [
    ...arrLookupFixed,
    ...arrLookupFromScore,
    ...arrLookupSearch
  ];
  this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);

  //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
  this.arrLookupScore = [...arrLookupFixed, ...arrLookupSearch];


}

//函数：{分组追加选中数据列表的函数}
FN.ajaxGroupAddSelectData = async function (arr) {
  let { tableData } = this.$refs.listData;
  let docLast = tableData.slice(0); //第一个元素
  let sortStart = lodash.get(docLast, `[0].sort`, 9999);
  let arrDataAdd = arr.map(doc => {
    return {
      sort: ++sortStart,
      _idRel: this.groupId,
      _idRel2: doc._id
    };
  });
  // return;

  let urlAdd = PUB.listCF.list_relation.url.add;
  let ajaxParam = {
    _data: arrDataAdd
  };
  Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
  let response = await axios({
    //请求接口
    method: "post",
    url: PUB.domain + urlAdd,
    data: ajaxParam //传递参数
  });

  this.$message.success("添加数据成功");
  this.arrSelect2 = []; //清除该数组，否则越积越多
  this.$refs.listData.getDataList(); //列表更新
}

//#region listCFaddItemSystemId:列表组件配置补充_systemId列表字段配置函数-用于总后台
FN.listCFaddItemSystemId = function (cfList) {
  let map = {
    columns: "COLUMNS", searchFormItems: "F_ITEMS", detailItems: "D_ITEMS", formItems: "F_ITEMS",
  }
  let arrNeed = ["columns", "searchFormItems", "detailItems", "formItems",]
  arrNeed.forEach(prop => {//循环：{需要处理的字段名数组}
    let arrItemsForThis = cfList[prop]
    let varName = map[prop]//公共变量名
    if (!arrItemsForThis) return;
    let existsItem = arrItemsForThis.find(doc => doc.prop == "_systemId")
    if (existsItem) return//如果_systemId字段已存在，不再添加了
    arrItemsForThis.push(window[varName]._systemId)
  })
};
//#endregion



//#endregion
//#region MIX混入

MIX.listGroupData = {
  props: {
    groupDoc: {},
    groupId: {},
    dataType: {
      default: "note"
    },//数据类型

  },
  data() {
    return {
      readyAddDialogEntity: true,//是否准备好新增实体的弹窗组件-用于复制时重现初始化
      //新增实体数据弹窗配置
      cfAddDialogEntity: {
        // copyId: "5e84ae2520a342107c0ad688",
        tipsAfterAdd: false,
        listType: "common", //通用型列表-影响urlAdd
        cfFormAdd: { paramAddonInit: { _dataType: this.dataType } }
      },
      //编辑实体数据弹窗配置
      cfEditDialogEntity: {
        listType: "common", //通用型列表-影响urlModify
        cfFormModify: {
          paramAddonInit: { _id: "", _dataType: this.dataType }
        }
      },
      arrSelect2: [],
      cfSelectList2: {
        hideCollection: true,
        dataName: lodash.get(DYDICT, `dataType.${this.dataType}.label`),
        valueKey: "_id",
        labelKey: "title",
        pageName: "tangball_article",
        multiple: true, //多选
        //需要保留的集合字段
        selectJson: { _id: 1, title: 1 },
        cfList: util.deepCopy(PUB.listCF[`list_${this.dataType}`])
      },
      //查询表单配置-默认数据
      cfFormSearch: {
        inline: true, "labelWidth": "100px", size: "mini", formItems: [F_ITEMS.importance],
        btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
      },
      formDataSearch: {},
      ready: false,
      cfList: util.deepCopy(PUB.listCF[`detail_group_${this.dataType}`]),
      arrLookupScore: null, //计分板需要联合查询配置数组-
      //----------分组列表用到----------
      dictScore: {} //用户的分组分数数据字典
    };
  },
  computed: {
    //用于监听变化
    arrLookup: function () {
      return this.$store.state.arrLookup[this.cfList.listIndex];
    }
  },
  methods: {
    //***函数：{处理列表内部组件事件的函数}
    handleListEventIn(param) {
      if (param.eventType == "filterDataByFamiliarity") {//如果{事件类型}是根据熟悉度过滤数据
        this.searchList()
      }
    },
    //函数：{单条数据操作事件}-临时
    async singleEvent(actionType, doc) {
      let arrNeedRefresh = ["up", "down", "top", "bottom"]
      if (arrNeedRefresh.includes(actionType)) {//如果是排序类操作
        await util.ajaxGroupDataSort(actionType, doc);
        this.$refs.listData.getDataList(); //列表更新
      }
      let { _idRel2 } = doc
      if (actionType == "edit_entity") {//如果是编辑实体数据

        this.cfEditDialogEntity.cfFormModify.paramAddonInit._id = _idRel2//***修改数据id
        this.cfEditDialogEntity.visible = true;//打开弹窗
      } else if (actionType == "copy_entity") {
        this.cfAddDialogEntity.copyId = _idRel2;
        this.readyAddDialogEntity = false;
        await this.$nextTick();//延迟到视图更新
        this.readyAddDialogEntity = true;



        this.cfAddDialogEntity.visible = true;//打开弹窗

      }
    },
    bacthEvent(actionType, doc) {
      if (actionType == "add_entity") {//如果{事件类型}是新增实体
        this.cfAddDialogEntity.visible = true;//打开弹窗
      }
    },
    async afterAddEntity(doc) {
      this.ajaxGroupAddData([doc])//调用：{000函数}
    },
    //函数：{选择并添加数据后的ajax操作函数}
    afterSelect: FN.ajaxGroupAddSelectData,
    ajaxGroupAddData: FN.ajaxGroupAddSelectData,//函数：{添加数据到分组的ajax操作函数}
    //函数：{初始化处理arrLookup数组函数}
    initArrLookup: FN.initArrLookup,
    //函数：{查询表单提交的回调函数}
    async searchList() {
      this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}
      await this.$nextTick(); //延迟到视图更新
      this.$refs.listData.getDataList(); //列表更新
      this.toSetArrLookupScore()//调用：{设置获取分数的ArrLookup的函数}
    },

    //函数：***{设置获取分数的ArrLookup的函数}
    async toSetArrLookupScore() {
      //计分板子组件，注意定位后是一个数组，取第一个元素//层层定位-繁琐
      let com_score_panel = lodash.get(this, `$refs.listData.$refs.score_panel[0]`);//*** */
      if (!com_score_panel) return
      com_score_panel.setArrLookupScore(this.arrLookupScore)//调用：{设置ArrLookupScore函数}
    },
    //函数：{列表查询后的回调函数}--兼容带计分板和不带计分板的情形
    async afterSearch() {
      //计分板子组件，注意定位后是一个数组，取第一个元素
      let com_score_panel = lodash.get(this, `$refs.listData.$refs.score_panel[0]`);
      if (com_score_panel) {//Q1：{计分板子组件}存在
        // let com_score_panel = this.$refs.listData.$refs.score_panel[0];//目标子组件，注意定位后是一个数组，取第一个元素
        let comTarget2 = com_score_panel.$refs.scorePanel//真正的计分组件
        //设置id数组
        comTarget2.ajaxGetScore(); //调用：{ajax获取分数函数}
        if (comTarget2.focusId == undefined) {
          //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
          this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
        }
      } else {//Q2：{计分板子组件}不存在
        this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
      }

    },
    //函数：{更新当前分组的数据量的函数}
    async updateGroupCountData() {
      let urlModify = PUB.listCF.list_group.url.modify;
      let ajaxParam = {
        _id: this.groupId, _data: { countData: this.$refs.listData.allCount } //获取列表的数据总量
      };

      Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数

      //调用：{给一个对象设置默认属性函数}-加入全局公共参数
      util.setObjDefault(ajaxParam, PUB._paramAjaxAddon);


      let response = await axios({
        //请求接口
        method: "post", url: PUB.domain + urlModify,
        data: ajaxParam //传递参数
      });
    },
    //**函数：{增加排除当前分组数据的查询条件的函数}-暂时不用，体验不大好，
    async excludeCurrGroup() {
      let { cfList } = this.cfSelectList2;
      cfList.objParamAddon = cfList.objParamAddon || {};
      cfList.objParamAddon.findJson = cfList.objParamAddon.findJson || {};
      let findjsonAdd = {
        "$or": [{
          "_data.arrGroup": {
            "$elemMatch": {
              "_idRel": {
                "$ne": this.groupId//不属于当前分组
              }
            }
          }
        }, {
          "_data.arrGroup": {
            "$exists": false//分组不存在
          }
        }, {
          "_data.countGroup": 0//分组数为0
        }]
      }

      cfList.objParamAddon.findJson = { ...cfList.objParamAddon.findJson, ...findjsonAdd };
    },

  },
  async created() {


    /****************************针对group类型进行函数改造/添加-START****************************/
    if (this.dataType == "group") {//如果{数据类型}是分组
      //函数：{列表查询后执行的函数}
      this.afterSearch = async (list) => {
        let arrGroupId = list.map(doc => doc._idRel2);//变量：{分组id数组}
        let datalist = await this.getGroupUserScore(arrGroupId);//调用：{ajax获取的用户学习缓存数据函数}
        if (datalist && datalist.length) {
          datalist.forEach(itemEach => {
            this.$set(this.dictScore, itemEach._idRel, itemEach.score);
          });
        }
      }
      //函数：{ajax获取的用户学习缓存数据函数}
      this.getGroupUserScore = async (arrGroupId) => {
        let urlList = PUB.listCF.list_familiarity.url.list;
        let ajaxParam = {
          findJson: {
            _idRel: { $in: arrGroupId }, dataType: "group", _userId: PUB.$sys.userId
          }
        };
        //获取列表的数据总量
        Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
        let {
          data: { list }
        } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain + urlList,
          data: ajaxParam //传递参数
        });
        return list;
      }

    }
    /****************************针对group类型进行函数改造/添加-END****************************/


    // this.excludeCurrGroup()//调用：{增加排除当前分组数据的查询条件的函数}

    /****************************弱化新增按钮-START****************************/
    let { addon } = this.cfList.batchBtns;
    let itemAdd = addon.find(doc => doc.eventType == "add");
    Object.assign(itemAdd, { text: "新增关联Id", cfElBtn: {} }); //合并对象-

    /****************************弱化新增按钮-END****************************/


    this.cfList.customDetail = true; //开启自定义详情弹窗
    this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
    this.initArrLookup(this.cfList.listIndex); //调用：{初始化处理arrLookup数组函数}



    this.ready = true;
    //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
    window.setFamiliarityAjaxCF(this.cfList, "_idRel2");



    /****************************补充编辑实体数据按钮-START****************************/
    let sBtnEditEntity = { eventType: "edit_entity", text: "编辑", };
    this.cfList.singleBtns.addon.push(sBtnEditEntity);
    /****************************补充编辑实体数据按钮-END****************************/
    //***从cfList中获取到需要的查询条件字段******
    this.cfFormSearch.formItems = this.cfList.searchFormItems



  },
  mounted() {
    //注意此方法要等待组件加载好
    this.toSetArrLookupScore()//调用：{设置获取分数的ArrLookup的函数}
  }
}
//#endregion





//#region 龙庭FN函数库


window.FN = window.FN || {}
//函数：{获取规格链id函数}
FN.getIdSpecChian = function (arrSpecSelected) {
  let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.__id`));
  return arrId.sort().join("__");

}

//函数：{获取规格链名称函数}
FN.getNameSpecChian = function (arrSpecSelected) {
  let arrId = arrSpecSelected.map(doc => lodash.get(doc, `objSOp.name`));
  return arrId.join(" + ");

}



//函数：{标记不符合条件的组合结果项的函数}
FN.handelCombResult = function ({ listSpecs, arrResult }) {
  /****************************标记不符合条件的项-START****************************/
  //循环：{规格数组}
  listSpecs.forEach((itemEach, index) => {
    if (!itemEach.objSpecTerm) return;
    let indexTerm; //条件规格所在的位置
    let valTerm; //条件值
    for (var prop in itemEach.objSpecTerm) {
      indexTerm = listSpecs.findIndex(doc => doc.name == prop);
      valTerm = itemEach.objSpecTerm[prop];

    }
    //循环：{组合结果数组}
    arrResult.forEach(itemEach => {
      let flag = itemEach[indexTerm].name != valTerm;
      if (flag) {
        itemEach[index] = { name: "——" };
      }
    });
  });
  return arrResult
  /****************************标记不符合条件的项-END****************************/
}



//函数：{规格价格列表去重函数}
FN.uniqListSpecPrice = function (listSpecPrice) {
  let listSpecPriceNew = [];
  //循环：{规格价格列表}
  listSpecPrice.forEach(itemEach => {
    let obj = listSpecPriceNew.find(doc => doc.id == itemEach.id);
    //如果{000}000
    if (!obj) {
      listSpecPriceNew.push(itemEach);
    }
  });
  return listSpecPriceNew
}
//#endregion





PUB.dataSite = PUB.dataSite || {}
PUB.dataSite.sys_chunqiu = {
  cfBanner: {
    cfElCarousel: {
      height: "450px",
      interval: 5000,

    },

    list: [
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_9.jpg',
      },
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_7.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_6.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_5.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_2.jpg',
        // imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_1200_1.jpg',
      },
      {
        title: 'banner2',
        link: 'javascript:;',
        imgSrc: 'http://qn-dmagic.dmagic.cn/chunqiu/banner_big_4.jpg',
      },


    ],
  },

  cfPageMenu: {
    cfElMenu: {
      "background-color": "#0091e0",
      "text-color": "#fff",
      "active-text-color": "#ffd04b",
      "aaaa": "1111",
    },
    listMenu: [
      { name: "首页", url: "/" },
      {
        name: "课程体系",
        url: "/productList",
        sonMenu: [
          { name: "专业设置", url: "javascript:;" },
          { name: "培训项目", url: "javascript:;" },

        ]
      },
      {
        name: "创业就业", url: "javascript:;",
        sonMenu: [
          { name: "教学成果", url: "javascript:;" },
          { name: "学员风采", url: "javascript:;" },
          { name: "就业指导", url: "javascript:;" },
        ]
      },


      {
        name: "新闻中心",
        url: "javascript:;",
        sonMenu: [
          { name: "学校动态", url: "javascript:;" },
          { name: "媒体报道", url: "javascript:;" },
          { name: "行业新闻", url: "javascript:;" }
        ]
      },
      {
        name: "关于星孵化",
        url: "javascript:;",
        sonMenu: [
          { name: "学校简介", url: "javascript:;" },
          { name: "发展历程", url: "javascript:;" },
          { name: "核心技术", url: "javascript:;" },
          { name: "教学实景", url: "javascript:;" },
          { name: "师资保障", url: "javascript:;" },
        ]
      },
      {
        name: "学员风采",
        url: "javascript:;",
        sonMenu: [
          { name: "xxx", url: "javascript:;" },
          { name: "xxx1", url: "javascript:;" },
          { name: "xxx2", url: "javascript:;" },

        ]
      },
      {
        name: "案例剖析",
        url: "javascript:;",
        sonMenu: [
          { name: "xxx", url: "javascript:;" },
          { name: "xxx1", url: "javascript:;" },
          { name: "xxx2", url: "javascript:;" },

        ]
      }
    ]

  },
  cfPageHead: {
    siteName: "春秋教育-烹饪培训",
    cfLogo: {
      title: "星孵化烹饪学校",
      src: "http://qn-dmagic.dmagic.cn/202004231128385151_20083_logo_chunqiu_simple.png",
      // src: "//qn-dmagic.dmagic.cn/chunqiu/logo_chunqiu.png",
      width: "86px",
      height: "86px",
      styleText: {
        "font-size": "34px",
        "margin-top": "32px",
        "margin-left": "10px",
        "color": "#333",
      },
      styleBox: {

        "margin-top": "0",
        "height": "86px",
      }
    },
  },

  cfStudentWork: {
    title: "学生作品",
    list: [
      {
        title: "学生作品1",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品2",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品3",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

      {
        title: "学生作品4",
        imgSrc: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },

    ]
  },
  cfCourse: {
    title: "课程体系",
    list: [
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
      {
        title: "粤菜",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        priceSell: 1900,
        priceMarket: 2400,
      },

      {
        title: "火锅",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        priceSell: 1300,
        priceMarket: 2200,
      },

      {
        title: "西餐",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        priceSell: 2900,
        priceMarket: 3400,
      },

      {
        title: "粥粉面",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        priceSell: 1400,
        priceMarket: 2400,
      },
    ]
  },
  cfTeacher: {
    title: "师资力量",
    list: [
      {
        title: "张老师",
        desc: "粤菜料理专家级导师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook1.png"
      },

      {
        title: "李老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook2.png"
      },

      {
        title: "黄老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook3.png"
      },

      {
        title: "罗老师",
        desc: "粥粉面专家老师",
        imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/cook4.png"
      },

    ]
  },
  cfListSchoolNews: {
    title: "学校新闻",
    // linkMore: "###",
    list: [
      {
        title: "学校动态文章标题1",
        date: "2020-11-22",
      },

      {
        title: "学校动态文章标题2",
        date: "2020-4-22",
      },

      {
        title: "学校动态文章标题3",
        date: "2020-4-22",
      },

      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },
      {
        title: "学校动态文章标题4",
        date: "2020-4-22",
      },

    ]
  },
  cfListNews2: {
    title: "行业资讯",
    linkMore: "######",
    list: [
      {
        title: "行业资讯文章标题1",
        date: "2020-11-22",
      },

      {
        title: "行业资讯文章标题2",
        date: "2020-11-22",
      },



    ]
  },
  cfNewsCenter: {
    title: "新闻中心",
    linkMore: "######",




  },
  cfSchoolIntro: {
    title: "学校简介",
    linkMore: "######",
    imgSchool: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=405534800,3305762250&fm=26&gp=0.jpg",
    cotent: `江门市春秋教育科技有限公司，成立于2012年，是集学历合作办学、职业行业培训、线上学习平台研发运营、教育装备整合研发的教育科技公司。目前与江门开放大学（原江门市广播电视大学）开展合作办学，为学生提供便利、先进和优质的学习平台和支持服务。
    <br>

    春秋教育本着“发展科技、培养人才、传承文化、服务社会”的宗旨，以解放思想，实事求是，大胆革新为办学理念，依靠品德高尚、专业技术过硬，不断开拓进取的师资团队，建立和发展优秀的教育培训综合服务平台，服务学校，服务学生，服务企业。目前在读学生近4000人，合作办学学校两间，战略合作行业企业两家。<br>
    作为协调各部门运作基础业务部门，教务部是主管教育培训平台的教学工作和实施教学管理与服务的行政职能部门，主要负责学员档案、教学计划、教学质量、考试安排以及教学发展等方面的教学运行与管理工作。
    
    `

  },
  cfStrength: {
    title: "实力保证",
    linkMore: "######",
    imgSrc: "http://qn-dmagic.dmagic.cn/202004231052135959_57032_1.png"


  },

  cf_page_list_course: {
    focusMenu: "粤菜",
    breadcrumb: [{ value: "首页", path: "home" }, { value: "课程体系" }, { value: "粤菜" }],
    cfListMain: {
      title: "粤菜体系",
      list: [
        {
          title: "粤菜1",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
          priceSell: 1900,
          priceMarket: 2400,
        },

        {
          title: "粤菜2",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
          priceSell: 1300,
          priceMarket: 2200,
        },

        {
          title: "粤菜3",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
          priceSell: 2900,
          priceMarket: 3400,
        },

        {
          title: "粤菜4",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
          priceSell: 1400,
          priceMarket: 2400,
        },
        {
          title: "粤菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
          priceSell: 1900,
          priceMarket: 2400,
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
          priceSell: 1300,
          priceMarket: 2200,
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
          priceSell: 2900,
          priceMarket: 3400,
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
          priceSell: 1400,
          priceMarket: 2400,
        },
      ]
    },
    cfCategory: {
      title: "课程分类",
      list: [
        {
          title: "粤菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        },
        {
          title: "湘菜",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course1.png",
        },

        {
          title: "火锅",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course2.png",
        },

        {
          title: "西餐",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course3.png",
        },

        {
          title: "粥粉面",
          imgSrc: "//qn-dmagic.dmagic.cn/chunqiu/course4.png",
        },
      ]
    }

  }
}



export default {}