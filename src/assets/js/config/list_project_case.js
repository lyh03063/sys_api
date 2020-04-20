{
  let _dataType = "project_case";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "工程案例" }],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title", "desc", "link"],
    //-------列配置数组-------
    columns: ["title_fixed", "_id", "desc", "link"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "desc", "album", "detail"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}


