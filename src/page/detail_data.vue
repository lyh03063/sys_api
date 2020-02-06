<template>
  <div class style="padding:10px">
    <h1 class="title TAC MB10" id="id_floor_top">{{doc.title}}</h1>
    <div class="desc" v-if="doc.desc">{{doc.desc}}</div>

    <dm_debug_list>
      <dm_debug_item v-model="doc" text="doc" />
      <dm_debug_item v-model="familiarityDoc" text="familiarityDoc" />
    </dm_debug_list>

    <div class="familiarity_box MB10">
      <el-popover
        class="MR10"
        placement="top-start"
        width="200"
        trigger="hover"
        v-if="doc.arrGroup&&doc.arrGroup.length"
      >
        <!--候选值列表-->
        <el-link
          type="primary"
          :href="`#/detail_group?groupId=${docG._idRel}`"
          v-for="docG in doc.arrGroup"
          :key="docG.relationId"
        >{{docG.title}}</el-link>

        <el-button slot="reference" icon="el-icon-more" size="mini">所属分组</el-button>
      </el-popover>
      {{dataTypeLabel}}熟悉度：
      <familiarity_select
        class="MT6"
        v-model="familiarityDoc"
        :data="doc"
        :dataType="doc._dataType"
        v-if="doc._dataType"
      ></familiarity_select>
      <div class="C_999 DPIB FR MT6" style="display:flex">
        <span class="keyword_box">关键词：{{doc.keyword}}</span>
        <el-button plain @click="showDialogEdit" size="mini" style="width:60px">编辑</el-button>
      </div>
    </div>

    <!-- <h1>{{dataTypeLabel}}详情</h1> -->
    <div class="detail_box" >
      <div class v-html="doc._detail"></div>

      <div class v-if="doc._dataType=='vedio'">
        <video width="760" height="440" controls :src="srcVedio"></video>
      </div>

      <template class v-if="doc.link&&isShowIframe">
        <div class>
          以下内容通过嵌入其他网页引用：
          <a target="_blank" :href="doc.link">在新页面打开</a>
        </div>
        <iframe :src="doc.link" class="link_iframe" seamless></iframe>
      </template>
    </div>

    <!--编辑数据弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="编辑数据弹窗"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogEdit"
      v-if="isShowDialogEdit"
    >
      <dm_dynamic_form
        :cf="cfFormEdit"
        v-model="formDataEdit"
        @submit="modifyData"
        @cancel="isShowDialogEdit = false"
      ></dm_dynamic_form>
    </el-dialog>

    <div class="float_bar">
      <ul>
        <li>
          <a href="javascript:;" @click="scrollView('top')">详情</a>
        </li>
        <template class v-for="(item,i) in arrCards">
          <li :key="i" v-if="item.list&&item.list.length">
            <a
              href="javascript:;"
              @click="scrollView(item.type)"
            >{{item.title}}（{{item.list.length}}）</a>
          </li>
        </template>
      </ul>
    </div>

    <el-collapse v-model="activeNames" class="n-el-collapse">
      <template class v-for="(item,i) in arrCards">
        <el-collapse-item
          :key="i"
          v-if="item.list&&item.list.length"
          :id="`id_floor_${item.type}`"
          :name="item.type"
        >
          <template slot="title">
            <div class="n-title-bar" >
               <b > {{item.title}}<span class="C_999">（{{item.list.length}}）</span> </b>
            </div>
          
            <!-- <i class="header-icon el-icon-info"></i> -->
          </template>

          <ul class="list-link">
            <li v-for="doc in item.list" :key="doc._id">
              <a target="_blank" :href="`#/detail_data?dataId=${doc._id}`">{{doc.title}}</a>
            </li>
          </ul>
         
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script>
export default {
  components: {
    familiarity_select: () =>
      import("@/components/common/familiarity_select.vue")
  },
  props: {
    propDataId: null
  },
  data() {
    return {
      activeNames: [], //激活的折叠面板
      familiarityDoc: {},
      dataId: null,
      isShowDialogEdit: false, //是否显示编辑数据弹窗
      //编辑数据表单数据
      formDataEdit: {},
      cfFormEdit: {
        labelWidth: "150px",
        idKey: "_id",
        paramAddonInit: {
          _systemId: PUB._systemId,
          _dataType: "note"
        },
        col_span: 24,
        urlInit: "/info/commonDetail",
        formItems: PUB.listCF.list_note.formItems,
        btns: [
          {
            text: "修改",
            event: "submit",
            type: "primary",
            validate: true
          },
          {
            text: "取消",
            event: "cancel"
          }
        ]
      }, //编辑数据表单配置
      doc: {},
      dataTypeLabel: "", //数据类型标签
      noteListByKeyword: [], //关键词匹配的笔记列表
      htmlAPIListByKeyword: [], //关键词匹配的Html-API列表
      cssAPIListByKeyword: [], //关键词匹配的Css-API列表
      jsAPIListByKeyword: [], //关键词匹配的Js-API列表
      frontDemoListByKeyword: [], //关键词匹配的前端demo列表
      vedioListByKeyword: [], //关键词匹配的视频列表
      paramByKeyword: null //根据关键词请求关联数据的ajax固定参数
    };
  },
  computed: {
    arrCards() {
      let arr = [
        //关联笔记 (${noteListByKeyword.length})
        { type: "note", title: "关联笔记", list: this.noteListByKeyword },
        {
          type: "html_api",
          title: "关联Html-API",
          list: this.htmlAPIListByKeyword
        },
        {
          type: "css_api",
          title: "关联Css-API",
          list: this.cssAPIListByKeyword
        },
        {
          type: "js_api",
          title: "关联Js-API",
          list: this.jsAPIListByKeyword
        },
        {
          type: "front_demo",
          title: "关联前端Demo",
          list: this.frontDemoListByKeyword
        },
        {
          type: "vedio",
          title: "关联视频",
          list: this.vedioListByKeyword
        }
      ];

      this.activeNames = arr.map(doc => doc.type);
      return arr;
    },

    // title() {
    //   let { title, desc } = this.doc;
    //   if (desc) {
    //     title += `：${desc}`;
    //   }
    //   return title;
    // },

    srcVedio() {
      let src = lodash.get(this.doc, `vedio[0].url`);

      return src;
    },
    isShowIframe() {
      let arrTypeNoIframe = ["vedio"];
      let flag = true;
      if (arrTypeNoIframe.includes(this.doc._dataType)) {
        flag = false;
      }
      return flag;
    }
  },

  methods: {
    //函数：{滚动到指定位置的函数}
    scrollView(type) {
      //让指定元素进入视口
      document.querySelector(`#id_floor_${type}`).scrollIntoView(true);
    },
    //函数：{显示编辑数据弹窗函数}
    showDialogEdit() {
      this.formDataEdit._id = this.dataId; //编辑数据表单数据补充数据id
      this.isShowDialogEdit = true;
    },
    //函数：{提交编辑数据函数}
    async modifyData() {
      let urlModify = PUB.listCF.list_note.url.modify;
      let ajaxParam;
      ajaxParam = {
        _id: this.dataId,
        _data: this.formDataEdit
      };
      Object.assign(ajaxParam, this.cfFormEdit.paramAddonInit); //合并公共参数
      let response = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + urlModify,
        data: ajaxParam //传递参数
      });
      this.$message.success("修改成功");
      this.isShowDialogEdit = false;
      this.init(); //函数：{初始化函数}
    },
    //函数：{ajax获取关联笔记列表}
    async ajaxGetNoteList() {
      let param = { ...this.paramByKeyword, _dataType: "note" };
      this.noteListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },

    //函数：{ajax获取关联Html-API列表}
    async ajaxGetHtmlApiList() {
      let param = { ...this.paramByKeyword, _dataType: "html_api" };
      this.htmlAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联Css-API列表}
    async ajaxGetCssApiList() {
      let param = { ...this.paramByKeyword, _dataType: "css_api" };
      this.cssAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联Js-API列表}
    async ajaxGetJsApiList() {
      let param = { ...this.paramByKeyword, _dataType: "js_api" };
      this.jsAPIListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联前端demo列表}
    async ajaxGetFrontDemoList() {
      let param = { ...this.paramByKeyword, _dataType: "front_demo" };
      this.frontDemoListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },
    //函数：{ajax获取关联视频列表}
    async ajaxGetVedioList() {
      let param = { ...this.paramByKeyword, _dataType: "vedio" };
      this.vedioListByKeyword = await FN.ajaxlistBykeyword({ param }); //ajax获取关联列表
    },

    //函数：{ajax获取当前数据的熟悉度}
    async ajaxGetFamiliarity() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _systemId: PUB._systemId,
          _dataType: "familiarity",
          findJson: {
            _idRel: this.dataId,
            dataType: this.doc._dataType,
            userId: localStorage[PUB.keyLoginUser]
          } //获取列表的数据总量
        } //传递参数
      });
      this.familiarityDoc = data.doc;
    },
    //函数：{初始化函数}

    async init() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/info/commonDetail`,
        data: {
          _id: this.dataId,
          _systemId: PUB._systemId
        } //传递参数
      });

      this.doc = data.doc;
      console.log("this.doc:###", this.doc);

      this.ajaxGetFamiliarity(); //调用：{ajax获取当前数据的熟悉度}

      let { title, keyword, _dataType } = this.doc;
      // let keyword = this.doc.keyword;

      this.dataTypeLabel = lodash.get(DYDICT.dataType, `${_dataType}.label`);
      document.title = `${title}-${this.dataTypeLabel}`; //修改浏览器标题栏文字

      /*****************根据数据类型修改编辑按钮的表单配置-START*****************/
      this.cfFormEdit.paramAddonInit._dataType = _dataType; //设置类型参数
      let formItems = lodash.get(PUB.listCF, `list_${_dataType}.formItems`); //获取类型对应的表单项
      this.cfFormEdit.formItems = formItems; //设置对应的表单项
      /*****************根据数据类型修改编辑按钮的表单配置-END*****************/

      //根据关键词请求关联数据的ajax固定参数
      this.paramByKeyword = {
        _systemId: PUB._systemId,
        _id: this.dataId,
        selectJson: {
          _id: 1,
          title: 1,
          desc: 1,
          keyword: 1,
          link: 1,
          vedio: 1
        }
      };

      if (keyword) {
        this.ajaxGetNoteList(); //调用：{ajax获取关联笔记列表}
        this.ajaxGetHtmlApiList(); //调用：{ajax获取关联Html-API列表}
        this.ajaxGetCssApiList(); //调用：{ajax获取关联Css-API列表}
        this.ajaxGetFrontDemoList(); //调用：{ajax获取关联前端demo列表}
        this.ajaxGetJsApiList(); //调用：{ajax获取关联Js-API列表}
        this.ajaxGetVedioList(); //调用：{ajax获取关联视频列表}
      }
    }
  },
  async created() {
    this.dataId = this.$route.query.dataId;
    this.dataId = this.dataId || this.propDataId; //如果地址没有(非页面级组件)，从属性中获取数据id

    this.init(); //函数：{初始化函数}
  }
};
</script>


<style  scoped>

.detail_box{
   padding: 8px 0 12px;
}
.float_bar {
  position: fixed;
  right: 10px;
  top: 200px;
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 8px;
  background: #fff;
  z-index: 100;
}
.float_bar a {
  color: #666;
  text-decoration: none
}
.link_iframe {
  width: 100%;
  height: 600px;
}

.familiarity_box {
  background: #f0f0f0;
  /* border: 1px #ddd solid; */
  border-radius: 5px;
  padding: 0 10px;
  height: 40px;
}
.keyword_box {
  display: inline-block;

  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 8px;
}
.desc {
  color: #666;
  font-size: 12px;
  padding: 10px;
  border: 1px #ddd dashed;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
