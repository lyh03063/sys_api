{
  let _dataType = "html_api_category";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "Html-Api分类" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "category"],
    //-------列配置数组-------
    columns: ["title_fixed", "desc", "category"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}


