//#region 基本配置
window.PUB = {}
PUB.domain = "http://localhost:3000"
//PUB.domain = 'http://test.dmagic.cn'
 //PUB.domain = "http://120.76.160.41:3000"
PUB.urlUpload = `https://up-z2.qiniup.com`//七牛云上传地址（域名）
PUB.urlGetQiniuToken = `${PUB.domain}/api_third_part/get_qiniu_token?scope=dmagic`
PUB.systemName = "深圳龙庭后台系统";
PUB.KeySys = "longting";
let _systemId = `sys_${PUB.KeySys}`;
PUB._systemId = _systemId;
PUB.keyLoginUser = `${PUB.KeySys}_loginUserName`;
PUB.keyIsLogin = `${PUB.KeySys}_isLogin`;
PUB.keyRoleId = `${PUB.KeySys}_roleId`;
PUB.keyPower = `${PUB.KeySys}_power`;
PUB.userId = localStorage[PUB.keyLoginUser];

PUB.logoUrl = "";
//#endregion

//#region 菜单列表
//完整的菜单列表
PUB.menuList = [
  {
    //菜单
    index: "listHome",
    route: "/listHome",
    icon: "el-icon-house",
    title: "首页"
  },
  {
    index: "apiCenter",
    icon: "el-icon-document",
    title: "基础数据",
    menuItem: [
      {
        index: "list_project_case",
        route: "/list_common?type=project_case",
        title: "工程案例"
      },
      {
        index: "list_url",
        route: "/list_common?type=url",
        title: "网址"
      },
      {
        index: "list_note",
        route: "/list_common?type=note",
        title: "笔记"
      }
    ]
  },
  {
    index: "newsCenter",
    icon: "el-icon-document",
    title: "其他数据",
    menuItem: [
      {
        index: "list_group",
        route: "/list_common?type=group",
        title: "分组"
      }
    ]
  },

  {
    index: "systemManage",
    icon: "el-icon-setting",
    title: "系统管理",
    menuItem: [
      {
        index: "list_data_type",
        route: "/list_common?type=data_type",
        title: "数据类型"
      },
      {
        index: "list_all",
        route: "/list_common?type=all",
        title: "所有数据"
      },
      {
        index: "list_admin",
        route: "/list_common?type=admin",
        title: "管理员"
      },
      { index: "list_role", route: "/list_role", title: "角色" }
    ]
  }
];
//#endregion

//#region 路由配置
PUB.arrRouteListName = [
  "modify_password",
  "list_article_category",
  "list_article",
  "list_admin",
  "list_role",
  "list_html_api",
  "list_css_api",
  "list_js_api",
  "list_note",
  "list_all",
  "listHome",
  "list_common",//通用列表
]
//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: () => import("@/page/detail_group") },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },]
//#endregion
//#region 列表模块名数组配置
//变量：{列表名数组}
PUB.arrListName=[
  "admin", "role",
  "html_api", "html_api_category", "css_api", "css_api_category", "js_api", "js_api_category",
  "url", "article", "article_category", "note", "note_category","vedio", 
  "familiarity", "relation", "group", "all",  "data_type",
  "exercises", "front_demo", 
  "project_case", 
]
//#endregion
//#region 分组数据列表页模块引用配置
//变量：{分组数据列表的模块名称数组}-会在js配置文件时用到
PUB.arrDetailGroupMoudles=[
  "note","group","url","project_case"
]
//变量：{特殊的分组数据列表模块名称数组}-需要有单独对应的分组列表模板vue-会在导入vue文件时用到
PUB.arrGroupMoudlesSpe=[
  "note","group111"
]

//#endregion


//#region window.FN函数库
window.FN = {}//存放本站公共函数的对象
//函数：{ajax根据关键词获取关联数据列表的函数}
FN.ajaxlistBykeyword = async function ({ param = {} }) {
  let { data } = await axios({
    //请求接口
    method: "post",
    url: `${PUB.domain}/info/getListBykeyword`,
    data: param
  });
  return data.list;
}
//#endregion


//#region 公共字典对象配置
PUB.objDictArr = {
  taskType: [
    { value: 1, label: "新需求" },
    { value: 2, label: "bug" },
    { value: 3, label: "其他" }
  ],
  difficulty: [
    { value: 1, label: "简单" },
    { value: 2, label: "一般" },
    { value: 3, label: "困难" },
    { value: 4, label: "很难" }
  ],
  prior: [
    { value: 1, label: "很高" },
    { value: 2, label: "高" },
    { value: 3, label: "中" },
    { value: 4, label: "低" }
  ],
  complete: [
    { value: 0, label: "0%" },
    { value: 0.1, label: "10%" },
    { value: 0.2, label: "20%" },
    { value: 0.3, label: "30%" },
    { value: 0.4, label: "40%" },
    { value: 0.5, label: "50%" },
    { value: 0.6, label: "60%" },
    { value: 0.7, label: "70%" },
    { value: 0.8, label: "80%" },
    { value: 0.9, label: "90%" },
    { value: 1, label: "100%" },
  ],
  complete2: [
    { value: 1, label: "未开始" },//complete==0
    { value: 2, label: "进行中" },//complete>0&&complete>1
    { value: 3, label: "已完成" },//complete>0&&complete>1
  ],
}
//{"P7": Im,"P5":{ $gte: DataStart,$lte: DataEnd } }
PUB.dict = {};//公共数据字典对象，里面会有多个子数据字典对象
//for of循环遍历对象，for of不能直接处理对象，本质上是同个Object.keys拼装一个新数组进行辅助
for (var key of Object.keys(PUB.objDictArr)) {
  PUB.dict[key] = {}
  let arrOpt = PUB.objDictArr[key];
  arrOpt.forEach(itemEach => {//循环：{000数组}
    PUB.dict[key][itemEach.value] = itemEach
  })
}
/**
    * @name 获取数据字典值函数
    * @param dictName字典名，value值
    */
PUB.formatterDict = function (dictName, value) {
  return lodash.get(PUB.dict, `${dictName}.${value}.label`);
}
//#endregion
//#region 其他公共变量
//公共的列表对象
PUB.listCF = {}
PUB.listUrl = {
  list: `/info/getCommonList`, //列表接口
  add: "/info/commonAdd", //新增接口
  modify: "/info/commonModify", //修改接口
  detail: "/info/commonDetail",
  delete: "/info/commonDelete" //删除接口
}
PUB.listCFCommon = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 160 },
  //列表单项操作按钮的配置
  singleBtns: {
    addon: [
      util.cfList.sBtns.detail,
      util.cfList.sBtns.modify,
      util.cfList.sBtns.delete,
    ]
  },
}
let sBtnDetail = {
  uiType: "link",
  text: "详情",
  target: "_blank",
  //地址格式函数
  urlFormatter: function (row) {
    return `#/detail_data?dataId=${row._id}`;
  }
}
let sBtnLink = {
  uiType: "link",
  text: "查看",
  target: "_blank",
  urlFormatter: function (row) {
    return `${row.link}`;
  },
}
PUB.singleBtns_copy_detail = {
  addon: [
    ...util.cfList.sBtns.arrAllBtns,
    sBtnDetail,
  ]
}
PUB.listCFCommon2 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_detail,
}
PUB.singleBtns_copy_link = {
  addon: [
    ...util.cfList.sBtns.arrAllBtns,
    sBtnLink,
  ]
}
PUB.listCFCommon3 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 230 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns_copy_link,
}
PUB.singleBtns4 = {
  addon: [
    ...util.cfList.sBtns.arrAllBtns,
    sBtnDetail,
    sBtnLink,
  ]
}
//第四套-有详情和链接按钮
PUB.listCFCommon4 = {
  url: PUB.listUrl,
  columnOperate: { "min-width": 270 },
  //列表单项操作按钮的配置
  singleBtns: PUB.singleBtns4,
}
//函数：{补充熟悉度ajax配置（动态数据字典）函数}
window.setFamiliarityAjaxCF = function (listCF, idKey = "_id") {
  util.setObjDefault(listCF, { dynamicDict: [] });
  let dict = {
    ajax: {
      param: { _systemId, _dataType: "familiarity", findJson: { userId: PUB.userId }, },
      url: "/info/getCommonList",
    },
    populateColumn: "familiarityDoc",
    idColumn: idKey,
    idColumn2: "_idRel"
  }
  listCF.dynamicDict.push(dict)
}
//#endregion
