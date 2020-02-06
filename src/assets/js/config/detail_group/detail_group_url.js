
let _dataType = "relation",
    _systemId = PUB._systemId;


//#region PUB.listCF.detail_group_url:分组下网址列表配置
PUB.listCF.detail_group_url = {
    isShowBreadcrumb: false,//面包屑
    idKey: "_id", //键名
    pageSize: 20,
    listIndex: "detail_group_url", //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
   
    // ...PUB.listCFCommon,//展开公共配置
    ...PUB.listCFCommon3,//展开公共配置
    batchBtns: {
        addon: [
            { uiType: "slot", slot: "slot_btn_select" },
            util.cfList.bBtns.add,
            util.cfList.bBtns.delete,

        ],
    },
    sortJsonDefault: {
        "sort": -1
    },
    findJsonDefault: {

    },
    objParamAddon: {
        findJson: {},

        _systemId,
        _dataType
    },
    //公共的附加参数，针对所有接口
    paramAddonPublic: {
        _systemId,
        _dataType
    },
    //dynamicDict动态数据字典配置
    dynamicDict: [
        DYDICT.note_category
    ],
    //-------列配置数组-------
    columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link, COLUMNS.sort],

    //-------筛选表单字段数组-------
    searchFormItems: [],
    //-------详情字段数组-------
    detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
    //-------新增、修改表单字段数组-------
    formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






}
//#endregion

