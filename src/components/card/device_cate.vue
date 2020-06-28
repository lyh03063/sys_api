<template>
  <a class="link-box n-a" :href="getLink(item)">
    <div class="item-box ">
      <div class="icon-box W50 H50 MR12 n-img-box Circle">
        <img :src="item.device_type_icon" alt />
      </div>
      <span class="FX1">
        <p class=" FS16 MB10  DPF"><span class="MR8">{{item.device_type_name}}</span> <i class="count_all" >{{countAll(item)}}</i></p>
        <div class="DPF FS14 C_999">
          <div class="WP33">在线：{{item.device_online}}</div>
          <div class="WP33 TAC">离线：{{item.device_offline}}</div>
          <div class="WP33 TAR">故障：{{item.device_fault}}</div>
        </div>
      </span>
    </div>
  </a>
</template>

<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base],
  props: ["item"],

  data() {
    return {
      

    };
  },
  computed: {
   countAll(item) {//getLink注意是computed属性返回一个函数
      
      return function (item) {
        return item.device_online+item.device_offline+item.device_fault
      }
    },
    getLink(item) {//getLink注意是computed属性返回一个函数
      return function (item) {
        return `${this.hashBase}list_device?device_type=${item.device_type}&device_type_name=${item.device_type_name}&pre_page=${this.pageUrlEncode}`
      }
    },
  },

  methods: {},
  created() { }
};
</script>

<style scoped>
.item-box {
  display: flex;
  background: #fff;
  border-radius: 5px;
  padding: 12px 12px;
  align-items: center;
}
.count_all{
  line-height: 1;
border-radius: 50%;
padding: 5px 5px;
min-width: 24px;
display: inline-block;
text-align: center;
background: #f0f0f0;
font-style: normal;
font-size: 12px;
font-weight: normal;

}
</style>