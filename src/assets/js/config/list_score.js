{
  let _dataType = "score";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "记分项" } ],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["_id", "scoreKey", "score", "_userId"],
    //-------列配置数组-------
    columns: ["scoreKey", "score", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["scoreKey", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["scoreKey", "_userId"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}




