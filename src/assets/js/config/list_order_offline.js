
{
    let _dataType = "order";
    PUB.listCF.list_order_offline = lodash.cloneDeep(PUB.listCF.list_order);//**** */
    let listIndex = `list_order_offline`
    PUB.listCF[listIndex] = {
        ...PUB.listCF.list_order_offline,
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "线下订单" }],
        listIndex,
        _dataType,
        objParamAddon: {
            findJson: { orderSource: 2 }, //筛选条件！！！
            _dataType
        },

        cfForm: {
            col_span: 12, //控制显示一行多列
            watch: PUB.cfForm.watch.file 
          },
      
        formDataAddInit: {
            orderSource: 2
        },
        //-------详情字段数组-------
        detailItems: ["orderId", "_id", "timeOrder", "priceOrder", "listGoods", "payStatus", "receiverName", "phone", "addressObj", "remark"],
        //-------列配置数组"orderId",-------
        columns: ["orderGoodsDesc",  "receiverName", "phone", "timeOrder", "priceOrder", "payStatus_com", "deliveryStatus",],
        //-------筛选表单字段数组-------
        searchFormItems: ["orderId", "timeOrder_search", "payStatus", "deliveryStatus",],
        //-------新增、修改表单字段数组"orderSource",-------
        formItems: ["orderGoodsDesc", "receiverName", "priceOrder", "timeOrder", "phone", "payStatus", "deliveryStatus", "remark","addressObj",],
    }


    util.reformCFListItem(PUB.listCF[listIndex])
}




