<template>
  <div>
    <com_c_sonData class="" :doc="doc" :cf="cf"  ></com_c_sonData>
  </div>
</template>

<script>
export default {
  name: "com_c_sonTaskGId",
  //用于列表模糊查询的组件
  props: ["doc"],
  data:function(){
    return {
      cf:{
        column:"sonTaskGId",
        columnCount:"countSonTask",
        dataType:"task",
        dataTypeName:"任务",
      }
    }

  },
 
  created() {

  }
};
</script>
