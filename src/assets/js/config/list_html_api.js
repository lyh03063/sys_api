{
  let _dataType = "html_api";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "#/listHome" }, { value: "API手册" }, { value: "Html-API" } ],
    ...PUB.listCFCommon4,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add,
        util.cfList.bBtns.delete,
        { uiType: "component", component: "com_score_panel", ref: "score_panel" },
        // { uiType: "slot", slot: "slot_in_toolbar" }
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.html_api_category,
    ],
    //objParamAddon列表接口的附加参数
    objParamAddon: {
      _systemId,
      _dataType,
      //传入联表查询参数
      arrLookup: []
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList", "cateIdOld"],
    //-------列配置数组-------
    columns: ["title_fixed_w150_edit", "keyword_edit", "desc", "category", "familiarity_select", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "cateIdOld", "demoList"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "html_api_category", "html_display", "importance", "difficulty", "html_version", "selfClose"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "keyword", "html_api_category", "desc", "detail", "html_display", "importance", "difficulty", "english", "html_version", "selfClose", "demoList"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}


