
let _dataType = "relation",
  _systemId = PUB._systemId;

PUB.listCF.list_relation = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_relation", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "关系数据" }
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
  columns: [COLUMNS._id,COLUMNS._idRel, COLUMNS._idRel2, COLUMNS.sort],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS._idRel,F_ITEMS._idRel2,],
  //-------详情字段数组-------
  detailItems:[ D_ITEMS._id,D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
  //-------新增、修改表单字段数组-------
  formItems: [F_ITEMS._idRel,F_ITEMS._idRel2,F_ITEMS.sort,]
}
