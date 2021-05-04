import Vue from 'vue'
import { 
    Progress,
    Timeline,
    TimelineItem,
    Card,
    Button,
    Dialog
} from 'element-ui'

export default () => {
    Vue.use(Progress).use(Timeline).use(TimelineItem).use(Card).use(Button).use(Dialog)
}
