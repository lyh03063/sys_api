
let _dataType = "score",
  _systemId = PUB._systemId;

PUB.listCF.list_score = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_score", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "记分项" }
  ],
  ...PUB.listCFCommon2,//展开公共配置
  objParamAddon: {
    _systemId,
    _dataType
  },
  //公共的附加参数，针对所有接口
  paramAddonPublic: {
    _systemId,
    _dataType
  },

  //-------详情字段数组-------
  detailItems: ["_id", "scoreKey", "score", "_userId"],
  //-------列配置数组-------
  columns: ["scoreKey", "score", "_userId"],
  //-------筛选表单字段数组-------
  searchFormItems: ["scoreKey", "_userId"],
  //-------新增、修改表单字段数组-------
  formItems: ["scoreKey", "_userId"],
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_score)