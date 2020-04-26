{
  let _dataType = "order";
  let listCFAddon = {

    ...PUB.listCFCommon2,//展开公共配置
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线上订单" }],
    //动态数据字典
    dynamicDict: [
      DYDICT.order_user
    ],
    objParamAddon: {
      findJson: { orderSource: { $ne: 2 } }, //筛选条件！！！
      _dataType
    },
    //-------详情字段数组-------
    detailItems: ["orderId", "_id", "openid", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
    //-------列配置数组-------
    columns: ["orderId", "orderNickName", "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "deliveryStatus", "openid"],
    //-------筛选表单字段数组-------
    searchFormItems: ["orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
    //-------新增、修改表单字段数组-------
    formItems: ["orderId", "openid", "payStatus", "deliveryStatus", "remark", "orderSource","addressObj", ],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}






