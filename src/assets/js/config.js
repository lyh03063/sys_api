

//#region 基本配置
window.PUB = window.PUB||{} 
//PUB.domain = "http://localhost:3000"
PUB.domain = "http://120.76.160.41:3000"
//PUB.domain = 'http://test.dmagic.cn'









//附加的一级路由
PUB.arrRouteAddon = [{ path: '/detail_group', component: () => import("@/page/detail_group") },
{ path: '/detail_data', component: () => import("@/page/detail_data") },
{ path: '/detail_group_g_card', component: () => import("@/page/detail_group_g_card") },]
//#endregion


PUB.arrListName.forEach(itemEach=>{//循环：{列表模块名数组}
  import(`@/assets/js/config/list_${itemEach}.js`);
})


// PUB.arrDetailGroupMoudles.forEach(itemEach=>{//循环：{分组数据列表模块名数组}
//   import(`@/assets/js/config/detail_group/detail_group_${itemEach}.js`);
// })


export default {}