
let _dataType = "familiarity",
  _systemId = PUB._systemId;
  PUB.listCF.list_familiarity= {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_familiarity", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "熟悉度" }
  ],
  ...PUB.listCFCommon,//展开公共配置
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.html_api_category
  ],
  //objParamAddon列表接口的附加参数
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
  columns: [COLUMNS.familiarity,COLUMNS.score, COLUMNS.dataType, COLUMNS.dataId, COLUMNS._userId,COLUMNS.userId,COLUMNS._idRel,COLUMNS.studyTime ],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS.dataId, F_ITEMS.userId,F_ITEMS._userId,F_ITEMS._idRel,],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.familiarity,
    D_ITEMS.dataType,
    D_ITEMS.dataId,
    
    D_ITEMS.userId,D_ITEMS.studyTime
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.familiarity,
    F_ITEMS.dataType,
    F_ITEMS.dataId,
    F_ITEMS.userId,
    F_ITEMS._userId,
  ]
}
