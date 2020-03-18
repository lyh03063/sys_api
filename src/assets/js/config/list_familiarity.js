
let _dataType = "familiarity",
  _systemId = PUB._systemId;
PUB.listCF.list_familiarity = {
  idKey: "_id", //键名
  pageSize: 20,
  listIndex: "list_familiarity", //vuex对应的字段~
  focusMenu: true, //进行菜单聚焦
  breadcrumb: [
    { value: "首页", path: "#/listHome" },
    { value: "熟悉度" }
  ],
  ...PUB.listCFCommon,//展开公共配置
  //dynamicDict动态数据字典配置
  dynamicDict: [
    DYDICT.html_api_category
  ],
  //objParamAddon列表接口的附加参数
  objParamAddon: {
    _systemId,
    _dataType
  },
  //公共的附加参数，针对所有接口
  paramAddonPublic: {
    _systemId,
    _dataType
  },


  //-------详情字段数组-------
  detailItems: ["familiarity", "dataType", "dataId", "userId", "studyTime"],
  //-------列配置数组-------
  columns: ["familiarity", "score", "dataType", "dataId", "_userId", "userId", "_idRel", "studyTime"],
  //-------筛选表单字段数组-------
  searchFormItems: ["dataId", "userId", "_userId", "_idRel"],
  //-------新增、修改表单字段数组-------
  formItems: ["familiarity", "dataType", "dataId", "userId", "_userId"],

}
//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_familiarity)