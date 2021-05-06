import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import SvgIcon from 'components/SvgIcon/SvgIcon'
import LcSwitch from 'components/Switch/Switch'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import 'mavon-editor/dist/css/index.css'

import './svg'
import './element-ui'

Vue.use(mavonEditor)
Vue.component('SvgIcon', SvgIcon)
Vue.component('LcSwitch', LcSwitch)
Vue.component(CollapseTransition.name, CollapseTransition)

export { default as http } from './axios'
