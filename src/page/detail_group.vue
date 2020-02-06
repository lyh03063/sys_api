<template>
  <div class style="padding:10px">
    <h1 class="title">{{groupDoc.title||"标题"}}</h1>

    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="componentName" text="对应的列表组件名" />
      <dm_debug_item v-model="groupDoc" text="groupDoc" />
      <dm_debug_item v-model="isSpecial" text="isSpecial" />
    </dm_debug_list>

    <template class v-if="ready">
      <!--动态组件-->
      <component :is="componentName" :groupId="groupId" v-if="isSpecial"></component>
      <detail_group_common :groupId="groupId"  :data-type="groupDoc.dataType" v-else></detail_group_common>
    </template>
  </div>
</template>

<script>

//变量：{模块导入对象}
let objDetailGroupMoudles = {};

PUB.arrGroupMoudlesSpe.forEach(itemEach => {
  //循环：{分组数据列表的模块名称数组}
  objDetailGroupMoudles[`detail_group_${itemEach}`] = () =>
    import(`@/page/detail_group_${itemEach}`);
});





//这个不能动态import，晕死！！！！！！！！！！！！！！！
//可能是显式地使用detail_group_common标签
//而component标签动态组件却可以！！！还需待确认
import detail_group_common from "@/page/detail_group_common.vue";

export default {
  components: {
    ...objDetailGroupMoudles, //展开{模块导入对象}
    // detail_group_group: import(`@/page/detail_group_group.vue`),
    // detail_group_note: import(`@/page/detail_group_note.vue`),
    detail_group_common: detail_group_common
  },
  data() {
    return {
      componentName: null, //动态组件名称
      groupDoc: {},
      groupId: null,
      ready: false
    };
  },
  computed: {
    //变量：{是否为特殊数据类型}
    isSpecial() {
      return PUB.arrGroupMoudlesSpe.includes(this.groupDoc.dataType);
    }
  },

  methods: {
    //函数：{获取分组详情函数}
    async getGroupDoc() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _id: this.groupId,
          _systemId: PUB._systemId
        } //传递参数
      });
      this.groupDoc = data.doc;
      this.componentName = `detail_group_${this.groupDoc.dataType}`;
      document.title = this.groupDoc.title; //修改浏览器标题栏文字
      this.ready = true;
    }
  },
  async created() {
    this.groupId = this.$route.query.groupId;

    this.getGroupDoc(); //调用：{获取分组详情函数}
  }
};
</script>


<style scoped>
.title {
  font-size: 18px;
  text-align: center;
  line-height: 1;
  padding: 0 0 10px 0;
}
</style>
