<template>
  <div>
    <el-input class="inquireButton" placeholder="请输入内容" v-model="input" clearable></el-input>
    <el-button type="primary" icon="el-icon-search" @click="inquireButton()">搜索</el-button>
    <el-button type="primary" @click="cpp()">数据</el-button>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    ></el-menu>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="item" :name="item" v-for="item in arrType" :key="item">
        <div class="DataBox" v-for="doc in dataResult[item].list" :key="doc._id">
          <a :href="'#/detail_data?dataId=' +doc._id" target="_blank">{{doc.title}}</a></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  mixins: [MIX.base],
  data() {
    return {
      activeName: null,
      arrType: [],
      dataResult: null,
      activeIndex: "全部",
      input: ""
    };
  },
  methods: {
    //切换聚焦
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //查询按钮
    inquireButton() {
      console.log("input", this.input);
    },
    cpp() {
      console.log("测试按钮", "数组");
    },
    getList() {
      //调用的方法
      axios({
        method: "post",
        url: "https://www.dmagic.cn/json/?jsonid=1465",
        data: {}
      })
        .then(response => {
          let { dataResult } = response.data; //解构赋值
          this.dataResult = dataResult;
          console.log("数据调用dataResult", dataResult);
          for (let K in dataResult) {
            console.log(K, dataResult[K]);
            this.arrType.push(K);
          }
          this.activeName = this.arrType[0];
        })
        .catch(function(error) {
          alert("异常:" + error);
        });
    }
  },
  //计算属性
  computed: {},
  created() {
    //在创建后调用一次消息列表接口接口
    this.getList();
  }
};
</script>
<style scoped>
.inquireButton {
  width: 300px;
  margin: 0 10px;
}
.DataBox {
  width: 100%;
  text-align: left;
  font-size:15px;
  height:50px;
  border-bottom:1px solid #DCDFE6;
  color:#60627E;
  line-height:50px;
}

</style>