<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_detail_item_articleCategory="{row}">
          <dm_ajax_populate
            :id="row.articleCategory"
            populateKey="name"
            page="tangball_article_category"
            idKey="P1"
          ></dm_ajax_populate>
        </template>
       
    </dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
     
      cfList: util.deepCopy(PUB.listCF.list_article)
      
    };
  },created(){
  }
};
</script>


<style>
</style>
