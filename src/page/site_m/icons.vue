
<template>
  <div class="main-box2" v-if="readyBase">
    <div class="n-m-main-box1">
      <div class="clearfix PL10 PR10 pannel1">
        <dm_pannel_new
          class="MB20 TAL pannel1"
          title="雪碧图图标缩放方案【尽量不要缩放，如需要则推荐左侧方案】，还可考虑REM"
          skin1="pannel_A"
        >
          <div class="DPF">
            <div class="WP50 MR10">
              <el-alert
                class="MB20 MT10"
                title="通过2d转换进行缩放，多一层div锁定显示位置，transform-origin变换基点到左上角"
                type="warning"
                :closable="false"
              ></el-alert>

              <div class="icon-zhg icon_enlarge"></div>
              <div class="DP3" style="width:160px;height:160px;">
                <div class="icon-zhg icon_enlarge" style="transform: scale(2);transform-origin:0 0"></div>
              </div>
              <div class="icon-zhg icon_abnormal_2"></div>
               <div class="DP3" style="width:184px;height:88px;">
                <div class="icon-zhg icon_abnormal_2" style="transform: scale(2);transform-origin:0 0"></div>
              </div>
              1111
            </div>
            <div class="WP50">
              <el-alert
                class="MB20 MT10"
                title="通过background-size和background-position放大两倍来实现，很麻烦"
                type="warning"
                :closable="false"
              ></el-alert>

              <div class="icon-zhg icon_enlarge"></div>

              <div
                class="icon-zhg"
                style="width:160px;height:160px;background-size:  10198px 2940px;background-position: -6150px -2306px;"
              ></div>4567
            </div>
          </div>
        </dm_pannel_new>

        <el-alert
          class="MB20"
          title="这里是使用雪碧图模式，引用图标时需要统一加上icon-zhg类名，部分100px的图标需要加上size_100_100类名"
          type="warning"
          :closable="false"
        ></el-alert>
        <dm_pannel_new class="MB20 TAL pannel1" title="资产图标(100px)" skin1="pannel_A">
          <dm_list_flex_res class="MT20" :list="arrIconAssets" #default="{item}" col="5">
            <div class="li_icon TAC">
              <i :class="`icon-zhg size_100_100 icon_${item.en}`"></i>
              <div class>{{item.ch}}</div>
              <div class="TAC">
                icon_{{item.en}}
                <br />size_100_100
              </div>
            </div>
          </dm_list_flex_res>
        </dm_pannel_new>

        <dm_pannel_new class="MB20 TAL pannel1" title="设备类型图标(100px)" skin1="pannel_A">
          <dm_list_flex_res class="MT20" :list="arrIcon100" #default="{item}" col="5">
            <div class="li_icon TAC">
              <i :class="`icon-zhg size_100_100 icon_${item.en}`"></i>
              <div class>
                icon_{{item.en}}
                <br />size_100_100
              </div>
            </div>
          </dm_list_flex_res>
        </dm_pannel_new>

        <dm_pannel_new class="MB20 TAL pannel1" title="媒体图标" skin1="pannel_A">
          <dm_list_flex_res class="MT20" :list="arrIconMedia" #default="{item}" col="5">
            <div class="li_icon TAC">
              <i :class="`icon-zhg  icon_${item.en}`"></i>
              <div class>{{item.ch}}</div>
              <div class>icon_{{item.en}}</div>
              <div class="FS10 FM4 C_999">{{item.w}}&nbsp;×&nbsp;{{item.h}}</div>
            </div>
          </dm_list_flex_res>
        </dm_pannel_new>

        <dm_pannel_new class="MB20 TAL pannel1" title="其他小图标" skin1="pannel_A">
          <dm_list_flex_res class="MT20" :list="arrIconOtherSmall" #default="{item}" col="5">
            <div class="li_icon TAC">
              <i :class="`icon-zhg  icon_${item.en}`"></i>
              <div class>{{item.ch}}</div>
              <div class>icon_{{item.en}}</div>
              <div class="FS10 FM4 C_999">{{item.w}}&nbsp;×&nbsp;{{item.h}}</div>
            </div>
          </dm_list_flex_res>
        </dm_pannel_new>

        <dm_pannel_new class="MB20 TAL pannel1" title="其他大图标" skin1="pannel_A">
          <dm_list_flex_res class="MT20" :list="arrIconOtherBig" #default="{item}" col="2">
            <div class="li_icon TAC">
              <i :class="`icon-zhg  icon_${item.en}`"></i>
              <div class>{{item.ch}}</div>
              <div class>icon_{{item.en}}</div>
              <div class="FS10 FM4 C_999">{{item.w}}&nbsp;×&nbsp;{{item.h}}</div>
            </div>
          </dm_list_flex_res>
        </dm_pannel_new>
      </div>

      <com_block class="MB20">页脚</com_block>
    </div>
  </div>
</template>

<script>



export default {
    mixins: [MIX.base, MIX.zhihuigeng_base,],
  components: {
  },

  data() {

    return {
      arrIconOtherBig: [
        { en: "default_avatar", ch: "默认头像", x: "-175px", y: "-735px", w: "130px", h: "130px" },
        { en: "default_picture", ch: "默认图片", x: "-1510px", y: "-840px", w: "160px", h: "160px" },
        { en: "no_record", ch: "暂无记录", x: "-3070px", y: "-621px", w: "200px", h: "140px" },
        { en: "network_failure ", ch: "网络失败", x: "-3351px", y: "-609px", w: "200px", h: "140px" },
        { en: "home_entry ", ch: "首页入口bg", x: "-3070px", y: "-305px", w: "124px", h: "124px" },
        // { en: "banner", ch: "主图", x: "-150px", y: "-127px", w: "750px", h: "340px" },
        { en: "scan_big", ch: "扫一扫", x: "-3907px", y: "-432px", w: "518px", h: "518px" },

      ],
      arrIconOtherSmall: [
        { en: "menu_home", ch: "主菜单-首页", x: "-150px", y: "-556px", w: "54px", h: "54px" },
        { en: "menu_home_active", ch: "主菜单-首页-激活", x: "-215px", y: "-556px", w: "54px", h: "54px" },
        { en: "menu_selection", ch: "主菜单-甄选", x: "-406px", y: "-556px", w: "54px", h: "54px" },
        { en: "menu_selection_active", ch: "主菜单-甄选-激活", x: "-499px", y: "-556px", w: "54px", h: "54px" },
        { en: "menu_my", ch: "主菜单-我的", x: "-644px", y: "-556px", w: "54px", h: "54px" },
        { en: "menu_my_active", ch: "主菜单-我的-激活", x: "-717px", y: "-556px", w: "54px", h: "54px" },
        { en: "edit_middle", ch: "修改", x: "-770px", y: "-398px", w: "60px", h: "60px" },
        { en: "weather", ch: "天气", x: "-613px", y: "-785px", w: "40px", h: "40px" },
        { en: "humidity", ch: "湿度", x: "-698px", y: "-782px", w: "40px", h: "40px" },
        { en: "air_quality", ch: "空气质量", x: "-777px", y: "-784px", w: "40px", h: "40px" },
        { en: "camera_small ", ch: "摄像头-小", x: "-830px", y: "-531px", w: "70px", h: "70px" },
        { en: "assets", ch: "资产", x: "-193px", y: "-933px", w: "46px", h: "46px" },
        { en: "product", ch: "产品", x: "-276px", y: "-931px", w: "46px", h: "46px" },
        { en: "equipment", ch: "设备", x: "-360px", y: "-931px", w: "46px", h: "46px" },
        { en: "Password", ch: "密码", x: "-175px", y: "-1092px", w: "50px", h: "50px" },
        { en: "phone", ch: "手机", x: "-269px", y: "-1092px", w: "50px", h: "50px" },
        { en: "vCode", ch: "验证码", x: "-380px", y: "-1092px", w: "50px", h: "50px" },
        { en: "time_point", ch: "时间点", x: "-1221px", y: "-378px", w: "24px", h: "24px" },
        { en: "return", ch: "返回", x: "-1164px", y: "-531px", w: "20px", h: "34px" },
        { en: "return_white", ch: "返回 -白色", x: "-1201px", y: "-530px", w: "20px", h: "34px" },
        { en: "more", ch: "more", x: "-1269px", y: "-544px", w: "14px", h: "22px" },
        { en: "add", ch: "添加", x: "-1323px", y: "-534px", w: "32px", h: "32px" },
        { en: "search", ch: "搜索", x: "-1164px", y: "-614px", w: "42px", h: "42px" },
        { en: "search_white", ch: "搜索-白色", x: "-1334px", y: "-614px", w: "42px", h: "42px" },
        { en: "scan_middle", ch: "扫一扫-2", x: "-1247px", y: "-614px", w: "42px", h: "42px" },

        { en: "abnormal_1", ch: "异常01", x: "-1550px", y: "-297px", w: "40px", h: "40px" },
        { en: "abnormal_2", ch: "异常2", x: "-1670px", y: "-293px", w: "92px", h: "44px" },
        { en: "normal", ch: "正常", x: "-1826px", y: "-293px", w: "92px", h: "44px" },
        { en: "my_farm", ch: "个人中心-农场", x: "-2002px", y: "-302px", w: "41px", h: "25px" },
        { en: "delete", ch: "删除", x: "-2106px", y: "-297px", w: "40px", h: "40px" },
        { en: "dialog_close", ch: "弹层-关闭", x: "-2237px", y: "-302px", w: "30px", h: "30px" },
        { en: "telephone", ch: "电话", x: "-2426px", y: "-304px", w: "30px", h: "30px" },
        { en: "edit_small", ch: "修改2", x: "-2500px", y: "-304px", w: "36px", h: "36px" },
        { en: "add_middle", ch: "添加", x: "-1533px", y: "-442px", w: "50px", h: "50px" },
        { en: "switch_on", ch: "开关-on", x: "-1696px", y: "-441px", w: "104px", h: "58px" },
        { en: "switch_off", ch: "开关-off", x: "-1864px", y: "-441px", w: "104px", h: "58px" },
        { en: "delete_2", ch: "删除-2", x: "-2069px", y: "-447px", w: "34px", h: "34px" },
        { en: "edit_3", ch: "编辑", x: "-2137px", y: "-447px", w: "34px", h: "34px" },
        { en: "publish", ch: "发布", x: "-2202px", y: "-447px", w: "34px", h: "34px" },
        { en: "lower_shelf ", ch: "下架", x: "-2272px", y: "-447px", w: "34px", h: "34px" },
        { en: "close", ch: "关闭2", x: "-1726px", y: "-840px", w: "40px", h: "40px" },
        { en: "search2", ch: "搜索2", x: "-2353px", y: "-1123px", w: "30px", h: "30px" },
        { en: "scan_3", ch: "扫一扫icon", x: "-2431px", y: "-1123px", w: "40px", h: "40px" },
        { en: "radio", ch: "选择-未选中", x: "-2535px", y: "-1122px", w: "42px", h: "42px" },
        { en: "radio_active", ch: "选择-选中", x: "-2607px", y: "-1123px", w: "42px", h: "42px" },
        { en: "bucket", ch: "水桶", x: "-2849px", y: "-1177px", w: "34px", h: "38px" },
        { en: "flash_lamp", ch: "闪光灯", x: "-3907px", y: "-350px", w: "26px", h: "42px" },
        { en: "to_left", ch: "左", x: "-3217px", y: "-1164px", w: "80px", h: "73px" },
        { en: "to_right", ch: "右", x: "-3344px", y: "-1164px", w: "80px", h: "73px" },
        { en: "to_top", ch: "上", x: "-3517px", y: "-1175px", w: "73px", h: "80px" },
        { en: "to_bottom", ch: "下", x: "-3637px", y: "-1153px", w: "73px", h: "80px" },


      ],
      arrIcon11111: [
        // { en: "aaa", ch: "000", x: "-1111", y: "-1111" , w: "1111", h: "1111"},


      ],
      //媒体图标
      arrIconMedia: [
        { en: "play", ch: "播放", x: "-2001px", y: "-1098px", w: "80px", h: "79px" },
        { en: "stop_play", ch: "暂停", x: "-2146px", y: "-1098px", w: "80px", h: "79px" },
        { en: "slider_b", ch: "进度条底板", x: "-1600px", y: "-1113px", w: "300px", h: "8px" },
        { en: "slider_t", ch: "进度条上板", x: "-1600px", y: "-1155px", w: "240px", h: "8px" },
        { en: "slider_point", ch: "滑动点", x: "-1600px", y: "-1187px", w: "70px", h: "70px" },
        { en: "slider_sub", ch: "减少", x: "-1541px", y: "-1115px", w: "32px", h: "32px" },
        { en: "slider_add", ch: "添加", x: "-1920px", y: "-1101px", w: "32px", h: "32px" },
        { en: "reduce", ch: "缩小", x: "-2963px", y: "-1153px", w: "80px", h: "80px" },
        { en: "enlarge", ch: "放大", x: "-3073px", y: "-1153px", w: "80px", h: "80px" },
      ],
      arrIconAssets: [
        { en: "orchard", ch: "果园", x: "-1520px", y: "-127px" },
        { en: "tea_garden", ch: "茶园", x: "-1696px", y: "-127px" },
        { en: "vegetable_field", ch: "菜地", x: "-1872px", y: "-127px" },
        { en: "fish_pond", ch: "鱼塘", x: "-2202px", y: "-127px" },
        { en: "grain_field", ch: "五谷田", x: "-2366px", y: "-127px" },
        { en: "processing_line", ch: "加工产线", x: "-2536px", y: "-127px" },
        { en: "material_warehouse", ch: "原料库房", x: "-2668px", y: "-127px" },
        { en: "product_warehouse", ch: "成品库房", x: "-2816px", y: "-127px" },
        { en: "exclusive_shop", ch: "专卖店", x: "-2958px", y: "-127px" },


      ],
      arrIcon100: [
        { en: "camera", ch: "摄像头", x: "-1520px", y: "-635px" },
        { en: "light", ch: "照明", x: "-1696px", y: "-635px" },
        { en: "irrigator", ch: "灌溉器", x: "-1868px", y: "-635px" },
        { en: "carbon_dioxide", ch: "二氧化碳", x: "-2026px", y: "-635px" },
        { en: "temperature_humidity", ch: "温湿度", x: "-2181px", y: "-635px" },
        { en: "gateway", ch: "网关", x: "-2316px", y: "-636px" },
        { en: "gps", ch: "GPS", x: "-2451px", y: "-635px" },
        { en: "lock", ch: "门锁", x: "-2586px", y: "-636px" },
        { en: "switch", ch: "开关", x: "-2726px", y: "-631px" },
        { en: "ejector_fan", ch: "抽风机", x: "-2866px", y: "-631px" },
        { en: "water_level ", ch: "水位", x: "-1826px", y: "-811px" },
        { en: "wind_speed ", ch: "风速", x: "-2046px", y: "-811px" },
        { en: "wind_direction ", ch: "风向", x: "-2167px", y: "-811px" },
        { en: "pm10", ch: "PM10", x: "-2287px", y: "-811px" },
        { en: "PM2_5", ch: "PM2.5", x: "-2407px", y: "-811px" },
        { en: "noise", ch: "噪音", x: "-2527px", y: "-811px" },
        { en: "precipitation", ch: "降水量", x: "-2647px", y: "-811px" },
        { en: "atmos", ch: "大气压", x: "-2768px", y: "-811px" },
        { en: "light_sensor", ch: "光照感应器", x: "-2888px", y: "-811px" },
        { en: "default_device ", ch: "默认设备", x: "-3008px", y: "-811px" },
        { en: "rolling_shutter ", ch: "卷帘", x: "-2788px", y: "-971px" },
        { en: "sunscreen", ch: "遮阳网", x: "-2928px", y: "-971px" },
        { en: "humidifier", ch: "加湿机", x: "-3071px", y: "-971px" },
        { en: "film_rolling_machine ", ch: "卷膜机", x: "-3231px", y: "-971px" },
        { en: "insect_proof_lamp ", ch: "防虫灯", x: "-3374px", y: "-971px" },
        { en: "water_pump", ch: "水泵", x: "-3517px", y: "-971px" },
        { en: "water_fertilizer_barrel ", ch: "水肥桶", x: "-3677px", y: "-971px" },
        { en: "valve", ch: "阀门", x: "-3837px", y: "-971px" },
        { en: "conductivity", ch: "电导率", x: "-3833px", y: "-1137px" },
        { en: "ph", ch: "酸碱度", x: "-3980px", y: "-1138px" },
        { en: "camera_off", ch: "摄像头-灰色", x: "-2498px", y: "-455px" },

      ],
      ...PUB.dataSite.sys_chunqiu
    };
  },
  methods: {

  },
  async created() {
    window.cssCode = ""
    this.arrIconOtherBig.forEach(doc => {//循环：{000数组}

      window.cssCode += `
     .icon_${doc.en} {
  background-position: ${doc.x} ${doc.y};
width: ${doc.w};
height: ${doc.h};
}
     `





    })







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


.pannel1 {
  background-color: #f0f0f0;
}

</style>