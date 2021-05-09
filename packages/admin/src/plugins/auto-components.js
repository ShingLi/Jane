import Vue from 'vue'

const context = require.context('../components/', true, /\*?\.(vue$ || jsx$)/)

context.keys().forEach(item => {
    Vue.component(context(item)?.default?.name, context(item)?.default)
})
