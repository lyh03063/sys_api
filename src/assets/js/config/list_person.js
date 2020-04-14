{
  let _dataType = "person";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "人员" }],
    ...PUB.listCFCommon2,//展开公共配置
    //cfForm新增修改表单的配置
    cfForm: {
      col_span: 12, //控制显示一行多列
    },

    objParamAddon: { _systemId, _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _systemId, _dataType },
    //-------详情字段数组-------
    detailItems: ["_id", "trueName", "desc", "phone", "address", "career", "_userId"],
    //-------列配置数组-------
    columns: ["trueName", "desc", "phone", "address", "career", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["trueName", "career", "phone", "address", "birthday", "email", "idCard", "qqNumber", "desc", "headSrc",],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}
