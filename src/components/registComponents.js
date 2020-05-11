

//本文件用于批量注册全局组件
//列-完成度显示
import com_complete from '@/components/common/com_complete.vue'
//列-图片预览
import com_imagePreview from '@/components/common/com_imagePreview.vue'
//列-笔记熟悉度切换
import com_note_familiarity_select from '@/components/common/com_note_familiarity_select.vue'
//工具栏-计分板
import com_score_panel from '@/components/common/com_score_panel.vue'
//查询表单-完成度
import com_item_complete_search from '@/components/common/com_item_complete_search.vue'
// 表单-规格价格组件（复杂）
import com_f_item_listSpecPrice from '@/components/common/com_f_item_listSpecPrice.vue'
// 列-订单支付状态和退款操作
import com_c_item_payStatus from '@/components/common/com_c_item_payStatus.vue'

//详情-订单商品列表
import com_listGoods from '@/components/common/com_d_item_listGoods.vue'
//详情-订单地址显示
import com_addressObj from '@/components/common/com_d_item_addressObj.vue'

import com_block from '@/components/site/block.vue'
import com_longting_order_statistics from '@/components/bussiness/longting_order_statistics.vue'

const Components = {
    com_complete,com_imagePreview,com_note_familiarity_select,com_score_panel,com_item_complete_search,
    com_f_item_listSpecPrice,com_c_item_payStatus,
    com_listGoods,com_addressObj,
    com_block,
    com_longting_order_statistics
}

//安装以上多个组件
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])//全局注册
})




