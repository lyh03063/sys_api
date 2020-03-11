

//#region 基本配置
window.PUB = window.PUB || {}
PUB.domain__ = "http://localhost:3000"
PUB.domain = "https://www.dmagic.cn"
//PUB.domain = 'http://test.dmagic.cn'






PUB.arrRouteListPage = PUB.arrRouteListName.map((item) => {
  return {
    path: `/${item}`,
    component: () => import(`@/page/${item}`)
  }
})


PUB.arrRouteListPageForStudy = PUB.arrRouteListName.map((item) => {
  return {
    path: `${item}`,
    component: () => import(`@/page/${item}`)
  }
})


//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: () => import("@/page/detail_group") },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
{ path: '/detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
{
  path: '/study_home', component: () => import("@/page/study_home"),
  children: [//子路由
    { path: 'study_user', component: () => import("@/page/study_user") },
    { path: 'search_result', component: () => import("@/page/search_result") },
    { path: 'detail_group_g_card', component: () => import("@/page/detail_group_g_card") },
    { path: 'detail_g_card_link', component: () => import("@/page/detail_g_card_link") },
    ...PUB.arrRouteListPageForStudy
  ]
},]
//#endregion





PUB.$sys = PUB.$sys || util.getLocalStorageObj(PUB._systemId) || {}; //调用：{从LocalStorage获取一个对象的函数}

MIX.base = {

  data() {
    return {

    };
  },
  computed: {
    $sys() {
      let sys = util.getLocalStorageObj(PUB._systemId)//调用：{从LocalStorage获取一个对象的函数}

      return sys
    },


  },

  methods: {
    //函数：{根据权限路径返回当前用户权限的函数}
    $power(powerPath) {
      return lodash.get(WIN.rolePower, `${powerPath}`);
    },
    //函数：{返回数据字典标签函数}
    $dictLable(key, val) {
      return util.getDictLabel(key, val)
    },

  },
  async created() {

  }
}
//#endregion





//#region 列表模块名数组配置 


//#region 列表模块名数组配置
PUB.arrListName = ["html_api", "html_api_category", "css_api", "css_api_category", "js_api",
  "js_api_category", "familiarity", "exercises", "score", "front_demo"];
//#endregion



//#endregion
//#region 分组下的demo列表页
{
  let _dataType = "relation";


  PUB.listCF.detail_group_front_demo = {
    isShowBreadcrumb: false, //面包屑
    isShowSearchForm: false, //查询表单-
    idKey: "_id", //键名
    pageSize: 20,
    listIndex: "detail_group_front_demo", //vuex对应的字段~
    focusMenu: true, //进行菜单聚焦

    // ...PUB.listCFCommon,//展开公共配置
    ...PUB.listCFCommon3, //展开公共配置
    singleBtns: PUB.singleBtns_copy_detail_sort,
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

    //-------列配置数组-------
    columns: [COLUMNS.title_fixed, COLUMNS._id, COLUMNS.desc, COLUMNS.link, COLUMNS.sort],

    //-------筛选表单字段数组-------
    searchFormItems: [],
    //-------详情字段数组-------
    detailItems: [D_ITEMS.title, D_ITEMS.desc, D_ITEMS.countData, D_ITEMS._id, D_ITEMS._idRel, D_ITEMS._idRel2, D_ITEMS.sort],
    //-------新增、修改表单字段数组-------
    formItems: [F_ITEMS._idRel, F_ITEMS._idRel2, F_ITEMS.sort,]

  }

}
//#endregion




//#region 菜单列表
//完整的菜单列表
PUB.menuList = [
  {
    //菜单
    index: "listHome",
    route: "/listHome",
    icon: "el-icon-house",
    title: "首页"
  },
  {
    index: "apiCenter",
    icon: "el-icon-document",
    title: "API手册",
    menuItem: [
      {
        index: "list_html_api",
        route: "/list_html_api",
        title: "Html-API"
      },
      {
        index: "list_css_api",
        route: "/list_css_api",
        title: "Css-API"
      },
      {
        index: "list_js_api",
        route: "/list_js_api",
        title: "Javascript-API"
      },
      {
        index: "list_note",
        route: "/list_note",
        title: "笔记"
      },
      {
        index: "list_front_demo",
        route: "/list_common?type=front_demo",
        title: "前端demo"
      },
      {
        index: "list_vedio",
        route: "/list_common?type=vedio",
        title: "视频"
      },
      {
        index: "list_exercises",
        route: "/list_common?type=exercises",
        title: "习题"
      },
      {
        index: "list_url",
        route: "/list_common?type=url",
        title: "网址"
      }
    ]
  },
  {
    index: "otherData",
    icon: "el-icon-document",
    title: "其他数据",
    menuItem: [
      {
        index: "list_group",
        route: "/list_common?type=group",
        title: "分组"
      },
      {
        index: "list_score",
        route: "/list_common?type=score",
        title: "记分项"
      },
      {
        index: "list_html_api_category",
        route: "/list_common?type=html_api_category",
        title: "Html-API分类"
      },
      {
        index: "list_css_api_category",
        route: "/list_common?type=css_api_category",
        title: "Css-API分类"
      },
      {
        index: "list_js_api_category",
        route: "/list_common?type=js_api_category",
        title: "Javascript-API分类"
      },
      {
        index: "list_note_category",
        route: "/list_common?type=note_category",
        title: "笔记分类"
      }
    ]
  },
  {
    index: "systemManage",
    icon: "el-icon-setting",
    title: "系统管理",
    menuItem: [
      {
        index: "list_data_type",
        route: "/list_common?type=data_type",
        title: "数据类型"
      },
      {
        index: "list_all",
        route: "/list_common?type=all",
        title: "所有数据"
      },
      {
        index: "list_relation",
        route: "/list_common?type=relation",
        title: "关系数据"
      },
      {
        index: "list_familiarity",
        route: "/list_common?type=familiarity",
        title: "熟悉度"
      },
      {
        index: "list_admin",
        route: "/list_common?type=admin",
        title: "管理员"
      },
      { index: "list_role", route: "/list_role", title: "角色" }
    ]
  }
];
//#endregion



//调用：{初始化列表权限函数}
let fnInitList = async function () {
  //***循环异步-导入一些本站专用的数据列表配置，注意这里用map不能用forEach
  await Promise.all(PUB.arrListName.map(async itemEach => {//循环：{列表模块名数组}
    await import(`@/assets/js/config/list_${itemEach}.js`);
  }))


  //#region 【注意顺序】权限表单项，从菜单遍历拼接！！！

  let cfFormForPower = { labelWidth: "150px", formItems: [] }

  PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
    let { index: index_1, menuItem, title } = menuEach_1;

    let { formItems } = cfFormForPower

    let objMenu1 = {
      label: title,
      prop: index_1,
      style: styleMenuGPowerItem,
      default: {},
      cfForm: {
        col_span: 12,
        formItems: []
      }
    }

    if (!menuItem) return;
    menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
      let { index: index_2, title } = menuEach_2;
      if (!index_2) return;
      let objMenu2 = {
        prop: index_2,
        style: styleMenuPowerItem,
        cfForm: getFormMenuGPower({ menuName: title })
      }
      objMenu1.cfForm.formItems.push(objMenu2)
    })

    formItems.push(objMenu1)

  })

  //【】加入分组数据列表的权限选项*****
  cfFormForPower.formItems.push(
    {
      label: '分组数据列表',
      prop: "groupDataList",
      style: styleMenuGPowerItem,
      default: {},
      cfForm: {
        col_span: 12,
        formItems: [
          {
            prop: "all",
            style: styleMenuPowerItem,
            cfForm: getFormMenuGPower({ menuName: "所有分组数据" })
          }
        ]
      }
    }
  )

  let rolePower = {
    ...D_ITEMS.rolePower,
    default: {},
    cfForm: cfFormForPower
  };




  //****这里通过合并而不是直接赋值，来影响引进引用了F_ITEMS.rolePower的列表页配置
  Object.assign(F_ITEMS.rolePower, rolePower);//合并对象




  //#endregion




  //#region 【注意位置】菜单项批量添加权限路径

  PUB.menuList.forEach(menuEach_1 => {//循环：{1级菜单}
    let { index: index_1, menuItem } = menuEach_1;
    if (!menuItem) return;
    menuItem.forEach(menuEach_2 => {//循环：{2级菜单}
      let { index: index_2 } = menuEach_2;
      if (!index_2) return;

      lodash.set(PUB.listCF, `${index_2}.powerPath`, `${index_1}.${index_2}`);//设置权限路径
    })

  })


  //变量：{分组数据列表页面配置名称数组}
  let arrGroupName = ["detail_group_front_demo", "detail_group_note", "detail_group_url", "detail_group_vedio", "aaaa", "aaaa", "aaaa",]
  //*** */
  arrGroupName.forEach(nameEach => {//循环：{分组数据列表页面配置名称数组}
    if (!PUB.listCF[nameEach]) return;
    PUB.listCF[nameEach].powerPath = `groupDataList.all`//设置权限路径
  })



  //#endregion





}

fnInitList()









//#region 【临时字段，页面配置-注意位置】


D_ITEMS.scoreKey = {
  label: "记分key",
  prop: "scoreKey",
};
COLUMNS.scoreKey = { ...D_ITEMS.scoreKey, width: 120, };
F_ITEMS.scoreKey = {...D_ITEMS.scoreKey,};




D_ITEMS.aaaa = {
  label: "记分key",
  prop: "scoreKey",
};
COLUMNS.aaaa = { ...D_ITEMS.aaaa, width: 120, };
F_ITEMS.aaaa = {...D_ITEMS.aaaa,};




//#endregion


//函数：{更新分组的用户学习缓存数据函数}
FN.updateGroupUserScore = async function ({ groupId, score }) {
  //变量：{对应的分组id}
  if (!groupId) return;
  let urlModify = PUB.listCF.list_familiarity.url.modify;
  let ajaxParam = {
    _idRel: groupId,
    findJson: { _idRel: groupId, _userId: PUB.$sys.userId }, //用户名
    _data: {
      _idRel: groupId,
      _userId: PUB.$sys.userId,
      score,
      dataType: "group"
    }
  };
  Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
  await axios({
    //请求接口
    method: "post",
    url: PUB.domain + urlModify,
    data: ajaxParam //传递参数
  });
}



//函数：{更新记分项缓存数据函数}
FN.updateItemScore = async function ({ scoreKey, score }) {
  //变量：{对应的分组id}
  if (!scoreKey) return;
  let urlModify = PUB.listCF.list_score.url.modify;
  let ajaxParam = {
    findJson: { scoreKey, _userId: PUB.$sys.userId }, //用户名
    _data: {
      _userId: PUB.$sys.userId,
      score, scoreKey
    }
  };
  Object.assign(ajaxParam, PUB.listCF.list_score.paramAddonPublic); //合并公共参数
  await axios({
    //请求接口
    method: "post",
    url: PUB.domain + urlModify,
    data: ajaxParam //传递参数
  });
}



export default {}