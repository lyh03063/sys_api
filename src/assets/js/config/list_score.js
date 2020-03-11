
let _dataType = "score",
  _systemId = PUB._systemId;

PUB.listCF.list_score = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_score", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "前端习题" }
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
  //-------列配置数组-------
  columns: [COLUMNS.scoreKey, COLUMNS.score, COLUMNS._userId],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS.scoreKey,  F_ITEMS._userId],
  //-------详情字段数组-------
  detailItems: [D_ITEMS._id,D_ITEMS.scoreKey, D_ITEMS.score, D_ITEMS._userId],
  //-------新增、修改表单字段数组-------
  formItems: [F_ITEMS.scoreKey, F_ITEMS._userId]
}
