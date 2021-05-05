import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import SvgIcon from 'components/SvgIcon/SvgIcon'
import 'mavon-editor/dist/css/index.css'

import './svg'
import './element-ui'

Vue.use(mavonEditor)
Vue.component('SvgIcon', SvgIcon)

export { default as http } from './axios'
