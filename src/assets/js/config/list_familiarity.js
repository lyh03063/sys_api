{
  let _dataType = "familiarity";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "#/listHome" }, { value: "熟悉度" } ],
    ...PUB.listCFCommon,//展开公共配置
    //dynamicDict动态数据字典配置
    dynamicDict: [
      DYDICT.html_api_category
    ],
    //-------详情字段数组-------
    detailItems: ["familiarity", "dataType", "dataId", "userId", "studyTime"],
    //-------列配置数组-------
    columns: ["familiarity", "score", "dataType", "dataId", "_userId", "userId", "_idRel", "studyTime"],
    //-------筛选表单字段数组-------
    searchFormItems: ["dataId", "userId", "_userId", "_idRel"],
    //-------新增、修改表单字段数组-------
    formItems: ["familiarity", "dataType", "dataId", "userId", "_userId"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}



