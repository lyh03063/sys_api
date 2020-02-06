<template>
  <div class>
    <dm_list_data :cf="cfList" @after-modify="roleDataChange" @after-add="roleDataChange"></dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      cfList: PUB.listCF.list_role
    };
  },
  methods: {
    //角色列表修改时触发的函数
    async roleDataChange(doc) {
      //如果修改的是当前的角色，更新当前的权限
      if (doc.P1 == localStorage[PUB.keyRoleId]) {
        util.setLocalStorageObj(PUB.keyPower, doc.power); //调用：{设置一个对象到LocalStorage}
        let clickStatus = await this.$confirm(
          "当前用户的角色被修改，需要刷新页面才能生效，是否刷新？"
        ).catch(() => {});
        if (clickStatus == "confirm") {
          //如果点击了确定
          window.location.reload(); //函数调用：{重载页面}
        }
      }
    }
  },
  created() {

  }
};
</script>

<style>
</style>
