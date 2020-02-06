let _dataType = "css_api",
  _systemId = PUB._systemId;
PUB.listCF.list_css_api = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_css_api", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "API手册" },
    { value: "Css-API" }
  ],

  ...PUB.listCFCommon4,//展开公共配置
  //批量操作按钮的配置
  batchBtns: {

    addon: [
      util.cfList.bBtns.add,
      util.cfList.bBtns.delete,
      { uiType: "slot", slot: "slot_in_toolbar" }
    ],
  },
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.css_api_category,
  ],
  //objParamAddon列表接口的附加参数
  objParamAddon: {
    _systemId,
    _dataType,
    //传入联表查询参数
    arrLookup: []
  },
  //公共的附加参数，针对所有接口
  paramAddonPublic: {
    _systemId,
    _dataType
  },
  //-------列配置数组-------
  columns: [COLUMNS.title_fixed_w150, COLUMNS.keyword_edit, COLUMNS.desc, COLUMNS.category, COLUMNS.familiarity_select, COLUMNS.importance,
  COLUMNS.difficulty,
  COLUMNS.link],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS.title_search, F_ITEMS.css_api_category, F_ITEMS.importance, F_ITEMS.difficulty,],
  //-------详情字段数组-------
  detailItems: [D_ITEMS._id, D_ITEMS.title, D_ITEMS.keyword, D_ITEMS.desc, D_ITEMS.detail, D_ITEMS.category, D_ITEMS.importance,
  D_ITEMS.difficulty,
  ],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.title,
    F_ITEMS.keyword, F_ITEMS.css_api_category, F_ITEMS.desc,
    F_ITEMS.detail, F_ITEMS.importance,
    F_ITEMS.difficulty,

  ]
}
