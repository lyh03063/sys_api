<template>
  <div>
    <van-field readonly v-model="showText" v-bind="cf.cfFieldShow"  @click="showPicker = true">
      <!--传递插槽left-icon-->
      <template v-slot:left-icon>
        <slot name="left-icon"></slot>
      </template>
      <!--传递插槽right-icon-->
      <template v-slot:right-icon>
        <slot name="right-icon"></slot>
      </template>
      <!--传递插槽button-->
      <template v-slot:right-icon>
        <slot name="button"></slot>
      </template>

      <!-- <template #input>
        <span
          class="C_f30 DP3 H24"
          @click="showPicker = true"
          style="width:50%;background1:#f0f0f0"
        >{{showText}}</span>
      </template> -->

      <!--传递插槽label-->
      <template v-slot:right-icon>
        <slot name="label"></slot>
      </template>
    </van-field>
    <van-popup v-model="showPicker" round position="bottom">
      <!--时间选择器-->
      <van-datetime-picker
        v-model="currentTime"
        type="time"
        title="选择时间"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        v-if="cf.pickerType=='time'"
      />
      <!--自定义选择器-->
      <van-picker
        v-bind="cf.cfPicker"
        :columns="columns"
        :default-index="defaultIndex"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        v-else
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  name: "m_picker_field",
  props: {
    value: {},
    cf: {
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      currentTime: "",
      defaultIndex: 0,//默认选中位置
      showPicker: false,
      showText: "",
      columns: [],

    };
  },
  methods: {
    //函数：{ajax获取选项函数}
    ajaxGetColumn: async function () {
      let cfAjax = lodash.get(this.cf, `cfPicker.cfAjax`);

      let { url, params, keyV = "value", keyL = "label" } = cfAjax
      let data = await this.$ajax({ url, data: params });
      this.columns = data.map(doc => {//改造返回的数据
        let { [keyL]: label, [keyV]: value } = doc
        return { label, value }
      })

    },
    onConfirm(obj) {

      if (this.cf.pickerType == "time") {//Q1:时间选择器
        this.showText = obj;//用于显示
        this.$emit("input", obj);//抛出input事件
      } else { //Q2:普通选择器
        this.showText = obj.label;//用于显示
        this.$emit("input", obj.value);//抛出input事件
      }
      this.showPicker = false;
      this.$emit("change", obj);//抛出change事件
    },
    //函数：{初始化普通选择器显示文本的函数}
    initShowText() {
      if (!this.value) return
      if (!this.columns) return
      let obj = this.columns.find(doc => doc.value == this.value)
      let objIndex = this.columns.findIndex(doc => doc.value == this.value)
      this.showText = obj.label;//用于显示
      this.defaultIndex = objIndex;//
    },
     //函数：{初始化时间选择器显示文本的函数}
    initShowText_time() {
     
      this.showText = this.value;//用于显示
    },
  },
  async created() {

    let cfAjax = lodash.get(this.cf, `cfPicker.cfAjax`);
    if (cfAjax) {//Q1:存在ajax配置
      await this.ajaxGetColumn()//调用：{ajax获取选项函数}
    } else { //Q2:否则
      let columns = lodash.get(this.cf, `cfPicker.columns`);
      this.columns = columns
    }

     if (this.cf.pickerType == "time") {//Q1:时间选择器
        this.initShowText_time()//调用：{初始化时间选择器显示文本的函数}
      } else { //Q2:普通选择器
        this.initShowText()//调用：{初始化显示文本的函数}
      }
    




  }
};
</script>
