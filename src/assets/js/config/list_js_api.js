let _dataType = "js_api",
  _systemId = PUB._systemId;
PUB.listCF.list_js_api = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_js_api", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "API手册" },
    { value: "Javascript-API" }
  ],
  ...PUB.listCFCommon2,//展开公共配置
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
    DYDICT.js_api_category,
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
  columns: [COLUMNS.title_fixed_w150_edit,COLUMNS.keyword_edit,  COLUMNS.desc, COLUMNS.category, COLUMNS.familiarity_select,  COLUMNS.importance,
  COLUMNS.difficulty, COLUMNS.english, 
   COLUMNS.cateIdOld],
  //-------筛选表单字段数组-------
  searchFormItems: [F_ITEMS.title_search, F_ITEMS.js_api_category,F_ITEMS.importance, F_ITEMS.difficulty, ],
  //-------详情字段数组-------
  detailItems: [D_ITEMS._id, D_ITEMS.title,D_ITEMS.keyword,  D_ITEMS.desc, D_ITEMS.detail, D_ITEMS.category,  D_ITEMS.importance,
  D_ITEMS.difficulty, D_ITEMS.english,
  D_ITEMS.cateIdOld],
  //-------新增、修改表单字段数组-------
  formItems: [
    F_ITEMS.title,
    F_ITEMS.link,
    F_ITEMS.keyword, F_ITEMS.js_api_category, F_ITEMS.desc,
    F_ITEMS.detail, F_ITEMS.importance,
    F_ITEMS.difficulty, F_ITEMS.english,
    
  ]
}
