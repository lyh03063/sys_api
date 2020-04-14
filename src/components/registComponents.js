

//本文件用于批量注册全局组件
import com_complete from '@/components/common/com_complete.vue'
import com_imagePreview from '@/components/common/com_imagePreview.vue'
import com_note_familiarity_select from '@/components/common/com_note_familiarity_select.vue'
import com_score_panel from '@/components/common/com_score_panel.vue'
const Components = {
    com_complete,com_imagePreview,com_note_familiarity_select,
    com_score_panel
}

//安装以上多个组件
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])//全局注册
})




