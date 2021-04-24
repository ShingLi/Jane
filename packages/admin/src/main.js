import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import './permission.js'
import http from 'config/http'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)

Object.defineProperty(Vue.prototype, '$http', {
    value: http
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
