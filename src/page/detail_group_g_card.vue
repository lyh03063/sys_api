<template>
  <div class style="padding:20px">
    <dm_debug_list>
      <dm_debug_item v-model="listData" text="listData" />
    </dm_debug_list>
    <h1 class="FS24 TAC">
      {{groupDoc.title}}
      <!-- <el-button plain @click="getDataList" size="mini">刷新</el-button> -->
    </h1>
    <dm_loading height="100" v-if="!listData"></dm_loading>
    <div class="big_group" v-for="docBig in listData" :key="docBig._id">
      <h2 class="big_group_title">{{docBig.targetDoc.title}}</h2>

      <el-row :gutter="12" class="big_group_List">
        <el-col
          :span="6"
          class="small_group_box"
          v-for="docSmall in docBig.sonList"
          :key="docSmall._id"
        >
          <el-link
            class="small_group_link"
            type="primary"
            :href="`#/detail_group?groupId=${docSmall.targetDoc._id}`"
            target="_blank"
          >
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <el-row :gutter="20">
                <el-col :span="18">
                  <p class="FS14">{{docSmall.targetDoc.title}}</p>

                  <p class="FS12 C_999">笔记数：{{docSmall.targetDoc.countData}}</p>
                </el-col>
                <el-col :span="6">
                  <el-progress
                    type="circle"
                    :percentage="formatScore(docSmall)"
                    :width="60"
                    color="#67c23a"
                  ></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      groupId: null,
      groupDoc: {},
      listData: null,
      dictScore: {} //存储分数的数据字典
    };
  },

  methods: {
    //函数：{格式化分数函数}
    formatScore(docSmall) {
      let score = lodash.get(this.dictScore, `${docSmall._idRel2}.score`);
      return util.money(score);
    },
    //函数：{列表查询后执行的函数}
    async afterSearch() {

      let arrGroupId = []; //变量：{需要查询分数的分组id}

      //拼接{需要查询分数的分组id}-取二级数据
      this.listData.forEach(docBig => {
        let { sonList } = docBig;
        let arrGroupIdNeed = sonList.map(docSmall => docSmall._idRel2);
        arrGroupId.push(...arrGroupIdNeed);
      });

      let datalist = await this.getGroupUserScore(arrGroupId);
      if (datalist && datalist.length) {
        datalist.forEach(itemEach => {
          // this.dictScore[itemEach._idRel] = itemEach.score;

          this.$set(this.dictScore, itemEach._idRel, itemEach.score);
        });
      }
    },

    //函数：{ajax获取的用户学习缓存数据函数}
    async getGroupUserScore(arrGroupId) {
      let urlList = PUB.listCF.list_familiarity.url.list;
      let ajaxParam = {
        findJson: {
          _idRel: { $in: arrGroupId },
          dataType: "group",
          _userId: localStorage[PUB.keyLoginUser]
        }
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
    },
    //函数：{ajax获取列表函数}
    async getDataList() {
      let {
        data: { list: listData }
      } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/getCommonGroupList`,
        data: {
          _systemId: PUB._systemId,
          groupId: this.groupId,
          arrType: ["group"]
        }
      });

      this.listData = listData;
      this.afterSearch(); //调用：{列表查询后执行的函数}
    }
  },
  async created() {
    this.groupId = this.$route.query.groupId;

    this.getDataList(); //调用：{ajax获取列表函数}

    this.getGroupDoc(); //调用：{获取分组详情函数}
  }
};
</script>


<style scoped>
</style>
