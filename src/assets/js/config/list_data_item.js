

DYDICT.arr_varType = [
  { label: "字符串", value: "string" },
  { label: "数值", value: "number" },
  { label: "布尔", value: "boolean" },
  { label: "对象", value: "object" },
  { label: "数组", value: "array" },
  { label: "函数", value: "function" },

]
DYDICT.varType = lodash.keyBy(DYDICT.arr_varType, 'value')

//#region JS数据类型
{
  let prop = "varType", objBase = { label: "JS数据类型", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "select" };
  F_ITEMS[prop] = { ...objBase, type: "select", options: DYDICT.arr_varType };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


F_ITEMS.collection_DYDICT_value = {
  label: "值项",
  prop: "arrItem",
  type: "collection",
  cfElBtnAdd: {
    //自定义“新增”按钮
    text: "+添加一组",
    type: "primary",
    size: "mini",
    plain: false
  },
  collectionCfForm: {
    col_span: 8,
    formItems: [{
      label: "标签名",
      prop: "label",
    },
    {
      label: "值",
      prop: "value"
    }
    ]
  }
};



//#region 静态数据字典配置
{
  let prop = "cfDict", objBase = { label: "静态数据字典配置", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, type: "input",
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 8, //控制显示一行多列
      formItems: [
        F_ITEMS.varType,
        F_ITEMS.collection_DYDICT_value

      ]
    }
  };
}
//#endregion


//#region 对象的附加字段！！！万能
{
  let prop = "objAddonItem", objBase = { label: "附加字段", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, 
    col_span: 24, //控制显示一行多列
    type: "collection",
    cfElBtnAdd: {
      //自定义“新增”按钮
      text: "+添加一组",
      type: "primary",
      size: "mini",
      plain: false
    },
    collectionCfForm: {
      col_span: 12,
      formItems: [
        { label: "字段key", prop: "key", },
        { label: "字段说明", prop: "desc", },
        F_ITEMS.varType,
        { label: "字段值", prop: "value", type: "textarea" },


      ]
    }
  };
}
//#endregion



//#region 动态数据字典-填充列key
{
  let prop = "dyDict_populateColumn", objBase = { label: "填充列key", prop: "populateColumn", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
}
//#endregion
//#region 动态数据字典-idColumn
{
  let prop = "dyDict_idColumn", objBase = { label: "idColumn", prop: "idColumn", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
}
//#endregion
//#region 动态数据字典-idColumn2
{
  let prop = "dyDict_idColumn2", objBase = { label: "idColumn2", prop: "idColumn2", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
}
//#endregion



//#region 动态数据字典-ajax参数
{
  let prop = "dyDict_ajax_param", objBase = { label: "ajax参数", prop: "param", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "jsonEditor" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion
//#region 动态数据字典-ajax地址
{
  let prop = "dyDict_ajax_url", objBase = { label: "ajax地址", prop: "url", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 动态数据字典-ajax
{
  let prop = "dyDict_ajax", objBase = { label: "ajax配置", prop: "ajax", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, type: "input",
    col_span: 24, //控制显示一行多列
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 8, //控制显示一行多列
      formItems: [
        F_ITEMS.dyDict_ajax_param,
        F_ITEMS.dyDict_ajax_url,

      ]
    }
  };
}
//#endregion






//#region 动态数据字典配置
{
  let prop = "cfDyDict", objBase = { label: "动态数据字典配置", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, type: "input",
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 8, //控制显示一行多列
      formItems: [
        F_ITEMS.dyDict_populateColumn,
        F_ITEMS.dyDict_idColumn,
        F_ITEMS.dyDict_idColumn2,
        F_ITEMS.dyDict_ajax,

      ]
    }
  };
}
//#endregion

//#region 表单字段类型
{
  let prop = "fItemType", objBase = { label: "表单字段类型", prop: "type", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 配置组件名称
{
  let prop = "componentName", objBase = { label: "配置组件名称", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion
//#region 配置插槽名称
{
  let prop = "slotName", objBase = { label: "配置插槽名称", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion




//#region formatter
{
  let prop = "formatter", objBase = { label: "formatter函数", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "textarea" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region default默认值
{
  let prop = "defaultValue", objBase = { label: "默认值", prop: "default", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "textarea" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 子表单配置
{
  let prop = "cfFormSon", objBase = { label: "子表单配置", prop: "cfForm", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "jsonEditor" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion


//#region 字段跨度
{
  let prop = "item_col_span", objBase = { label: "字段跨度", prop: "col_span", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "number" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion

//#region 字段style样式对象
{
  let prop = "item_style", objBase = { label: "style样式", prop: "style", }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "jsonEditor" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion
//#region 0000
{
  let prop = "aaaa", objBase = { label: "0000", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion
//#region 0000
{
  let prop = "aaaa", objBase = { label: "0000", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = { ...objBase, type: "input" };
  // F_ITEMS[`${prop}_search`] = { ...objBase, type: "input_find_vague" };
}
//#endregion



//#region 详情字段配置
{
  let prop = "cfDItem", objBase = { label: "详情字段配置", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, type: "input",
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 6, //控制显示一行多列
      formItems: [

        F_ITEMS.item_label,F_ITEMS.slotName,F_ITEMS.componentName,F_ITEMS.formatter,
        F_ITEMS.objAddonItem,


      ]
    }
  };
}
//#endregion



//#region 列字段配置
{
  let prop = "cfCItem", objBase = { label: "列字段配置", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, 
    col_span: 24, //控制显示一行多列
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 6, //控制显示一行多列
      formItems: [

        F_ITEMS.item_label,F_ITEMS.slotName,F_ITEMS.componentName,F_ITEMS.formatter,
        F_ITEMS.objAddonItem,


      ]
    }
  };
}
//#endregion
//#region 表单字段配置
{
  let prop = "cfFItem", objBase = { label: "表单字段配置", prop, }
  D_ITEMS[prop] = { ...objBase, };
  COLUMNS[prop] = { ...objBase, width: 70, };
  F_ITEMS[prop] = {
    ...objBase, type: "input",
    default: {}, //默认值必须要有，否则新增的时候会出问题
    cfForm: {
      col_span: 6, //控制显示一行多列
      formItems: [

        F_ITEMS.item_label, F_ITEMS.varType, F_ITEMS.fItemType, F_ITEMS.slotName,
        F_ITEMS.item_style, F_ITEMS.defaultValue, F_ITEMS.cfFormSon,
        F_ITEMS.item_col_span, F_ITEMS.componentName,
        F_ITEMS.objAddonItem,

      ]
    }
  };
}
//#endregion

{
  let _dataType = "data_item";
  let listCFAddon = {
    breadcrumb: [{ value: "首页", path: "listHome" }, { value: "数据字典" }],
    ...PUB.listCFCommon2,//展开公共配置
    //-------详情字段数组-------
    detailItems: ["title",],
    //-------列配置数组-------
    columns: ["item_prop", "item_label","desc", ],
    //-------筛选表单字段数组-------
    searchFormItems: ["label_search", "item_prop",],
    //-------新增、修改表单字段数组-------
    formItems: ["item_prop", "item_label","desc", "cfDict", "cfDyDict", "cfDItem", "cfCItem", "cfFItem", "objAddonItem"],

  }
  util.handleCommonListCF({ _dataType, listCFAddon })//调用：{处理通用列表配置数据函数}
}


