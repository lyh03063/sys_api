<template>
  <div>
    <div class="float-tips" v-if="$sys.env=='dev'">非生产</div>
    <div class v-if="ready">
      <div class v-if="systemDoc._id">
        <el-container>
          <el-header class="home-head-box">
            <el-row>
              <div class="FL MT13 C_fff MR10" v-if="systemDoc.logoSrc">
                <img class="W60" :src="systemDoc.logoSrc" alt />
              </div>
              <div class="FL MT13 C_fff MR10 FS24">{{systemDoc.title}}</div>
              <div class="FR MT20 C_fff">
                <role></role>
              </div>
            </el-row>
          </el-header>
        </el-container>

        <dm_debug_list>
          <dm_debug_item v-model="systemDoc" />
        </dm_debug_list>

        <div class="DPF">
          <div class="g-left-box">
            <NavMenu :cf="listMenu"></NavMenu>
          </div>
          <div class="g-right-box">
            <keep-alive>
              <router-view :key="routerKey" style="padding:10px"></router-view>
            </keep-alive>
          </div>
        </div>
        <div class="PSF B0 L0 BC_fff W200 H20 LH_20 C_999 FS12 PL10">{{sysId}}</div>
      </div>
      <div class="LH50 TAC" v-else>没有对应的系统</div>
    </div>
    <dm_loading height="200" v-else></dm_loading>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  components: {
    NavMenu: () => import("@/components/NavMenu/NavMenu"),
    role: () => import("@/components/common/role") //登录角色组件
  },
  props: {},
  data() {
    return {
      ready: false,
      systemDoc: { aaa: 1 },
      sysId: 123,//系统Id
      routerKey: "key1",
      listMenu: [
        {
          //菜单
          index: "listHome",
          route: "listHome",
          icon: "el-icon-house",
          title: "首页"
        },

        {
          index: "MallSystem",
          icon: "el-icon-document",
          title: "商城管理",
          menuItem: [
            {
              index: "list_goods",
              route: "list_common?type=goods",
              title: "商品/服务"
            },
            {
              index: "list_order",
              route: "list_common?type=order",
              title: "订单"
            },
            {
              index: "list_user",
              route: "list_common?type=user",
              title: "用户"
            }

          ]
        },
        {
          index: "otherData",
          icon: "el-icon-document",
          title: "其他数据",
          menuItem: [
            {
              index: "list_project_case",
              route: "list_common?type=project_case",
              title: "家用工程案例"
            },
            {
              index: "list_group",
              route: "list_common?type=group",
              title: "分组"
            },
            {
              index: "list_url",
              route: "list_common?type=url",
              title: "网址"
            },
            {
              index: "list_file",
              route: "list_common?type=file",
              title: "文件"
            },
            {
              index: "list_image",
              route: "list_common?type=image",
              title: "图片库"
            },

          ]
        },
        {
          index: "crm",
          icon: "el-icon-document",
          title: "客户管理",
          menuItem: [
            {
              index: "list_person",
              route: "list_common?type=person",
              title: "人员"
            },
            {
              index: "list_company",
              route: "list_common?type=company",
              title: "企业"
            },
          ]
        },

        {
          index: "systemManage",
          icon: "el-icon-setting",
          title: "系统管理",
          menuItem: [


            {
              index: "list_admin",
              route: "list_common?type=admin",
              title: "管理员"
            },
            {              index: "list_role",
              route: "list_common?type=role",
              title: "角色"            }
          ]
        }
      ],

    };
  },
  watch: {
    $route: function (newUrl, oldUrl) {
      this.setActiveMenu(); //调用：{设置聚焦菜单函数}
    },
    // immediate: true,
    deep: true
  },

  methods: {
    //函数：{设置聚焦菜单函数}
    async setActiveMenu() {
      this.routerKey = document.URL; //路由key，确保路由能响应
      await util.timeout(500); //延迟
      this.$store.commit("changeActiveMenu", this.$route.query.sysId);
    },

    //函数：{ajax获取系统doc函数}
    async getDocSystem() {
      let { data: { doc } } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          findJson: { systemId: this.sysId },

          _dataType: "system",
          _systemId: "$all"
        } //传递参数
      });
      console.log("doc:", doc);
      this.systemDoc = doc
      this.ready = true;
      if (this.systemDoc.iconSrc) {//如果{icon地址}存在
        util.changeFavicon(this.systemDoc.iconSrc)//函数：{改变网页标题图标的函数}
      }


    },

  },
  async created() {
    this.sysId = this.$route.params.sysId;
    PUB._paramAjaxAddon = {
      _systemId: this.sysId
    }
    this.getDocSystem()//调用：{ajax获取系统doc函数}

  }
};
</script>


<style scoped>
.head {
  background-color: rgb(84, 92, 100);
  padding: 0 10px;
}
.g-left-box {
  min-width: 201px;
}

.g-right-box {
  /* border: 1px #f00 solid; */
  flex: 1;
}
</style>
