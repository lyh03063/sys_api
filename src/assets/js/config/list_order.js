{
  let _dataType = "order";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "系统" }],
    ...PUB.listCFCommon2,//展开公共配置
    //动态数据字典
    dynamicDict: [
      DYDICT.order_user
    ],
    //-------详情字段数组-------
    detailItems: ["orderId", "_id", "openid", "timeOrder", "priceOrder", "listGoods", "payStatus", "addressObj", "remark"],
    //-------列配置数组-------
    columns: ["orderId", "_id", "openid", "orderNickName", "receiverName", "phone", "timeOrder", "priceOrder", "listGoods", "payStatus_com"],
    //-------筛选表单字段数组-------
    searchFormItems: ["orderId"],
    //-------新增、修改表单字段数组-------
    formItems: ["orderId", "openid", "timeOrder", "priceOrder", "listGoods", "payStatus", "addressObj", "remark"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}






