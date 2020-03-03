<template>
  <div class style="padding:10px">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="dictScore" text="用户的分组分数数据字典" />
    </dm_debug_list>

    <dm_list_data
      ref="listData"
      :cf="cfList"
      v-if="ready"
      @after-search="afterSearch"
      @single-btn-click="singleEvent"
    >
      <!--分数列插槽-->
      <template v-slot:slot_column_score="{row}">{{$lodash.get(dictScore, `${row._idRel2}.score`)}}</template>

      <!--分组数据选择列表按钮插槽-->
      <template v-slot:slot_btn_select>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelect2"
          :cf="cfSelectList2"
          @select="afterSelect"
        ></dm_select_list_data>
      </template>
    </dm_list_data>
  </div>
</template>

<script>
export default {
  components: {},
  mixins: [MIX.listGroupData],
  props: {
    dataType: {
      default: "group"
    } //数据类型
  },
  data() {
    return {
      dictScore: {} //用户的分组分数数据字典
    };
  },

  methods: {
    //函数：{列表查询后执行的函数}
    async afterSearch(list) {
      let arrGroupId = list.map(doc => doc._idRel2);
      let datalist = await this.getGroupUserScore(arrGroupId);
      if (datalist && datalist.length) {
        datalist.forEach(itemEach => {
          this.$set(this.dictScore, itemEach._idRel, itemEach.score);
        });
      }
    },

    //函数：{ajax获取的用户学习缓存数据函数}
    async getGroupUserScore(arrGroupId) {
      let urlList = PUB.listCF.list_familiarity.url.list;
      let ajaxParam = {
        //_id: null,
        // _userId: localStorage[PUB.keyLoginUser],//用户名
        findJson: {
          _idRel: { $in: arrGroupId },
          dataType: "group",
          _userId: localStorage[PUB.keyLoginUser]
        } //获取列表的数据总量
      };
      Object.assign(ajaxParam, PUB.listCF.list_familiarity.paramAddonPublic); //合并公共参数
      let {
        data: { list }
      } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlList,
        data: ajaxParam //传递参数
      });
      return list;
    },
    initArrLookup() {
      //补充联合查询参数，很复杂！！！！
      this.cfList.objParamAddon.arrLookup = [
        {
          //联合目标数据表
          $lookup: {
            from: "sheet232",
            localField: "_idRel2",
            foreignField: "_id",
            as: "relDoc2"
          }
        },
        //使用$project重新组装，此时targetDoc是数组形式
        {
          $project: {
            _id: 1,
            _idRel: 1,
            _idRel2: 1,
            sort: "$_data.sort", //序号获取
            targetDoc: "$relDoc2._data"
          }
        },
        //将targetDoc展开
        {
          $unwind: "$targetDoc"
        },
        //使用$project重新组装
        {
          $project: {
            _id: 1,
            _idRel: 1,
            _idRel2: 1,
            sort: 1,
            title: "$targetDoc.title",
            dataType: "$targetDoc.dataType",
            countData: "$targetDoc.countData"
          }
        }
      ];
    }
  },
  async created() {}
};
</script>


<style scoped>
</style>
