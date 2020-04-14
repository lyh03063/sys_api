
{
    let _dataType = "image";
    let listCFAddon = {
        breadcrumb: [ { value: "首页", path: "#/listHome" }, { value: "图片" } ],
        ...PUB.listCFCommon2,//展开公共配置
        //cfForm新增修改表单的配置
        cfForm: {
            col_span: 12, //控制显示一行多列
        },
        singleBtns: {
            addon: [
                util.cfList.sBtns.detail, util.cfList.sBtns.modify, util.cfList.sBtns.delete,
                 util.cfList.sBtns.download, util.cfList.sBtns.openFile,
            ]
        },
        //-------详情字段数组-------
        detailItems: ["_id", "title", "imagePreview", "file", "_userId"],
        //-------列配置数组-------
        columns: ["_id", "imagePreview", "title", "file", "_userId"],
        //-------筛选表单字段数组-------
        searchFormItems: ["title_search", "_userId"],
        //-------新增、修改表单字段数组-------
        formItems: ["title", "file"],
  
    }
    util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
  }
  

