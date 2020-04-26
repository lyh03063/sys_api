{
  let _dataType = "file";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "文件" }],
    ...PUB.listCFCommon2,//展开公共配置

    columnOperate: { "min-width": 320 },
    singleBtns: {
      addon: [
        ...util.cfList.sBtns.arrAllBtns,
        util.cfList.sBtns.download,
        util.cfList.sBtns.openFile,
      ]
    },
    cfForm: {
      col_span: 12, //控制显示一行多列
      watch: PUB.cfForm.watch.file 
    },



    //-------详情字段数组-------
    detailItems: ["_id", "title", "file", "_userId"],
    //-------列配置数组-------
    columns: ["_id", "title_fixed_edit", "file", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search", "_userId"],
    //-------新增、修改表单字段数组-------
    formItems: ["title", "file"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}






