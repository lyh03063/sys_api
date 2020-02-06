let _systemId = PUB._systemId;
import "@/assets/js/config_detail.js"
window.F_ITEMS = {};
//#region 唐球过来
F_ITEMS.Id = {
  label: "数据id",
  prop: "P1",
  type: "input"
};
F_ITEMS.payStatus = {
  label: "支付状态",
  prop: "payStatus",
  type: "select",
  options: [
    { label: "已支付", value: 2 },
    { label: "未支付", value: 1 }
  ]
};
F_ITEMS.auditStatus = {
  label: "审核状态",
  prop: "auditStatus",
  type: "select",
  options: [
    { label: "未审核", value: 1 },
    { label: "审核不通过", value: 2 },
    { label: "审核通过", value: 3 }
  ]
};
F_ITEMS.publicationStatus = {
  label: "发布状态",
  prop: "publicationStatus",
  type: "select",
  options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
};
F_ITEMS.album = {
  label: "相册",
  prop: "album",
  type: "upload",
  col_span: 24, //控制显示一行多列
  // tips: "可上传多张图"
};
/****************************赛事报名-START****************************/
F_ITEMS.phone = {
  label: "手机号",
  prop: "phone",
  type: "input"
};
F_ITEMS.sex = {
  label: "性别",
  prop: "sex",
  type: "select",
  options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
};
F_ITEMS.age = {
  label: "年龄",
  prop: "age",
  type: "input"
};
F_ITEMS.career = {
  label: "职业",
  prop: "career",
  type: "input"
};
F_ITEMS.idCard = {
  label: "身份证号",
  prop: "idCard"
};
//#endregion
//#region 通用数据
F_ITEMS.title = { ...D_ITEMS.title };
F_ITEMS.title_search = { ...D_ITEMS.title, type: "input_find_vague" };
F_ITEMS.desc = { ...D_ITEMS.desc, type: "textarea" };
F_ITEMS.detail = { ...D_ITEMS.detail, type: "editorTM" };

F_ITEMS._data = { ...D_ITEMS._data, type: "jsonEditor" };
F_ITEMS.countGroup = { ...D_ITEMS.countGroup, type: "number" };
//#endregion
//#region html_api
F_ITEMS.html_display = {
  ...D_ITEMS.html_display, type: "select",
  options: DYDICT.arr_html_display
};
F_ITEMS.importance = {
  ...D_ITEMS.importance, type: "select",
  options: DYDICT.arr_importance
};
F_ITEMS.importance_radio = {
  ...F_ITEMS.importance, type: "radio"
};


F_ITEMS.difficulty = {
  ...D_ITEMS.difficulty, type: "select",
  options: DYDICT.arr_difficulty
};
F_ITEMS.difficulty_radio = {
  ...F_ITEMS.difficulty, type: "radio"
};



F_ITEMS.english = {
  ...D_ITEMS.english, type: "input",
};
F_ITEMS.html_version = {
  ...D_ITEMS.html_version, type: "select",
  options: DYDICT.arr_html_version
};
F_ITEMS.selfClose = {
  ...D_ITEMS.selfClose, type: "select",
  options: DYDICT.arr_selfClose
};
F_ITEMS.demoList = {
  ...D_ITEMS.demoList,
  type: "collection",
  collectionlistType: "form",
  // showToolbar: false, //不显示集合的工具栏
  collectionCfForm: {
    col_span: 12,
    formItems: [
      {
        label: "标题",
        prop: "title",
        type: "input"
      },
      {
        label: "链接",
        prop: "link",
        type: "input"
      },
    ]
  }
};


//#endregion
//#region 分类
F_ITEMS.cateIdOld = { ...D_ITEMS.cateIdOld, type: "input" };
F_ITEMS.category_name = { ...D_ITEMS.category_name, type: "input" };
F_ITEMS.category_remark = { ...D_ITEMS.category_remark, type: "textarea" };
F_ITEMS.category = { ...D_ITEMS.category, type: "input" };
F_ITEMS.html_api_category = {
  ...D_ITEMS.category,
  type: "select",
  ajax: {
    param: { _systemId, _dataType: "html_api_category" },
    url: "/info/getCommonList",
    keyLabel: "title",
    keyValue: "_id"
  }
};
F_ITEMS.css_api_category = {
  ...D_ITEMS.category,
  type: "select",
  ajax: {
    param: { _systemId, _dataType: "css_api_category" },
    url: "/info/getCommonList",
    keyLabel: "title",
    keyValue: "_id"
  }
};
F_ITEMS.js_api_category = {
  ...D_ITEMS.category,
  type: "select",
  ajax: {
    param: { _systemId, _dataType: "js_api_category" },
    url: "/info/getCommonList",
    keyLabel: "title",
    keyValue: "_id"
  }
};



F_ITEMS.note_category = {
  ...D_ITEMS.category,
  type: "select",
  multiple: true, //多选
  ajax: {
    param: { _systemId, _dataType: "note_category" },
    url: "/info/getCommonList",
    keyLabel: "title",
    keyValue: "_id"
  }
};
//#endregion
//#region 熟悉度
F_ITEMS.familiarity = { ...D_ITEMS.familiarity, type: "input" };
F_ITEMS.dataType = { ...D_ITEMS.dataType, type: "input" };
F_ITEMS.dataId = { ...D_ITEMS.dataId, type: "input" };
F_ITEMS.userId = { ...D_ITEMS.userId, type: "input" };
F_ITEMS._userId = { ...D_ITEMS._userId, type: "input" };
//数据类型
F_ITEMS.dataTypekey = { ...D_ITEMS.dataTypekey, type: "input" };
//#endregion
//#region 分组
F_ITEMS.group_dataType = {
  ...D_ITEMS.group_dataType,
  type: "select",
  ajax: {
    param: { _systemId, _dataType: "data_type" },
    url: "/info/getCommonList",
    keyLabel: "title",
    keyValue: "key"
  }
};
F_ITEMS.alias = { ...D_ITEMS.alias, type: "input", };
//#endregion
//#region 关系
F_ITEMS._idRel = { ...D_ITEMS._idRel, type: "input" };
F_ITEMS._idRel2 = { ...D_ITEMS._idRel2, type: "input" };
F_ITEMS.sort = { ...D_ITEMS.sort, type: "number" };
//#endregion
//#region 管理员
F_ITEMS.userName = { ...D_ITEMS.userName, type: "input" };
F_ITEMS.passWord = { ...D_ITEMS.passWord, type: "passWord" };
F_ITEMS.nickName = { ...D_ITEMS.nickName, type: "input" };
F_ITEMS.role = { ...D_ITEMS.role, type: "jsonEditor" };
//#endregion
//#region 角色
let styleMenuPowerItem = `margin-bottom:10px;padding:0 5px`;
let styleMenuGPowerItem = `margin-bottom:0;border:none;padding:0`;
//函数定义：{获取菜单权限表单配置函数}
function getFormMenuGPower({ menuName = "XXX" }) {
  return {
    col_span: 4,
    labelWidth: "10px",
    formItems: [
      {
        label: "",
        prop: "menuName",
        default: menuName,
        col_span: 4,
        type: "text"
      },
      {
        label: "",
        prop: "add",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "添加" }]
      },
      {
        label: "",
        prop: "modify",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "修改" }]
      },
      {
        label: "",
        prop: "search",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "查询" }]
      },
      {
        label: "",
        prop: "delete",
        col_span: 3,
        type: "checkbox",
        default: false,
        options: [{ value: "1", label: "删除" }]
      }
    ]
  };
}
COLUMNS.roleName = { ...D_ITEMS.roleName, type: "input" };
COLUMNS.rolePower = {
  ...D_ITEMS.rolePower,
  default: {},
  cfForm: {
    labelWidth: "150px",
    formItems: [
      {
        label: "资讯中心",
        prop: "newsCenter",
        style: styleMenuGPowerItem,
        default: {},
        cfForm: {
          col_span: 12,
          formItems: [
            {
              // label: "资讯列表",
              prop: "list_article",
              style: styleMenuPowerItem,
              cfForm: getFormMenuGPower({ menuName: "资讯列表" })
            },
            {
              // label: "资讯分类",
              prop: "list_article_category",
              style: styleMenuPowerItem,
              cfForm: getFormMenuGPower({ menuName: "资讯分类" })
            },
          ]
        }
      },
      {
        label: "系统管理",
        prop: "systemManage",
        style: styleMenuGPowerItem,
        default: {},
        cfForm: {
          col_span: 12,
          formItems: [
            {
              prop: "list_admin",
              style: styleMenuPowerItem,
              cfForm: getFormMenuGPower({ menuName: "管理员" })
            },
            {
              prop: "list_role",
              style: styleMenuPowerItem,
              cfForm: getFormMenuGPower({ menuName: "角色" })
            },
            {
              prop: "list_area",
              style: styleMenuPowerItem,
              cfForm: getFormMenuGPower({ menuName: "地区管理" })
            },
          ]
        }
      }
    ]
  }
};
//#endregion



//#region 笔记
F_ITEMS.keyword = { ...D_ITEMS.keyword, type: "tag_list" };

//#endregion
//#region 网址
F_ITEMS.link = { ...D_ITEMS.link, type: "input" };
//#endregion


F_ITEMS.vedio = {
  ...D_ITEMS.vedio,
  type: "upload",
  uploadConfig: {
    limit: 2,
    listType: "text"
  }
};



// import list_note_for_select from "@/assets/js/config/list_note.js"
// //#region 笔记
// F_ITEMS.note_linkList = { ...D_ITEMS.note_linkList, 
//   type: "select_list_data",
//   cfSelectList: {
//     //选择列表配置
//     dataName: "球员",
//     valueKey: "P1",
//     labelKey: "name",
//     pageName: "tangball_member",
//     cfList: list_note_for_select
//   },
//  };

//#endregion
F_ITEMS.aaaa = 11111;
