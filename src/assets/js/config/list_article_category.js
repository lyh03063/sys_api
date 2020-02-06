
let _dataType = "article_category",
  _systemId = PUB._systemId;
PUB.listCF.list_article_category = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_article_category", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  threeTitle: "文章分类", //面包屑2级菜单
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

    COLUMNS.category_name,
    COLUMNS.category_remark,

  ],
  //-------筛选表单字段数组-------
  searchFormItems: [
    F_ITEMS.category_name,
  ],
  //-------详情字段数组-------
  detailItems: [

    D_ITEMS.category_name,
    D_ITEMS.category_remark,
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.category_name,
    F_ITEMS.category_remark,
  ]
}
