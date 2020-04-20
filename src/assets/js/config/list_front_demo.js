
{
  let _dataType = "front_demo";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "listHome" }, { value: "前端Demo" } ],
    ...PUB.listCFCommon4,//展开公共配置
    "detailItems": ["title", "keyword", "link", "desc", "category", "detail", "_id"],
    "columns": ["title_fixed_edit", "_id", "keyword_edit", "link", "desc", "category"],
    "searchFormItems": ["title_search"],
    "formItems": ["title", "link", "keyword", "desc", "detail"]

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}


