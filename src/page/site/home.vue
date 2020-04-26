
<template>
  <div class="main-box2">
    <!-- 导航栏组件 -->
    <page_head :cf="cfPageHead"></page_head>
    <page_menu :cf="cfPageMenu"></page_menu>
    <!-- banner轮播图-->
    <banner class="MB20" :cf="cfBanner"></banner>
    <div class="layout1200">
      <dm_pannel_new class="MB20" title="新闻中心" skin="pannel_A__version2" urlMore="#bbbb">
        <el-row :gutter="36" class="MT20">
          <el-col :span="24" :sm="12">
            <!--资讯列表-->

            <list_article_img :cf="cfListNews2"></list_article_img>
          </el-col>
          <el-col :span="24" :sm="12">
            <!--学校新闻列表-->
            <list_article_date :cf="cfListSchoolNews"></list_article_date>
          </el-col>
        </el-row>
      </dm_pannel_new>
      <!--课程体系-->
      <dm_pannel_new
        class="MB20"
        skin="pannel_A__version2"
        urlMore="#/site/chunqiu/list_course"
        :cf="cfCourse"
      >
        <dm_list_flex_res
          class="MT20"
          :list="cfCourse.list"
          #default="{item}"
          :style_g="{'margin-bottom':'30px'}"
          col="4"
        >
          <card_course :item="item"></card_course>
        </dm_list_flex_res>
      </dm_pannel_new>

      <!--学校介绍-->
      <dm_pannel_new class="MB20" :cf="cfSchoolIntro" skin="pannel_A__version2" urlMore="#bbbb">
        <div class="DPF MT20 MB30">
          <div class="school_img_box MR30">
            <img :src="cfSchoolIntro.imgSchool" alt />
          </div>
          <div class="FX1 FS16 LH28" v-html="cfSchoolIntro.cotent"></div>
        </div>
      </dm_pannel_new>
      <!--实力保证-->
      <dm_pannel_new class="MB20" :cf="cfStrength" skin="pannel_A__version2" urlMore="#ccc">
        <div class="DPF MT20 MB30">
          <img :src="cfStrength.imgSrc" alt />
        </div>
      </dm_pannel_new>

      <!-- <com_block class="MB20">实力保证</com_block> -->
      <!--师资力量-->
      <dm_pannel_new class="MB20" :cf="cfTeacher" skin="pannel_A__version2" urlMore="#ddd">
        <dm_list_flex_res class="MT20" :list="cfTeacher.list" #default="{item}" col="4">
          <card_student_work :item="item"></card_student_work>
        </dm_list_flex_res>
      </dm_pannel_new>
    </div>

    <!-- 右侧联系我们组件 -->
    <contact_right></contact_right>
    <page_foot></page_foot>
  </div>
</template>




<script>







// import page_head from "@/components/site/page_head.vue";
// import banner from "@/components/site/banner.vue";

export default {
  components: {
    page_head: () => import("@/components/site/page_head.vue"),
    page_menu: () => import("@/components/site/page_menu.vue"),
    banner: () => import("@/components/site/banner.vue"),
    contact_right: () => import("@/components/site/contact_right.vue"),
    page_foot: () => import("@/components/site/page_foot.vue"),
    card_student_work: () => import("@/components/card/student_work.vue"),
    card_goods: () => import("@/components/card/goods.vue"),
    card_course: () => import("@/components/card/course.vue"),
    pannel_list_article_date: () => import("@/components/site/pannel_list_article_date.vue"),
    list_article_img: () => import("@/components/site/list_article_img.vue"),
    list_article_date: () => import("@/components/site/list_article_date.vue"),
  },

  data() {

    return {
      ...PUB.dataSite.sys_chunqiu
    };
  },
  methods: {

  },
  async created() {

  }


};
</script>

<style lang="scss" >
@import "@/assets/css/util.scss"; //导入公共样式文件
a {
  color: #666;
}

a:hover,
a:visited:hover {
  color: #f90;
}

.layout1200 {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/****************************列表组样式-START****************************/

.n-list-g-titlebar {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}

.n-list-g-title {
  /* width: 160px; */
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  /* float: left; */
}

/****************************列表组样式-END****************************/

/****************************标准列表图片样式-START****************************/

.n-img-box {
  width: 100%;
  height: 277px;
  overflow: hidden;
}

.n-img-box img {
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.n-img-box img {
  transform: scale(1.2);
}

/*屏幕宽度小于640px*/

@media screen and (max-width: 640px) {
  .n-img-box {
    height: 35vw;
  }
}

/*屏幕宽度小于360px*/

@media screen and (max-width: 320px) {
  .n-img-box {
    height: 58vw;
  }
}

/****************************标准列表图片样式-END****************************/

.icon-title-bar {
  color: #0091e0;
  margin-right: 8px;
}

.main-box2 {
  background-color: #f0f0f0;
}

.school_img_box {
  width: 400px;
  height: 300px;
}

.school_img_box img {
  width: 100%;
  height: 100%;
}
</style>