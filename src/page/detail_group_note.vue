<template>
  <div class="main" style="padding:10px">
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="arrLookup" text="arrLookup" />
      <dm_debug_item v-model="arrSelect2" text="arrSelect2" />
    </dm_debug_list>

    <dm_dynamic_form :cf="cfFormSearch" v-model="formDataSearch" @submit="searchList"></dm_dynamic_form>

    <dm_list_data ref="listData" :cf="cfList" v-if="ready" @after-search="afterSearch">
      <!--自定义详情弹窗插槽-->
      <template v-slot:customDetail="{detailData}">
        <detail_data :propDataId="detailData._idRel2"></detail_data>
      </template>
      <!--熟悉度插槽-->
      <template v-slot:slot_column_familiarity="{row}">
        <div class>
          <familiarity_select
            v-model="row.familiarityDoc"
            :data="row"
            data-type="note"
            idKey="_idRel2"
          ></familiarity_select>
        </div>
      </template>
      <!--分组数据选择列表按钮插槽-->
      <template v-slot:slot_btn_select>
        <dm_select_list_data
          class="DPIB MR10"
          v-model="arrSelect2"
          :cf="cfSelectList2"
          @select="afterSelect"
        ></dm_select_list_data>
      </template>
       <!--计分板和筛选按钮插槽-->
      <template v-slot:slot_in_toolbar="{data}">
        <score_panel
          ref="scorePanel"
          v-if="data"
          :param="data.objParam"
          idKey="_idRel2"
          :listIndex="cfList.listIndex"
          data-type="note"
          :arrLookup="arrLookupScore"
          @switch="searchList"
        >
          <!-- 计分板组件 -->
        </score_panel>
      </template>
    </dm_list_data>
  </div>
</template>

<script>
window.cfSelectList_note = {
  hideCollection: true,
  dataName: "笔记",
  valueKey: "_id",
  labelKey: "title",
  pageName: "tangball_article",
  multiple: true, //多选
  //需要保留的集合字段
  selectJson: {
    _id: 1,
    title: 1
  },
  cfList: util.deepCopy(PUB.listCF.list_note)
};

export default {
  components: {
    familiarity_select: () =>
      import("@/components/common/familiarity_select.vue"),
    score_panel: () => import("@/components/common/score_panel.vue"),
    detail_data: () => import("@/page/detail_data.vue") //数据详情页组件
    //src\page\detail_data.vue
  },
  props: {
    groupDoc: {},
    groupId: {}
  },
  data() {
    return {
      arrSelect2: [],

      cfSelectList2: window.cfSelectList_note,

      formDataSearch: {},
      //查询表单配置
      cfFormSearch: {
        inline: true,
        size: "mini",
        formItems: [F_ITEMS.importance],
        btns: [{ text: "查询", event: "submit", type: "primary", size: "mini" }]
      },
      // 计分板的ajax参数
      scoreParam: {
        _systemId: PUB._systemId,
        _dataType: "note",
        findJson: null,
        userId: localStorage[PUB.keyLoginUser]
      },
      ready: false,
      cfList: util.deepCopy(PUB.listCF.detail_group_note),
      arrLookupScore: null //计分板需要联合查询配置数组-
    };
  },

  computed: {
    //用于监听变化
    arrLookup: function() {
      return this.$store.state.arrLookup[this.cfList.listIndex];
    }
  },
  watch: {
    //这个监听没什么用了
    arrLookup: {
      async handler(newVal = [], oldVal) {
        // let arrLookup = this.cfList.objParamAddon.arrLookup;
        // this.$refs.listData.objParam.arrLookup = [...arrLookup, ...newVal];
      },
      deep: true
    }
  },
  methods: {
    //函数：{选择并添加数据后的ajax操作函数}
    async afterSelect(arr) {
      let minSort = this.$refs.listData.tableData;
      let { tableData } = this.$refs.listData;

      let docLast = tableData.slice(-1); //最后一个元素
      let sortStart = lodash.get(docLast, `[0].sort`, 9999);
      let arrDataAdd = arr.map(doc => {
        return {
          sort: --sortStart,
          _idRel: this.groupId,
          _idRel2: doc._id
        };
      });
      // return;

      let urlAdd = PUB.listCF.list_relation.url.add;
      let ajaxParam = {
        _data: arrDataAdd
      };
      Object.assign(ajaxParam, PUB.listCF.list_relation.paramAddonPublic); //合并公共参数
      let response = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlAdd,
        data: ajaxParam //传递参数
      });
      this.$message.success("添加数据成功");

      this.arrSelect2 = []; //清除该数组，否则越积越多
      this.$refs.listData.getDataList(); //列表更新
    },
    //函数：{查询表单提交的回调函数}
    async searchList() {
      this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}
      await this.$nextTick(); //延迟到视图更新

      this.$refs.listData.getDataList(); //列表更新
    },
    //函数：{列表查询后的回调函数}
    async afterSearch(list) {
      let arrId = list.map(doc => doc._idRel2);
      //设置id数组
      // lodash.set(this.scoreParam, `findJson._id.$in`, arrId);
      this.$refs.scorePanel.ajaxGetScore(); //调用：{ajax获取分数函数}
      if (this.$refs.scorePanel.focusId == undefined) {
        //如果没有筛选熟悉度（这里的触发机制还需进一步优化，没有必要一直调用）
        this.updateGroupCountData(); //调用：{更新当前分组的数据量的函数}
      }
    },
    //函数：{更新当前分组的数据量的函数}
    async updateGroupCountData() {
      let urlModify = PUB.listCF.list_group.url.modify;
      let ajaxParam = {
        _id: this.groupId,
        _data: { countData: this.$refs.listData.allCount } //获取列表的数据总量
      };
      Object.assign(ajaxParam, PUB.listCF.list_group.paramAddonPublic); //合并公共参数
      let response = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlModify,
        data: ajaxParam //传递参数
      });
    },

    //函数：{初始化处理arrLookup数组函数}
    initArrLookup() {
      //****列表查询arrLookup数组由3部分组成：固定的查询，计分板的筛选参数，上方表单的筛选参数

      let arrLookupFromScore = this.arrLookup || []; //来自计分板筛选的arrLookup

      let formDataSearch = lodash.cloneDeep(this.formDataSearch); //深拷贝

      util.clearObj(formDataSearch); //调用：{清除对象中的空属性（null,undefined,空格等）}
      let isValid = util.isNotEmptyObj(formDataSearch); //调用：{判断是否为非空对象的函数}
      let arrLookupSearch = [];

      if (isValid) {
        //如果是非空对象
        arrLookupSearch.push({
          $match: {
            ...formDataSearch //**** */
          }
        });
      }

      //补充联合查询参数，很复杂！！！！

      //固定的查询部分
      let arrLookupFixed = [
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
            sort: 1, //序号获取
            title: "$targetDoc.title",
            importance: "$targetDoc.importance",
            category: "$targetDoc.category",
            difficulty: "$targetDoc.difficulty"
          }
        }
      ];

      let arrLookup = [
        ...arrLookupFixed,
        ...arrLookupFromScore,
        ...arrLookupSearch
      ];
      this.$set(this.cfList.objParamAddon, "arrLookup", arrLookup);

      //****计分板统计分数需要的arrLookup数组由2部分组成：固定的查询，上方表单的筛选参数
      this.arrLookupScore = [...arrLookupFixed, ...arrLookupSearch];
    }
  },

  async created() {
    this.cfList.customDetail = true; //开启自定义详情弹窗
    this.$set(this.cfList.objParamAddon.findJson, "_idRel", this.groupId);
    this.initArrLookup(); //调用：{初始化处理arrLookup数组函数}

    this.ready = true;

    //补充熟悉度ajax配置（动态数据字典）,注意要传_idRel2
    window.setFamiliarityAjaxCF(this.cfList, "_idRel2");
  }
};
</script>


<style scoped>
/* //临时隐藏查询表单 */
/* .main >>> .search-form-box {
  display: none;
} */
</style>
