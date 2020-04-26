{
    let _dataType = "file_base";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "listHome" }, { value: "基础文件" }],
        ...PUB.listCFCommon2,//展开公共配置


        singleBtns: {
            addon: [
                ...util.cfList.sBtns.arrAllBtns,
                util.cfList.sBtns.link,
            ]
        },



        //-------详情字段数组-------
        detailItems: ["_id", "title", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "fileKey", "_userId", "systemId"],
        //-------列配置数组-------
        columns: ["_id", "title_fixed_w150", "fileSource", "fileSize", "fileExt", "imgWidth", "imgHeight", "fileBucket", "link", "fileKey", "uploadTime", "systemId",],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "_userId"],
        //-------新增、修改表单字段数组-------
        formItems: [],

    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}






