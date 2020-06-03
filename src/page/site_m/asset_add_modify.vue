<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="formData" />
    </dm_debug_list>
    <page_h5_zhihuigeng :title="title">
      <dm_space height="15"></dm_space>
      <div class="TAC PB10" style="background:#F5F6F8">
        <van-uploader :after-read="afterRead">
          <img
            :src="formData.resource_pic"
            alt
            style="width: 10rem; height: 5rem;"
            v-if="formData.resource_pic"
          />
          <div class style="min-width: 10rem; " v-else>
            <div class="DP3" style="width: 160px; height: 160px;">
              <div class="icon-zhg icon_default_picture"></div>
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="C_999 PT5 PB5 PL15">资产图片，最佳分辨率1242*1242</div>

      <div class v-if="ready">
        <van-cell-group>
          <van-field
            v-model="formData.resource_name"
            label="资产名称"
            placeholder="请输入资产名称"
            input-align="right"
            clearable
            size="large"
          ></van-field>
          <m_picker_field v-model.number="formData.resource_type_id" :cf="cf_picker_resourceType"></m_picker_field>
          <van-field
            v-model.number="formData.resource_size"
            type="number"
            label="资产面积"
            placeholder="请输入资产面积"
            clearable
            input-align="right"
            size="large"
          >
            <div slot="right-icon">亩</div>
          </van-field>
          <van-field
            v-model="formData.resource_owner"
            label="资产负责人"
            placeholder="请输入负责人"
            clearable
            input-align="right"
            size="large"
          ></van-field>
        </van-cell-group>
        <dm_space height="65"></dm_space>
        <div class="n-bottom-bar">
          <van-button class="MT10 MB10" type="primary" block @click="submit">保存</van-button>
        </div>
      </div>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>


import OSS from 'ali-oss';
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {

    return {
      ready: false,
      mode: "add",
      //选择器配置
      cf_picker_resourceType: {
        cfFieldShow: {
          "label": "资产类型",
          "placeholder": "请输入资产类型",
          "input-align": "right",
          "size": "large",
          "right-icon": "arrow-down",
        },
        cfPicker: {
          "show-toolbar": true,
          "value-key": "label",
          // "columns": DYDICT.arr_resource_type_id,
          cfAjax: {//ajax获取选项配置
            "url": `/resource/resource_type`,
            keyV: "id",
            keyL: "resource_type_name",
          },
        },

      },
      fileList: [
        // { url: "http://qn-dmagic.dmagic.cn/202003042138394242_%E5%AE%9A%E7%A8%BF--%E5%95%86%E7%94%A8%E4%B8%BB%E9%A1%B5.png" }
      ],
      formData: {
        resource_pic: "",
        resource_name: "",
        resource_size: "",
        resource_owner: "",
        resource_type_id: 7,
      },
    };
  },
  methods: {
    //函数：{读取到图片后的回调函数}
    afterRead: async function (obj) {
      let { file, content } = obj

      // alert(`afterRead`);
      let maxSize = 2
      const isLimit = file.size / 1024 / 1024 < maxSize;
      if (!isLimit) {
        return this.$message.error(`上传文件大小不能超过${maxSize}MB!`);
      }


      this.uploadImgOos(file)//调用：{上传图片到阿里云的函数}  
    },

    //函数：{上传图片到阿里云的函数}
    uploadImgOos: async function (file) {
      let T = this;
      try {
        //object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        var suffix = file.name.substr(file.name.indexOf(".")); // 获取文件后缀名
        var filename = new Date().getTime() + suffix; // 为文件命名
        // const buffer = Buffer.from(content, 'base64');
        // let result = await T.oosClient.put(filename, buffer);//这个方法需要转换，而且上传后的图片居然是空图片!!!!!
        let result = await T.oosClient.multipartUpload(filename, file)
        let imgUrl = result.res.requestUrls[0].split('?')[0];
        imgUrl = imgUrl.replace("http:", "https:")
        T.$set(T.formData, "resource_pic", imgUrl);
      } catch (e) {
        console.error(e);
      }
    },
    async submit() {
      let url = `/resource/add_resource`
      let tipsSuccess = "添加成功"
      if (this.mode == "modify") {//如果{000}000
        url = `/resource/upd_resource_info`
        tipsSuccess = "修改成功"
      }
      let { resource_name, resource_type_id, resource_owner } = this.formData
      if (!resource_name) return this.$toast('资产名称必填！');
      if (!resource_owner) return this.$toast('负责人必填！');
      if (!resource_type_id) return this.$toast('资产类型必填！');
      let data = await this.$ajax({ url, data: this.formData });//ajax
      if (data === false) return;
      this.$toast(tipsSuccess);
      // this.$router.push({ path: this.urlFrom });//跳转到来源页
      this.onClickLeft()
    },
    //函数：{初始化修改表单函数}
    initFormModify: async function () {
      let data = await this.$ajax({
        url: `/resource/query_resource_detail_v2`, data: { resource_id: this.resource_id }
      });
      if (data === false) return
      // this.formData = data
      let { id: resource_id, resource_photo: resource_pic, resource_name, resource_owner, resource_size, resource_type_id } = data
      //合并对象
      Object.assign(this.formData, { resource_id, resource_pic, resource_name, resource_owner, resource_size, resource_type_id });
    },


    //函数：{获取阿里云文件上传TOKEN函数}
    getAliyunOssToken: async function () {
      let data = await this.$ajax({
        url: `/tools/getOSSToken`, data: { resource_id: this.resource_id }
      });
      return data

    },

    //函数：{初始化阿里云文件上传函数}
    initAliyunOss: async function () {
      let dataOosToken = await this.getAliyunOssToken()//调用：{初始化阿里云文件上传函数}
      let { AccessKeyId: accessKeyId, AccessKeySecret: accessKeySecret, SecurityToken: stsToken } = dataOosToken
      this.oosClient = new OSS({
        region: 'oss-cn-shenzhen', bucket: 'ranktop-agriculture', accessKeyId, accessKeySecret, stsToken
      });


    },






  },
  async created() {



    this.title = "添加资产";//修改标题

    let { resource_type_id, resource_id } = this.$route.query;

    if (resource_id) {//如果有resource_id，表示修改资产
      this.resource_id = resource_id;
      this.mode = "modify";
      this.title = "修改资产";//修改标题

    }

    window.document.title = this.title

    this.formData.resource_type_id = resource_type_id;
    this.formData.resource_id = resource_id;

    if (this.mode == "modify") {//如果是修改
      await this.initFormModify();//调用：{初始化修改表单函数}

    }
    this.ready = true;

    this.initAliyunOss()//调用：{初始化阿里云文件上传函数}



  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>
