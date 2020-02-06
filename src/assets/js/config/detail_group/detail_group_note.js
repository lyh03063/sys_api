
let _dataType = "relation",
    _systemId = PUB._systemId;
//#region PUB.listCF.detail_group_note:分组下笔记列表配置
PUB.listCF.detail_group_note = {
    isShowBreadcrumb: false,//面包屑
    isShowSearchForm: false,//查询表单-这个去掉会筛选所有数据

    idKey: "_id", //键名
    pageSize: 20,
    listIndex: "detail_group_note", //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦
    ...PUB.listCFCommon,//展开公共配置
    //批量操作按钮的配置
    batchBtns: {

        addon: [
            { uiType: "slot", slot: "slot_btn_select" },
            util.cfList.bBtns.add,
            util.cfList.bBtns.delete,
            { uiType: "slot", slot: "slot_in_toolbar" }
        ],
    },
    //列表单项操作按钮的配置
    singleBtns: {
        addon: [
            util.cfList.sBtns.detail,
            util.cfList.sBtns.modify,
            util.cfList.sBtns.copy,
            util.cfList.sBtns.delete,
            {
                uiType: "link",
                text: "查看详情",
                target: "_blank",
                //地址格式函数
                urlFormatter: function (row) {
                    return `#/detail_data?dataId=${row._idRel2}`;
                },
            }
        ]
    },
    sortJsonDefault: {
        "sort": -1
    },
    // findJsonDefault: {

    // },
    objParamAddon: {
        findJson: {},//用了这个就不要使用findJsonDefault
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
    columns: [
        // COLUMNS._idRel2,
        COLUMNS.title_fixed,
        // COLUMNS.desc,

        COLUMNS.familiarity_select, COLUMNS.importance, COLUMNS.difficulty,
        COLUMNS.category_multiple,
        COLUMNS.sort,
    ],
    //-------筛选表单字段数组-------
    searchFormItems: [F_ITEMS.importance],
    //-------详情字段数组-------
    detailItems: [D_ITEMS.title, D_ITEMS.detail, D_ITEMS.desc, D_ITEMS.category, D_ITEMS.importance, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
    //-------新增、修改表单字段数组-------
    formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]






}
//#endregion
