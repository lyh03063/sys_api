{
  let _dataType = "file";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "#/listHome" }, { value: "文件" } ],
    ...PUB.listCFCommon2,//展开公共配置
  
    
    singleBtns: {
      addon: [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.delete,
        util.cfList.sBtns.download,
        util.cfList.sBtns.openFile,
      ]
    },
  

    //-------详情字段数组-------
    detailItems: ["_id", "title", "file", "_userId"],
    //-------列配置数组-------
    columns: ["_id","title_fixed_edit", "file", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["title",  "file"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}






