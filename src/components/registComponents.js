

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
const Components = {
    com_complete,com_imagePreview,com_note_familiarity_select,com_score_panel,com_item_complete_search
}

//安装以上多个组件
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])//全局注册
})




