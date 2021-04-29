import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission.js'

import { http } from 'plugins'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$http', {
    value: http
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
