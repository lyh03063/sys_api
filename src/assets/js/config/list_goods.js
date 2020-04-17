


//#region 商品/服务
{
    let _dataType = "goods";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "商品/服务" }],
        ...PUB.listCFCommon2,//展开公共配置
        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                {
                    uiType: "link",
                    text: "查看前台展示",
                    target: "_blank",
                    urlFormatter: function (row) {
                        return `http://www.szltkt.cn/goods/${row._id}`;
                    },
                },
            ]
        },
    
        //-------详情字段数组-------
        detailItems: ["title", "desc", "deliveryDesc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
        //-------列配置数组-------
        columns: ["title_fixed", "_id", "desc", "priceMarket", "priceSell", "priceSellSection", "isPublish", "countOrder"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "desc", "album", "deliveryDesc", "detail", "priceMarket", "priceSell",  "isPublish", "listSpecPrice"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion




