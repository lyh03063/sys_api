let _dataType = "role",
  _systemId = PUB._systemId;
PUB.listCF.list_role = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_role", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  threeTitle: "角色", //面包屑2级菜单
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

  columns: [
    COLUMNS.Id,
    COLUMNS.roleName,
    COLUMNS.rolePower
  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.Id
  ],
  //-------详情字段数组-------
  detailItems: [
    COLUMNS.Id,
    COLUMNS.roleName,
    COLUMNS.rolePower
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    COLUMNS.roleName,
    COLUMNS.rolePower,
  ]
}
