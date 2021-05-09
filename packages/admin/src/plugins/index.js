import Vue from 'vue'
import mavonEditor from 'mavon-editor'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import 'mavon-editor/dist/css/index.css'

import './svg'
import './element-ui'
import './auto-components'

Vue.use(mavonEditor)

Vue.component(CollapseTransition.name, CollapseTransition)

export { default as http } from './axios'
