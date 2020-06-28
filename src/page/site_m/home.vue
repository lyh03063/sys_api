
<template>
  <div class="out" v-if="readyBase">
    <dm_debug_list>
      <dm_debug_item v-model="dataBanner" />
      <dm_debug_item v-model="dataStat" />
    </dm_debug_list>

    <page_h5_zhihuigeng :title="title" >
      <van-swipe :autoplay="3000" style="width:10rem;height:4.5rem">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <a  target="_blank"  :href="item.link">
             <img :src="item.src" style="width:10rem;height:5rem" />
          </a>
         
        </van-swipe-item>
      </van-swipe>
      <dm_space height="20"></dm_space>
      <!-- <com_block class="MB20">首页</com_block> -->

      <div class="PL10 PR10">
        <dm_list_flex_res
          class="MB20"
          :list="listCard"
          :style_g="style_g"
          #default="{item}"
          col="2"
        >
          <div class="card-group" :style="`background: ${item.bgColor};`">
            <a class="DPB" :href="`${hashBase}${item.href}`">
              <div class="C_fff TAR OFH">
                <van-icon :name="item.icon" size="30px" />
              </div>

              <div class="C_fff FS18">{{item.title}}</div>
              <div class="C_fff">{{item.desc}}</div>
            </a>
          </div>
        </dm_list_flex_res>
        <dm_space height="20"></dm_space>

        <div class="DPF" v-if="ready_echarts">
          <div class="WP50">
            <!--图表1-->
            <dm_echart class="M_0" style="width: 4.5rem;height:5rem;" :cf="cfChart1"></dm_echart>
          </div>
          <div class="WP50">
            <!--图表2-->
            <dm_echart class="M_0" style="width: 4.5rem;height:5rem;" :cf="cfChart2"></dm_echart>
          </div>
        </div>
      </div>
      <dm_space height="60"></dm_space>
      <!--底部菜单栏-->
      <tabbar_zhihuigeng></tabbar_zhihuigeng>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>

let optionPie1 = {
  title: {
    text: '资源块状态',
    left: 'center',
    textStyle: {
      fontSize: 16,
    }

  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom',
    data: ['正常', '低风险', '高风险'],
    itemWidth: 6,
    itemHeight: 6,
  },
  color: ['#00CA66', '#979DFD', '#f60',],//颜色配置
  series: [

    {
      itemStyle: {//自定义显示标签
        normal: {
          label: {
            show: true,
            position: 'inner',
            fontSize: 12,
            align: "left",
            formatter: function (p) {   //指示线对应文字，说明文字
              if (!p.data.value) return ""
              return `${p.percent}%`;
            }
          },
        }
      },
      name: '数据',
      type: 'pie',
      radius: '75%',//饼图大小
      center: ['50%', '50%'],//位置设置
      data: [
        { value: 0, name: '正常' },
        { value: 0, name: '低风险' },
        { value: 0, name: '高风险' },
      ],

    }
  ]
}

let optionPie2 = lodash.cloneDeep(optionPie1);

Object.assign(optionPie2, {
  title: {
    text: '设备状态',
    left: 'center',
    textStyle: {
      fontSize: 16,
    }
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom',
    data: ['在线', '离线', '故障'],
    itemWidth: 6,
    itemHeight: 6,
  },
  color: ['#00CA66', '#989EFF', '#ff6600',],//颜色配置
  series: [
    {
      itemStyle: {//自定义显示标签
        normal: {
          label: {
            show: true,
            position: 'inner',
            fontSize: 12,
            align: "left",
            formatter: function (p) {   //指示线对应文字，说明文字
              if (!p.data.value) return ""
              return `${p.percent}%`;
            }
          },
        }
      },
      name: '数据',
      type: 'pie',
      radius: '75%',//饼图大小
      center: ['50%', '50%'],//位置设置
      data: [
        { value: 0, name: '在线' },
        { value: 0, name: '离线' },
        { value: 0, name: '故障' },
      ],

    }
  ]
});//合并对象



export default {

  mixins: [MIX.base, MIX.zhihuigeng_base],
  components: {
  },

  data() {

    return {
      title: "智慧耘物联",
      style_g: { width: '48%', 'margin-bottom': 0 },//固定两列，不自动响应
      ready_echarts: false,
      listCard: [
        //icon: "icon_assets",icon: "icon_equipment",
        { title: "资源", desc: "园区、产地等", icon: "shop", bgColor: "#897DFD", href: "list_asset_cate" },
        { title: "设备", desc: "尝鲜智能设备", icon: "photograph", bgColor: "#FEC202", href: "list_device_cate" },
      ],
      
      images: [
         { link:"https://www.ranktop.top", src: "https://ranktop-agriculture.oss-cn-shenzhen.aliyuncs.com/1590720587746.png",},
         { link:"https://www.ranktop.top", src: "https://ranktop-agriculture.oss-cn-shenzhen.aliyuncs.com/1590720587746.png",}
      ],
      dataBanner: null,
      dataStat: null,

      cfChart1: {
        option: optionPie1
      },
      cfChart2: {
        option: optionPie2
      },
    };
  },
  methods: {
    //函数：{ajax获取Banner列表数据函数}
    ajaxGetListBanner: async function () {
      this.dataBanner = await this.$ajax({ url: `/index/bannerInfo`, data: {} });

    },
    //函数：{ajax获取商户资源,设备状态统计函数}
    ajaxGetStat: async function () {
      let rsp = await this.$ajaxBase({ url: `/merchant/merchant_stat_data_distribution`, data: {} });

      if (rsp.data.code == 0) {//如果code是0
        this.dataStat = rsp.data.data
        let { normalCount, lowRiskCount, highRiskCount } = this.dataStat.resourceStat

        this.cfChart1.option.series[0].data = [
          { value: normalCount, name: '正常' },
          { value: lowRiskCount, name: '低风险' },
          { value: highRiskCount, name: '高风险' },
        ]

        let { onlineCount, offlineCount, faultCount } = this.dataStat.deviceStat

        this.cfChart2.option.series[0].data = [
          { value: onlineCount, name: '在线' },
          { value: offlineCount, name: '离线' },
          { value: faultCount, name: '故障' },
        ]
      }


    },
    //自定义生命周期函数：{准备好基础资源的后续函数}--
    afterReadyBase: async function () {
      window.document.title = this.title
      this.ajaxGetListBanner()//调用：{ajax获取Banner列表数据函数}
      await this.ajaxGetStat()//调用：{ajax获取商户资源,设备状态统计函数}

      let rsLoadJs = await util.loadJs({ url: PUB.urlJS.echarts })
      console.log(`rsLoadJs:###############`, rsLoadJs);
      this.ready_echarts = true;
     

    },


  },
  async created() {





  },
 


};
</script>

<style scoped >
.card-group {
  height: 100px;
  border-radius: 5px;
  padding: 10px 10px;
}

.out >>> .n-m-main-box {
  background-color: #fff;
}
</style>