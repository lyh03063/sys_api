

{
    let _dataType = "task";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "任务" }],
        //dynamicDict动态数据字典配置
        dynamicDict: [
            DYDICT.personCharge,
        ],
        //新增修改表单的配置
        cfForm: {
            col_span: 12, //控制显示一行多列
        },

        ...PUB.listCFCommon2,//展开公共配置
        objParamAddon: {  _dataType },
        //公共的附加参数，针对所有接口
        paramAddonPublic: { _dataType },
        detailItems: ["_id", "title", "taskType", "prior", "complete", "personCharge", "predictTime", "actualTime", "detail"],
        columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime"],
        searchFormItems: ["title_search","complete_search", "taskType", "prior", "personCharge",],
        formItems: ["title", "taskType_radio", "prior_radio", "complete", "personCharge", "predictTime", "actualTime", "detail_new", "relNoteList"],
  
    }
    util.handleCommonListCF({_dataType, listCFAddon})//调用：{处理通用列表配置数据函数}
  }
  



{
    PUB.listCF.list_task_my = lodash.cloneDeep(PUB.listCF.list_task);//**** */
    let listIndex = `list_task_my`
    PUB.listCF[listIndex] = {
        ...PUB.listCF.list_task_my,
        isShowBreadcrumb: false,//面包屑
        detailItems: ["_id", "title", "taskType", "prior", "complete", "predictTime", "actualTime"],
        columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "predictTime", "actualTime"],
        searchFormItems: ["title","complete_search", "taskType", "prior",],
    }


    util.reformCFListItem(PUB.listCF[listIndex])
}

