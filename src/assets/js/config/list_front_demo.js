
let _dataType = "front_demo",
  _systemId = PUB._systemId;

PUB.listCF.list_front_demo = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_front_demo", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "前端Demo" }
  ],
  ...PUB.listCFCommon4,//展开公共配置
  objParamAddon: {
    _systemId,
    _dataType
  },
  //公共的附加参数，针对所有接口
  paramAddonPublic: {
    _systemId,
    _dataType
  },
 
  "detailItems": ["title", "keyword", "link", "desc", "category", "detail", "_id"],
  "columns": ["title_fixed_edit", "_id", "keyword_edit", "link", "desc", "category"],
  "searchFormItems": ["title_search"],
  "formItems": ["title", "link", "keyword", "desc", "detail"]
}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_front_demo)
