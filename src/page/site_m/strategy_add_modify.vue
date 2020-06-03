<template>
  <div class="out">
    <dm_debug_list>
      <dm_debug_item v-model="formData" />
      <dm_debug_item v-model="arrCheck" />
    </dm_debug_list>
    <page_h5_zhihuigeng :title="title">
      <van-field
        v-model="formData.strategy_name"
        label="策略名称"
        placeholder="请输入策略名称"
        clearable
        size="large"
      ></van-field>

      <van-tabs
        v-model="active"
        color="#3ACC80"
        title-active-color="#3ACC80"
        @click="tabsClick"
        v-if="ready"
      >
        <van-tab name="term" title="触发条件" :title-style="tabTitleStyle">
          <div class="pannel-title">时间条件</div>
          <div class="BC_fff">
            <van-checkbox-group v-model="arrCheck" @change="changeCheck">
              <div class="check-group">
                <div class="check-group-l">
                  <van-checkbox name="ontime1" checked-color="#07c160" />
                </div>
                <div class="check-group-r">
                  <m_picker_field v-model="formData.ontime1" :cf="cf_picker_ontime1"></m_picker_field>
                </div>
              </div>

              <div class="check-group">
                <div class="check-group-l">
                  <van-checkbox name="ontime2" checked-color="#07c160" />
                </div>
                <div class="check-group-r">
                  <m_picker_field v-model="formData.ontime2" :cf="cf_picker_ontime2"></m_picker_field>
                </div>
              </div>

              <div class="check-group">
                <div class="check-group-l">
                  <van-checkbox name="duration" checked-color="#07c160" />
                </div>
                <div class="check-group-r">
                  <m_picker_field v-model="formData.duration" :cf="cf_picker_duration"></m_picker_field>
                </div>
              </div>

              <div class="check-group">
                <div class="check-group-l">
                  <van-checkbox name="irrCycle" ref="checkboxes" checked-color="#07c160" />
                </div>
                <div class="check-group-r">
                  <van-field
                    v-model.number="formData.resource_size"
                    type="number"
                    label="执行周期"
                    clearable
                    size="large"
                  >
                    <template #input>
                      <div class="FX1">
                        <!--撑开-->
                      </div>
                      <div class="TAR">
                        每隔
                        <input
                          class="input-circle"
                          v-model="formData.irrCycle"
                          type="number"
                          name="name"
                          value
                        />
                        <select class="select-circle-unit">
                          <option value="1">分钟</option>
                          <option value="2">小时</option>
                          <option value="3">天</option>
                        </select>
                      </div>
                    </template>
                  </van-field>
                </div>
              </div>

              <div class="TAR PT5 PB5 PR50 C_999">周期等于0表示不执行周期</div>
            </van-checkbox-group>
          </div>
          <div class="pannel-title">其他条件</div>
          <div class="BC_fff">
            <!--已选条件列表-->
            <list_data_zhihuigeng class :cf="cfListOtherItem" @single-action="singleAction_OItem">
              <template v-slot:slot_no_data>666666666666</template>
            </list_data_zhihuigeng>
          </div>
          <!--新增条件弹窗选择列表-->
          <m_select_list class :cf="cfSelectListItem" @confirm="confirmSelectItem"></m_select_list>
        </van-tab>
        <van-tab name="action" title="执行动作" :title-style="tabTitleStyle">
          <div class="BC_fff">
            <!--已选动作列表-->
            <list_data_zhihuigeng class :cf="cfListOP" @single-action="singleAction_OItem"></list_data_zhihuigeng>
          </div>
          <!--新增动作弹窗选择列表-->
          <m_select_list class :cf="cfSelectListOP" @confirm="confirmSelectOP"></m_select_list>
        </van-tab>
      </van-tabs>

      <div class v-if="ready">
        <dm_space height="65" class="BC_fff"></dm_space>
        <div class="n-bottom-bar" style="padding:0">
          <van-button
            class="MT10 MB10 WP50"
            type="primary"
            color="#3ACC80"
            @click="cfSelectListItem.showPopup=true"
            v-if="active=='term'"
          >添加条件</van-button>
          <van-button
            class="MT10 MB10 WP50"
            type="primary"
            color="#3ACC80"
            @click="cfSelectListOP.showPopup=true"
            v-if="active=='action'"
          >添加动作</van-button>
          <van-button
            class="MT10 MB10 WP50"
            type="info"
            color="#F5A721"
            @click="submit"
            :loading="loadingSubmit"
            loading-text="执行中..."
          >保存</van-button>
        </div>
      </div>
    </page_h5_zhihuigeng>
  </div>
</template>

<script>


let arrDuration = []

//for循环
for (var i = 0; i < 60; i++) {
  let item = { label: `${i}分钟`, value: i }
  arrDuration.push(item)
}


import OSS from 'ali-oss';
export default {
  name: "strategy_add_modify",
  mixins: [MIX.base, MIX.zhihuigeng_base,],
  components: {
    list_data_zhihuigeng: () => import("@/page/site_m/zhihuigeng/components/list_data_zhihuigeng.vue"),
  },
  data() {
    return {
      arrCheck: [],//复选框选项
      arrCheckAll: ["ontime1", "ontime2", "duration", "irrCycle",],
      active: "term",//tab聚焦
      tabTitleStyle: "font-size:18px",
      ready: false,
      mode: "add",
      loadingSubmit: false,//提交数据的loading




      //已选条件列表配置
      cfListOP: {
        finishedText: "",
        cfVanList: { class: "" },
        com_card: "card_device_op_selected",
        cf_list_flex: {
          col: 1, style_g: {
            'margin-bottom': 0, 'border-bottom': '1px #f0f0f0 solid'
          }
        },
        list: [],

      },

      //新增动作弹窗选择列表配置
      cfSelectListOP: {
        title: "选择动作设备",
        showPopup: false,
        cfPopup: {
          position: 'bottom',
          style: { height: '70%' },
        },

        cfList: {
          com_card: "card_device_op_select",
          ajax: {//ajax配置
            url: `/resource/resource_device_info_v2`,
            params: { mold: 2 },//  
          },
          cf_list_flex: {
            col: 1, style_g: {
              'margin-bottom': 0, 'border-bottom': '1px #f0f0f0 solid'
            }
          },
          listTest: [],

        },
      },

      //已选条件列表配置
      cfListOtherItem: {
        finishedText: "",
        cfVanList: { class: "" },
        com_card: "card_device_item_selected",
        cf_list_flex: {
          col: 1, style_g: {
            'margin-bottom': 0, 'border-bottom': '1px #f0f0f0 solid'
          }
        },
        cfNoData: {
          text: "",
          iconType: "no",
        },
        list: [],

      },

      //新增条件弹窗选择列表配置
      cfSelectListItem: {
        title: "选择条件设备",
        showPopup: false,
        cfPopup: {
          position: 'bottom',
          style: { height: '70%' },
        },

        cfList: {
          com_card: "card_device_item_select",
          ajax: {//ajax配置
            url: `/resource/resource_device_info_v2`,
            params: { mold: [5] },//  过滤环境和控制
          },

          cf_list_flex: {
            col: 1, style_g: {
              'margin-bottom': 0, 'border-bottom': '1px #f0f0f0 solid'
            }
          },
          list: [
            {
              "equipment_code": "xxxxx",    //设备码
              "equipment_type": 165,         //设备类型
              "equipment_type_name": "空气温度",
              "equipment_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
              "compare": "0",              //比较类型 0:<,1:<=,2:=,3:>=,4:>
              "value": "15",               //比较值
              "unit": "℃",                //设备单位
              "equipment_name": "北边温湿度"  //设备名称
            }
          ],
        },
      },

      //选择器配置
      cf_picker_ontime1: {
        pickerType: "time",//选择器类型time
        cfFieldShow: {
          "label": "触发时间1",
          "placeholder": "请选择时间",
          "input-align": "right",
          "size": "large",
          "right-icon": "arrow-down",
        },
        cfPicker: {
          "show-toolbar": true,
          "value-key": "label",
        },

      },
      //选择器配置
      cf_picker_ontime2: {
        pickerType: "time",//选择器类型time
        cfFieldShow: {
          "label": "触发时间2",
          "placeholder": "请选择时间",
          "input-align": "right",
          "size": "large",
          "right-icon": "arrow-down",
        },
        cfPicker: {
          "show-toolbar": true,
          "value-key": "label",
        },

      },
      //选择器配置
      cf_picker_duration: {
        cfFieldShow: {
          "label": "执行时长",
          "placeholder": "请选择时长",
          "input-align": "right",
          "size": "large",
          "right-icon": "arrow-down",
        },
        cfPicker: {
          "show-toolbar": true,
          "value-key": "label",
          "columns": arrDuration,
        },

      },
      formData: {
        "ontime1": "12:00",
        "ontime2": "14:00",
        strategy_id: "",
        strategy_name: "",
        irrCycle: null,
        "conditions": [
          {
            "equipment_code": "xxxxx",    //设备码
            "equipment_type": 165,         //设备类型
            "equipment_type_name": "空气温度",
            "equipment_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "compare": "0",              //比较类型 0:<,1:<=,2:=,3:>=,4:>
            "value": "15",               //比较值
            "unit": "℃",                //设备单位
            "equipment_name": "北边温湿度x"  //设备名称
          },
          {
            "equipment_code": "xxxxx1",    //设备码
            "equipment_type": 165,         //设备类型
            "equipment_type_name": "空气温度",
            "equipment_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "compare": "0",              //比较类型 0:<,1:<=,2:=,3:>=,4:>
            "value": "15",               //比较值
            "unit": "℃",                //设备单位
            "equipment_name": "北边温湿度y"  //设备名称
          },
        ],
        "controlDevice": [
          {
            "equipment_code": "xxxxx",        //设备码
            "equipment_type": 12,             //设备类型
            "equipment_type_name": "加湿机",    //设备类型名称
            "equipment_type_icon": "https://ranktop-config.oss-cn-shenzhen.aliyuncs.com/images/1B4FAFD6C9D19A635B5059E1B320C48C",
            "cmd": "1",                      //设备的操作指令, 0:关闭，1:开启
            "equipment_name": "加湿机"  //设备名称
          },
        ]
      },

    };
  },
  watch: {

    "cfListOtherItem.list": {
      handler(newVal, oldVal) {
        this.formData.conditions = newVal
      },
      immediate: true,
      deep: true
    },
    "cfListOP.list": {
      handler(newVal, oldVal) {
        this.formData.controlDevice = newVal
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    //函数：{选项变动函数}
    changeCheck: async function (value) {
    },




    //函数：{列表单项操作的处理函数}
    async singleAction_OItem({ action, doc, vm }) {
      if (action == "modify") {//Q1:修改
        let path = "aaaaaaaaaaaaaa";
        alert(`modify`);
        // this.$router.push({ path });//跳转页

      } else if (action == "detail") { //Q2:查看详情
        alert(`查看详情`);
      } else if (action == "delete") { //Q3:删除
        let index = vm.list.findIndex(d => d.equipment_code == doc.equipment_code)
        vm.list.splice(index, 1)//删除数据
      }

    },
    //函数：{确认选择动作的函数}
    confirmSelectOP: async function (params) {

      let { listSelected } = params
      if (!(listSelected && listSelected.length)) return
      //变量：{需要加入的动作文档}
      let listNeedPush = listSelected.filter(d => {
        //变量：{已选动作中已存在的文档}
        let docHas = this.cfListOP.list.find(d2 => d2.equipment_code == d.equipment_code)
        return !docHas
      })
      if (!(listNeedPush && listNeedPush.length)) return




      listNeedPush = listNeedPush.map(doc => {
        let { equipment_name, equipment_type_name, equipment_type_icon, equipment_code, equipment_type, } = doc
        let obj = {
          cmd: "1",//
          equipment_name, equipment_type_name, equipment_type_icon, equipment_code, equipment_type,
        }
        return obj
      })


      this.cfListOP.list.push(...listNeedPush)

    },
    //函数：{确认选择条件的函数}
    confirmSelectItem: async function (params) {
      let { listSelected } = params
      if (!(listSelected && listSelected.length)) return
      //变量：{需要加入的条件文档}
      let listNeedPush = listSelected.filter(d => {
        //变量：{已选条件中已存在的文档}
        let docHas = this.cfListOtherItem.list.find(d2 => d2.equipment_code == d.equipment_code)
        return !docHas
      })



      listNeedPush = listNeedPush.map(doc => {
        let { equipment_name, equipment_type_name, equipment_type_icon, equipment_code, equipment_type, unit } = doc

        let obj = {
          compare: 2,//等于
          equipment_name, equipment_type_name, equipment_type_icon, equipment_code, equipment_type, unit
        }
        if (equipment_type == "6") {//如果是开关,先设置value
          obj.value = "1"
        }



        return obj
      })


      if (!(listNeedPush && listNeedPush.length)) return
      this.cfListOtherItem.list.push(...listNeedPush)

    },

    //函数：{tabs页点击的处理函数}
    tabsClick: async function (name, title) {
      this.active = name
    },

    async submit() {
      let url = `/strategy/setStrategy`
      let tipsSuccess = "添加策略成功"
      if (this.mode == "modify") {//如果是修改
        url = `/strategy/updStrategy`
        tipsSuccess = "修策略改成功"
      }
      this.loadingSubmit = true;//loading
      let { strategy_name, } = this.formData
      if (!strategy_name) return this.$toast('策略名称必填！');
      //变量：{需删除的属性数组}
      let arrNeedDelete = lodash.difference(this.arrCheckAll, this.arrCheck);//取非集
      let formData = lodash.cloneDeep(this.formData);

      arrNeedDelete.forEach(key => {//循环：{需删除的属性数组}
        delete formData[key]//删除属性
      })

      let data = await this.$ajax({ url, data: formData });//ajax
      if (data === false) return;
      if (data) {//如果data存在
        let { uuid } = data;
        let dataRS = await this.rollQuery(uuid, 0)//调用：{轮询指令设置结果函数}
        if (dataRS.code === 0) {//如果调用成功
          this.$toast(tipsSuccess);//
          this.onClickLeft()//返回上一页
        } else if (dataRS.code === 100001) {
          this.$toast('操作失败，超时');
        } else {
          this.$toast(`操作失败:${dataRS.msg}`);
        }
      }
      this.loadingSubmit = false;//loading取消
    },
    //函数：{初始化修改表单函数}
    initFormModify: async function () {
      let data = await this.$ajax({
        url: `/strategy/queryDetail`, data: { strategy_id: this.strategy_id }
      });
      if (data === false) return
      //合并对象
      Object.assign(this.formData, { ...data });
      //变量：{完整选项}

      this.arrCheck = this.arrCheckAll.filter(key => !!data[key])//有值的选项聚焦
    },
    //函数：{关联表单和两个列表的函数}-建立联动
    relFormAndList: async function () {

      //***其他条件列表赋值，跟conditions绑定
      this.cfListOtherItem.list = this.formData.conditions
      //***动作列表赋值，跟controlDevice绑定
      this.cfListOP.list = this.formData.controlDevice
    },



  },
  async created() {
    this.title = "添加策略";//修改标题
    //注意这里的equipment_id一定是网关设备
    let { strategy_id, resource_id, equipment_id } = this.$route.query;
    this.cfSelectListItem.cfList.ajax.params.resource_id = resource_id//传入资产ID
    if (strategy_id) {//如果有resource_id，表示修改资产
      this.strategy_id = strategy_id;
      this.mode = "modify";
      this.title = "修改策略";//修改标题
    }
    window.document.title = this.title

    this.formData.strategy_id = strategy_id;
    this.formData.resource_id = resource_id;
    this.formData.equipment_id = equipment_id;





    if (this.mode == "modify") {//如果是修改
      await this.initFormModify();//调用：{初始化修改表单函数}

    }
    this.relFormAndList();//调用：{关联表单和两个列表的函数}
    this.ready = true;




  }
};
</script>


<style scoped>
.check-group {
  display: flex;
  align-items: center;
}
.check-group-l {
  width: 36px;
  padding: 0 0 0 13px;
  margin-right: 10px;
}

.check-group-r {
  flex: 1;
}

.check-group-r >>> .van-cell {
  padding-left: 0px;
}

.out >>> .n-m-main-box {
  /* background-color: #fff; */
}

.input-circle {
  border: 1px #ddd solid;
  /* border: none; */
  margin-right: 5px;
  width: 70px;
  height: 24px;
}

.select-circle-unit {
  border: 1px #ddd solid;
  /* border: none; */
  width: 50px;
  height: 24px;
}

.pannel-title {
  padding: 14px 0 4px 10px;

  color: #999;
}
</style>
