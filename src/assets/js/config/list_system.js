{
  let _dataType = "system";
  let listCFAddon = {
    breadcrumb: [ { value: "首页", path: "#/listHome" }, { value: "系统" } ],


    ...PUB.listCFCommon2,//展开公共配置
    singleBtns: {
      addon: [
        util.cfList.sBtns.detail,
        util.cfList.sBtns.modify,
        util.cfList.sBtns.delete,
        util.cfList.sBtns.goSystem
      ]
    },


    //-------详情字段数组-------
    detailItems: ["_id", "title","systemId", "desc", "_userId"],
    //-------列配置数组-------
    columns: ["CreateTime","_id","title_fixed_edit", "systemId","desc", "_userId"],
    //-------筛选表单字段数组-------
    searchFormItems: ["title_search","systemId", ],
    //-------新增、修改表单字段数组-------
    formItems: ["title","systemId","logoSrc","iconSrc",   "desc"],

  }
  util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
}






