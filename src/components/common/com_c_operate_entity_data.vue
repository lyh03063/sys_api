<template>
  <div>
    <el-button icon="el-icon-notebook-2 " circle @click="detail" size="mini"></el-button>
     <a class="ML8 MR8"  target="_blank"  :href="`#/detail_data?dataId=${doc._idRel2}`">
          <el-button  size="mini">新窗口</el-button>
          </a>
    <el-popover class="" placement="right" width="auto" trigger="hover">
      <!--候选值列表-->
      <div class v-if="$power('groupDataList.all.modify')">
        
       
        
        <el-button
          icon="el-icon-edit"
          circle
          @click="edit"
          size="mini"
        ></el-button>

        
        <el-button
          icon="el-icon-document-copy"
          circle
          @click="copy"
          size="mini"
        ></el-button>
        
      </div>
      <el-button slot="reference" size="mini">操作</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base],
  name: "com_c_operate_entity_data",
  props: ["doc"],
  data() {
    return {};
  },


  methods: {
    //函数：{编辑数据函数}
    edit: async function () {
      this.comList.$emit("single-btn-click", "edit_entity", this.doc);
    },
    //函数：{编辑数据函数}
    copy: async function () {
      this.comList.$emit("single-btn-click", "copy_entity", this.doc);
    },
    //函数：{查看详情函数}
    detail: async function () {
      this.comList.$emit("single-btn-click", "detail", this.doc);
    },
  },
  created() {
    this.comList = this.$parent.$parent.$parent//***找到列表组件---3层


  }
};
</script>
