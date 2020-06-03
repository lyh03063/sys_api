

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
import com_column_operate_rel_data from '@/components/common/com_c_operate_rel_data.vue'
import com_column_operate_entity_data from '@/components/common/com_c_operate_entity_data.vue'


import com_c_countSonTask from '@/components/common/com_c_countSonTask.vue'
import com_c_sonData from '@/components/common/com_c_sonData.vue'
import com_c_sonTaskGId from '@/components/common/com_c_sonTaskGId.vue'
import com_c_sonNoteGId from '@/components/common/com_c_sonNoteGId.vue'
import com_c_g_person_file from '@/components/common/com_c_g_person_file.vue'
import com_c_g_person_url from '@/components/common/com_c_g_person_url.vue'
import com_c_g_person_image from '@/components/common/com_c_g_person_image.vue'
import com_c_g_person_album from '@/components/common/com_c_g_person_album.vue'
import com_c_g_album_image from '@/components/common/com_c_g_album_image.vue'


import com_c_g_company_url from '@/components/common/com_c_g_company_url.vue'
import com_c_g_company_person from '@/components/common/com_c_g_company_person.vue'
import com_c_g_company_file from '@/components/common/com_c_g_company_file.vue'
import com_c_g_company_image from '@/components/common/com_c_g_company_image.vue'
import com_c_g_company_album from '@/components/common/com_c_g_company_album.vue'

import com_page_detail_group from '@/page/detail_group.vue'

import page_h5_zhihuigeng from '@/page/site_m/zhihuigeng/components/page_h5_zhihuigeng.vue'
import m_picker_field from '@/components/form_item/m_picker_field.vue'
import m_select_list from '@/components/form_item/m_select_list.vue'
import play_live_vedio from '@/page/site_m/zhihuigeng/components/play_live_vedio.vue'

import tabbar_zhihuigeng from '@/page/site_m/zhihuigeng/components/tabbar.vue'


const Components = {
    com_complete,com_imagePreview,com_note_familiarity_select,com_score_panel,com_item_complete_search,
    com_f_item_listSpecPrice,com_c_item_payStatus,
    com_listGoods,com_addressObj,
    com_block,
    com_longting_order_statistics,
    com_column_operate_rel_data,com_column_operate_entity_data,
    com_c_sonData,com_c_countSonTask,com_c_sonTaskGId,com_c_sonNoteGId,
    com_page_detail_group,//整个分组数据列表页***
    tabbar_zhihuigeng,page_h5_zhihuigeng,//智慧耕h5页面
    m_picker_field,m_select_list,play_live_vedio,
    com_c_g_person_url,com_c_g_person_file,com_c_g_person_image,com_c_g_person_album,
    com_c_g_company_url,com_c_g_company_person,com_c_g_company_file,com_c_g_company_image,com_c_g_company_album,
    com_c_g_album_image,

}

//安装以上多个组件
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])//全局注册
})




