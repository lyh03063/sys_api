{
  let _dataType = "user";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "用户" }],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["trueName", "nickName", "openid", "phone", "sex", "countOrder"],
    //-------列配置数组-------
    columns: ["CreateTime", "nickName", "openid", "phone", "sex", "countOrder"],
    //-------筛选表单字段数组-------
    searchFormItems: ["nickName", "openid"],
    //-------新增、修改表单字段数组-------
    formItems: ["trueName", "nickName", "openid", "phone", "sex"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}


