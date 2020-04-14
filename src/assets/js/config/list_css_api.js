
{
  let _dataType = "css_api";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "API手册" }, { value: "Css-API" }],
    ...PUB.listCFCommon4,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {
      addon: [
        util.cfList.bBtns.add, util.cfList.bBtns.delete, { uiType: "slot", slot: "slot_in_toolbar" }
      ],
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.css_api_category,
    ],
    //objParamAddon列表接口的附加参数
    objParamAddon: {
      _systemId,_dataType,arrLookup: [],//传入联表查询参数
    },
    //-------详情字段数组-------
    detailItems: ["_id", "title", "keyword", "desc", "detail", "category", "importance"],
    //-------列配置数组-------
    columns: ["title_fixed_w150", "keyword_edit", "desc", "category", "familiarity_select", "importance"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "css_api_category", "difficulty"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "keyword", "css_api_category", "desc", "detail", "importance", "difficulty"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}


