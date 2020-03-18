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


   //-------详情字段数组-------
   detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance", "difficulty", "english", "cateIdOld"],
   //-------列配置数组-------
   columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "importance", "difficulty", "english", "cateIdOld"],
   //-------筛选表单字段数组-------
   searchFormItems: ["title_search", "js_api_category", "importance", "difficulty"],
   //-------新增、修改表单字段数组-------
   formItems: ["title", "link", "keyword", "js_api_category", "desc", "detail", "importance", "difficulty", "english"],
 
  
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_js_api)