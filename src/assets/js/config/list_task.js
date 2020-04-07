
let _dataType = "task", _systemId = PUB._systemId;


PUB.listCF.list_task = {
    idKey: "_id", //键名
    pageSize: 20,
    listIndex: "list_task", //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    //dynamicDict动态数据字典配置
    dynamicDict: [
        DYDICT.personCharge,
    ],
    //新增修改表单的配置
    cfForm: {
        col_span: 12, //控制显示一行多列
    },
    breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "任务" }],
    ...PUB.listCFCommon2,//展开公共配置
    objParamAddon: { _systemId, _dataType },
    //公共的附加参数，针对所有接口
    paramAddonPublic: { _systemId, _dataType },
    detailItems: ["_id", "title", "taskType", "prior", "complete", "personCharge", "predictTime", "actualTime", "detail"],
    columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "personCharge", "predictTime", "actualTime"],
    searchFormItems: ["title_search", "taskType", "prior", "personCharge",],
    formItems: ["title", "taskType_radio", "prior_radio", "complete", "personCharge", "predictTime", "actualTime", "detail_new", "relNoteList"],

}
PUB.listCF.list_task_my = lodash.cloneDeep(PUB.listCF.list_task);

PUB.listCF.list_task_my = {
    ...PUB.listCF.list_task_my,
    isShowBreadcrumb: false,//面包屑
    detailItems: ["_id", "title", "taskType", "prior", "complete", "predictTime", "actualTime"],
    columns: ["_id", "title_fixed_edit", "taskType", "prior", "complete_com", "predictTime", "actualTime"],
    searchFormItems: ["title", "taskType", "prior",],
}

//调用：{改造列表字段配置形式的函数（字符串转对象）}
util.reformCFListItem(PUB.listCF.list_task)

util.reformCFListItem(PUB.listCF.list_task_my)