


//#region 简历-项目经历
{
    let _dataType = "resume_project_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "简历-项目经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["title", "desc", "link"],
        columns: ["title_fixed", "_id", "desc", "link"],
        searchFormItems: ["title_search"],
        formItems: ["title", "link", "desc", "album"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion


//#region 简历-工作经历
{
    let _dataType = "resume_work_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "简历-工作经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
        columns: ["companyName", "positionName", "onJobPeriod", "descJob"],
        searchFormItems: ["companyName"],
        formItems: ["companyName", "positionName", "onJobPeriod", "descJob"],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion


//#region 简历-教育经历
{
    let _dataType = "resume_education_experience";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "简历-教育经历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
        columns: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
        searchFormItems: ["schoolName"],
        formItems: ["schoolName","inSchoolPeriod","diploma","professionalName", ],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion



//#region 字段-我的项目经历
{
    let prop = "relProjectExperience", objBase = { label: "我的项目经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 100, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "项目经历", valueKey: "_id", labelKey: "title",
            multiple: true, //多选
            selectJson: { _id: 1, title: 1, desc: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_project_experience)
        }
    };
}
//#endregion

//#region 字段-我的工作经历
{
    let prop = "relWorkExperience", objBase = { label: "我的工作经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 70, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "工作经历", valueKey: "_id", labelKey: "companyName", multiple: true, //多选
            selectJson: { _id: 1, companyName: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_work_experience)
        }
    };
}
//#endregion

//#region 字段-我的教育经历
{
    let prop = "relEducationExperience", objBase = { label: "我的教育经历", prop, }
    D_ITEMS[prop] = { ...objBase, };
    COLUMNS[prop] = { ...objBase, width: 70, };
    F_ITEMS[prop] = { ...objBase, type: "input" };
    F_ITEMS[prop] = {
        ...objBase, type: "select_list_data",
        cfSelectList: {//选择列表配置
            dataName: "教育经历", valueKey: "_id", labelKey: "schoolName", multiple: true, //多选
            selectJson: { _id: 1, schoolName: 1, }, //需要保留的集合字段
            cfList: util.deepCopy(PUB.listCF.list_resume_education_experience)
        }
    };
}
//#endregion

//#region 简历-放最下面，因为要引用上面的列表配置
{
    let _dataType = "resume";
    let listCFAddon = {
        breadcrumb: [{ value: "首页", path: "#/listHome" }, { value: "简历" }],
        ...PUB.listCFCommon2,//展开公共配置
        detailItems: ["trueName", "phone", "email", "desc", "avatarImg",
        "relWorkExperience", "relProjectExperience","relEducationExperience",],
        columns: ["trueName", "phone", "email", "desc", "avatarImg",],
        searchFormItems: ["trueName_search"],
        formItems: ["trueName", "phone", "email", "desc", "avatarImg",
         "relWorkExperience", "relProjectExperience","relEducationExperience",],
    }
    util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}
//#endregion


