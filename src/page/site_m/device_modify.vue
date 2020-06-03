<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="formData" />
    </dm_debug_list>
    <page_h5_zhihuigeng  :title="title">
      <dm_space height="15"></dm_space>
      <div class="PL30 PR30">
        <van-cell-group>
          <van-field
            v-model="formData.equipment_name"
            label
            placeholder="请输入名称"
            error-message
            clearable
            size="large"
          ></van-field>
        </van-cell-group>
        <dm_space height="35"></dm_space>
        <van-button class="MT10 MB10" type="primary" block round @click="submit">修改</van-button>
          <dm_space height="15"></dm_space>
      </div>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>





export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  data() {

    return {


      formData: {
        equipment_name: "设备名称",
        equipment_id: null,
      },
      urlFrom: null,//登录前的来源地址
    };
  },
  methods: {

    async submit() {
      let { equipment_name } = this.formData
      if (!equipment_name) return this.$toast('名称必填！');
      let data = await this.$ajax({ url: `/device/upd_device_info`, data: this.formData });
      if (data === false) return;
      this.$toast('修改成功');
      // this.$router.push({ path: this.urlFrom });//跳转到来源页
      this.$router.back()

    },





  },
  async created() {
    let { equipment_id, equipment_name, } = this.$route.query;
    this.formData.equipment_id = equipment_id;
    this.formData.equipment_name = equipment_name;
    this.title = "设备详情";//修改标题
    window.document.title = `设备详情修改`


  }
};
</script>


<style scoped>
.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>
