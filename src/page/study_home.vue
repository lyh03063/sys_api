<template>
  <div>
    <div class="DPF head">
      <div class="MT13 C_fff MR10" v-if="logoUrl">
        <img class="W200 H36" src="http://www.dmagic.cn/images/IconS/IconS_2578.png" alt />
      </div>

      <div class="FL MT17 FS24 C_fff MR50">{{systemName}}</div>
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-demo FX1"
        mode="horizontal"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- <el-menu-item index="home" route="listHome">后台首页</el-menu-item> -->

        <el-menu-item index="note" route="detail_group_g_card?groupId=5e19d9fff3c94a3971f45595">知识点</el-menu-item>
        <el-menu-item
          index="vedio"
          route="detail_group_g_card?groupId=5e5f5b85a56e720593572a90"
        >视频教程</el-menu-item>
        <el-menu-item
          index="demo"
          route="detail_group_g_card?groupId=5e5f49b5a56e720593572973"
        >演示demo</el-menu-item>

        <el-menu-item
          index="thirdPart"
          route="detail_g_card_link?groupId=5e18821555a1e947e7bec88d"
        >第三方资源</el-menu-item>
      </el-menu>
      <div class="MT20">
        <a href="#/listHome" class="C_fff">后台首页</a>
      </div>
    </div>

    <router-view :key="groupId"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      logoUrl: PUB.logoUrl,
      systemName: PUB.systemName,
      groupId: null,
      activeMenuIndex: "note",
      mapActiveMenu: {
        "5e19d9fff3c94a3971f45595": "note",
        "5e5f49b5a56e720593572973": "demo",
        "5e5f5b85a56e720593572a90": "vedio",
        "5e18821555a1e947e7bec88d": "thirdPart"
      }
    };
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      if (newUrl != oldUrl) {
        this.setActiveMenu(); //调用：{设置聚焦菜单函数}
      }
    },
    immediate: true,
    deep: true
  },

  methods: {
    //函数：{设置聚焦菜单函数}
    setActiveMenu() {
      this.groupId = this.$route.query.groupId;
      //如果{groupId}存在
      if (this.groupId) {
        this.activeMenuIndex = this.mapActiveMenu[this.groupId];
      }
    }
  },
  created() {
    this.setActiveMenu(); //调用：{设置聚焦菜单函数}
  }
};
</script>


<style scoped>
.head {
  background-color: rgb(84, 92, 100);
  padding: 0 10px;
}
</style>
