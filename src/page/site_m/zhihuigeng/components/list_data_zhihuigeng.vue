<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <dm_debug_list>
      <dm_debug_item v-model="list" />
    </dm_debug_list>

    <!--列表-->
    <van-list
      v-bind="cf.cfVanList"
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
    
      <dm_list_flex_res class :list="list" #default="{item}" v-bind="cf.cf_list_flex" v-if="ready">
        <component
          class
          :item="item"
          :is="cf.com_card"
          @action-dialog-show="actionDialogShow"
          @single-action="singleAction"
        ></component>
      </dm_list_flex_res>
      <has_no_data v-if="!list.length&&ready" :cf="cf.cfNoData">
        <!--传递插槽slot_no_data-->
        <template v-slot:slot_no_data>
          <slot name="slot_no_data"></slot>
        </template>
      </has_no_data>
    </van-list>
   

    <!--单项操作浮窗-->
    <van-action-sheet
      v-model="showAction"
      :actions="cf.actions"
      @select="singleAction"
      cancel-text="取消"
    />
  </van-pull-refresh>
</template>

<script>
export default {
  name: "list_data_zhihuigeng",
  components: {
    card_device_strategy: () => import("@/components/card/device_strategy.vue"),
    card_device_cate: () => import("@/components/card/device_cate.vue"),
    card_device: () => import("@/components/card/device.vue"),
    card_device_item_select: () => import("@/components/card/device_item_select.vue"),
    card_device_item_selected: () => import("@/components/card/device_item_selected.vue"),
    card_device_op_selected: () => import("@/components/card/device_op_selected.vue"),
    card_device_op_select: () => import("@/components/card/device_op_select.vue"),
    card_asset: () => import("@/components/card/asset.vue"),
    card_asset_cate: () => import("@/components/card/asset_cate.vue"),

    card_asset_device: () => import("@/components/card/asset_device.vue"),
    card_asset_device_group: () => import("@/components/card/asset_device_group.vue"),
    has_no_data: () => import("@/page/site_m/zhihuigeng/components/has_no_data.vue"),
  },
  props: ["cf"],
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {
    return {
      ready: false,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      docFocus: null,//当前聚焦的某项数据，用于单项操作
      showAction: false,//是否显示单项操作浮窗


    };
  },
  computed: {
    finishedText() {
      let text = this.cf.finishedText;
      if (!this.list.length) {
        text = "";
      }
      return text
    }

  },
  watch: {
    cf: {
      handler(newVal, oldVal) {
        this.onLoad()//调用：{加载列表数据的函数}
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {
    //函数：{选择单项操作菜单后的回调函数}
    async singleAction({ action, doc }) {
      //优先使用参数中的doc，没有的话再找docFocus，这种情况是中间隔了单项操作弹窗
      let objData = { action, doc: doc || this.docFocus, vm: this };

      if (action == "change_selected") {
        objData.listSelected = this.getSelectedData()//调用：{获取选中的数据函数}
      }
      this.$emit("single-action", objData);//传值给父组件-
      this.showAction = false;//隐藏单项操作浮窗

    },
    //函数：{打开操作菜单函数}
    async actionDialogShow(doc) {
      this.$emit("action-dialog-show", doc, this.cf);//***向父组件传值3,总配置也传递
      this.showAction = true;//显示单项操作浮窗
      this.docFocus = doc//聚焦文档赋值！！！！ 

    },

    //函数：{加载列表数据的函数}
    async onLoad() {
      if (this.cf.ajax) {//Q1:有ajax配置
        await this.ajaxGetList()//调用：{ajax获取列表函数}
      } else { //Q2:否则
        this.list = this.cf.list || this.cf.listTest;//静态数据
      }


      this.stopRefresh()//调用：{停止下拉刷新的函数}
    },
    //函数：{停止下拉刷新的函数}
    stopRefresh() {
      this.loading = false;
      this.refreshing = false;
      this.ready = true;
      this.finished = true;

    },
    onRefresh() {
      this.ready = false;//取消ready，让dm_list_flex_res组件重新渲染一次
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();

    },
    //函数：{获取选中的数据函数}
    getSelectedData() {
      let listSelected = this.list.filter(d => d._selected)//过滤选中的数据
      return listSelected

    },
    //函数：{ajax获取列表函数}
    ajaxGetList: async function () {
      if (!this.cf.ajax) return console.error("无ajax配置")


      let { url, params, } = this.cf.ajax;
      let data = await this.$ajax({ url, data: params });
      if (data) {//如果data存在
        if (this.cf.fnHandleList) {//如果{000}000
          data = this.cf.fnHandleList(data)
        }

        this.list = data
      }
      this.ready = true;
    },
  },
  async created() {


    let cfVanList = this.cf.cfVanList || {}
    //表单默认配置
    let cfVanListDefault = {
      class: "PL15 PR15 PT15",
    }
    util.setObjDefault(cfVanList, cfVanListDefault);


    let cfNoData = this.cf.cfNoData || {}
    //表单默认配置
    let cfNoDataDefault = {
      text: "暂无数据",
      class: "PT40",
      iconType: "default",
    }
    util.setObjDefault(cfNoData, cfNoDataDefault);


    util.setObjDefault(this.cf, {
      finishedText: "", cfVanList, cfNoData

    });

  }
};
</script>

<style scoped>
</style>