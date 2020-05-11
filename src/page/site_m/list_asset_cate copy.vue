<template>
  <div class="HP100">
    <dm_debug_list>
      <dm_debug_item v-model="ready" />
    </dm_debug_list>
    <div class="n-m-main-box BC_f0f0f0">
      <van-nav-bar :title="title" left-text left-arrow @click-left="onClickLeft" />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="PL15 PR15 PT15"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <dm_list_flex_res class="MT20" :list="list" #default="{item}" col="2">
            <card_asset_cate class :item="item"></card_asset_cate>
          </dm_list_flex_res>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    card_asset_cate: () => import("@/components/card/asset_cate.vue"),
  },
  mixins: [MIX.base],
  data() {
    return {
      title: "我的资产",
      ready: true,
      list: [],
      listTest: [
        {
          "id": 1,
          "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
          "resource_type_name": "果园"
        },
        {
          "id": 2,
          "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
          "resource_type_name": "菜地"
        },
        {
          "id": 3,
          "resource_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/5E78DA0FBC49B7E117FA3BA4CBA8D98B",
          "resource_type_name": "养殖场"
        },
      ],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onClickLeft() {
      alert(`onClickLeft`);
    },
    async onLoad() {
      await util.timeout(300); //延迟
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.list = this.listTest;
      this.loading = false;

      if (this.list.length >= 3) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },



  },
  async created() {

  }
};
</script>


<style scoped>
</style>
