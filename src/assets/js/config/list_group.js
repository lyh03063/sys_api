
let _dataType = "group",
_systemId = PUB._systemId;

PUB.listCF.list_group = {
idKey: "_id", //键名
pageSize: 20,
listIndex: "list_group", //vuex对应的字段~
focusMenu: true, //进行菜单聚焦
breadcrumb: [
  { value: "首页", path: "#/listHome" },
  { value: "分组" }
],
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
objParamAddon: {
  _systemId,
  _dataType
},
//公共的附加参数，针对所有接口
paramAddonPublic: {
  _systemId,
  _dataType
},
//-------列配置数组-------
columns: [COLUMNS.title_fixed,COLUMNS._id,COLUMNS.alias,  COLUMNS.desc,COLUMNS.group_dataType ],
//-------筛选表单字段数组-------
searchFormItems: [F_ITEMS.title_search],
//-------详情字段数组-------
detailItems: [D_ITEMS._id,D_ITEMS.title, D_ITEMS.desc,D_ITEMS.group_dataType],
//-------新增、修改表单字段数组-------
formItems: [
  F_ITEMS.title,
  F_ITEMS.alias,
  F_ITEMS.group_dataType,
  F_ITEMS.desc,
  

]
}
