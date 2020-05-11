<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      class="PL15 PR15 PT15"
      v-bind="cf.cfVanList"
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <dm_list_flex_res class="MT20" :list="list" #default="{item}" v-bind="cf.cf_list_flex">
        <component class :item="item" :is="cf.com_card"></component>
      </dm_list_flex_res>
      <has_no_data v-if="!list.length&&ready"></has_no_data>
    </van-list>
    <dm_space height="30"></dm_space>
  </van-pull-refresh>
</template>

<script>
export default {
  name: "list_data_zhihuigeng",
  components: {
    card_device_strategy: () => import("@/components/card/device_strategy.vue"),
    card_device_cate: () => import("@/components/card/device_cate.vue"),
    card_device: () => import("@/components/card/device.vue"),
    card_asset: () => import("@/components/card/asset.vue"),
    card_asset_cate: () => import("@/components/card/asset_cate.vue"),
    card_asset_environment: () => import("@/components/card/asset_environment.vue"),
    has_no_data: () => import("@/page/site_m/zhihuigeng/components/has_no_data.vue"),
  },
  props: ["cf"],
  mixins: [MIX.base,],
  data() {
    return {
      ready: false,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],

    };
  },
  computed: {
    finishedText() {
      let text = "没有更多了";
      if (!this.list.length) {
        text = "";
      }
      return text
    }

  },
  methods: {

    async onLoad() {
      await util.timeout(300); //延迟
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.list = this.cf.listTest;
      this.loading = false;


      this.ready = true;
      this.finished = true;
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