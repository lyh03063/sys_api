let _dataType = "admin",
_systemId = PUB._systemId;
PUB.listCF.list_admin= {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_admin", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  threeTitle: "管理员", //面包屑2级菜单
  ...PUB.listCFCommon2,//展开公共配置
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
  columns: [
    COLUMNS.Id,
    COLUMNS.userName,
    COLUMNS.passWord,
    COLUMNS.nickName,
    COLUMNS.role,
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.Id,
  ],
  //-------详情字段数组-------
  detailItems: [
    D_ITEMS.Id,
    D_ITEMS.userName,
    D_ITEMS.passWord,
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.userName,
    F_ITEMS.passWord ,
    F_ITEMS.nickName,
    F_ITEMS.role,
  ]
}
