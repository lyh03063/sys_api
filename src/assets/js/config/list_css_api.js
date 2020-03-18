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


  //-------详情字段数组-------
  detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance"],
  //-------列配置数组-------
  columns: ["title_fixed_w150", "keyword_edit", "desc", "category", "familiarity_select", "importance"],
  //-------筛选表单字段数组-------
  searchFormItems: ["aaaa", "title_search", "css_api_category", "difficulty"],
  //-------新增、修改表单字段数组-------
  formItems: ["title", "keyword", "css_api_category", "desc", "detail", "importance", "difficulty"],



}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_css_api)