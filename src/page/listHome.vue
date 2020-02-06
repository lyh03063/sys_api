<template>
  <div class="main">
    <div class="TAC">
      <h1 class="FS24">欢迎使用{{systemName}}</h1>

      

      <div class="big_group" v-for="docBig in listData" :key="docBig._id">
        <h2 class="big_group_title">{{docBig.targetDoc.title}}</h2>

        <el-row :gutter="6" class="big_group_List">
          <el-col
            :span="6"
            class="small_group_box"
            v-for="docSmall in docBig.sonList"
            :key="docSmall._id"
          >
            <el-link
              class="small_group_link"
              type="primary"
              :href="docSmall.targetDoc.link"
              target="_blank"
            >
              <el-card shadow="hover">
                <p class>{{docSmall.targetDoc.title}}</p>
              </el-card>
            </el-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: null,
      systemName: PUB.systemName,
      productList: [
        { title: "产品1", price: 15 },
        { title: "产品2", price: 25 },
        { title: "产品3", price: 25 },
        { title: "产品4", price: 25 },

        { title: "产品5", price: 15 },
        { title: "产品6", price: 25 },
        { title: "产品7", price: 25 },
        { title: "产品8", price: 25 },

        { title: "产品11", price: 15 },
        { title: "产品12", price: 25 },
        { title: "产品13", price: 25 },
        { title: "产品14", price: 25 }
      ]
    };
  },
  async created() {
    let {
      data: { list: listData }
    } = await axios({
      //请求接口
      method: "post",
      url: `${PUB.domain}/info/getCommonGroupList`,
      data: {
        _systemId: PUB._systemId,
        groupId: "5e18821555a1e947e7bec88d"
      }
    });

    this.listData = listData;
  }
};
</script>

<style lang="scss" >
@import "@/assets/css/util.scss"; //导入公共样式文件
</style>