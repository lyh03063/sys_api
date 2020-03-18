<template>
  <div class>
    <div class="PL20 PT20">
      <el-row
        class="MB10"
        :gutter="10"
        type="flex"
        v-for="(doc) in arrObjScore"
        :key="doc.scoreKey"
      >
        <el-col style="width:190px">{{doc.name}} (数量：{{doc.allCount}})</el-col>
        <el-col style="width:270px">
          <el-progress
            :stroke-width="26"
            :percentage="doc.score"
            :text-inside="true"
            :color="customColors"
          ></el-progress>
        </el-col>
        <el-col style="width:80px">
          <a    :href="doc.link"><el-button type="primary" size="mini">去学习</el-button></a>
          
        </el-col>
      </el-row>
      <collect></collect>
    </div>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base],
  components: {
    collect: () => import("@/page/study_collect.vue") 
  },
  data() {
    return {
      ready: false,
      customColors: "#67C23A",
      arrObjScore: [
        {
          scoreKey: "note",
          name: "知识点",
          score: 0,
          allCount: 0,
          link:"#/study_home/detail_group_g_card?groupId=5e19d9fff3c94a3971f45595"
        },
        {
          scoreKey: "html_api",
          name: "Html API",
          score: 0,
          allCount: 0,
          link:"#/study_home/list_html_api"
        },
        {
          scoreKey: "css_api",
          name: "Css API",
          score: 0,
          allCount: 0,
          link:"#/study_home/list_css_api"
        },
        {
          scoreKey: "js_api",
          name: "Javascript API",
          score: 0,
          allCount: 0,
          link:"#/study_home/list_js_api"
        }
      ]
    };
  },
  watch: {
    $route: function(newUrl, oldUrl) {
      if (newUrl != oldUrl) {
      }
    },
    immediate: true,
    deep: true
  },
  methods: {
    //函数：{获取知识点分数函数}
    async getScoreNote() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _dataType: "familiarity",
          _systemId: PUB._systemId,
          findJson: {
            _userId: PUB.$sys.userId, 
            _idRel: "5e19d9fff3c94a3971f45595"
          }
        } //传递参数
      });
      let doc = data.doc;
      let { score } = doc;
      if (!score) return;
      score.allCount=540;
      Object.assign(this.dictScore[`note`], score); //合并对象
    },
    //函数：{获取其他分数函数}
    async getScoreOther() {
      let arrScoreKey = this.arrObjScore.map(doc => doc.scoreKey);
      console.log("arrScoreKey:", arrScoreKey);

      let {
        data: { list }
      } = await axios({
        method: "post",
        url: `${PUB.domain}/info/getCommonList`,
        data: {
          _dataType: "score",
          _systemId: PUB._systemId,
          findJson: {
            scoreKey: { $in: arrScoreKey },
            _userId: PUB.$sys.userId
          }
        }
      });

      list.forEach(doc => {
        let { score, scoreKey } = doc;
        if (!score) return;
        score.score = parseFloat(score.score); //进度条要求数值类型
        if (!this.dictScore[scoreKey]) return;
        Object.assign(this.dictScore[scoreKey], score); //合并对象
      });

      console.log("list:", list);
    },
    //函数：{初始化函数}
    async init() {
      this.getScoreNote(); //调用：{获取知识点分数函数}
      this.getScoreOther(); //调用：{获取其他分数函数}
    }
  },
  //计算属性
  computed: {},
  created() {
    //变量：{数据字典}
    this.dictScore = lodash.keyBy(this.arrObjScore, "scoreKey");

    //在创建后调用一次消息列表接口接口
    this.init();
  }
};
</script>
<style scoped>
.DataBox {
  width: 100%;
  text-align: left;
  font-size: 15px;
  height: 50px;
  border-bottom: 1px solid #dcdfe6;
  color: #60627e;
  line-height: 50px;
}
</style>