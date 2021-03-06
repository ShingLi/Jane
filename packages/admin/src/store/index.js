import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const context = require.context('./modules', false, /\.js$/)
const modules = context.keys().reduce((modules, filepath) => {
    const moduleName = filepath.replace(/\.\/(\w*)(\.js)$/, '$1')
    const moduleValue = context(filepath).default
    modules[moduleName] = moduleValue
    return modules
}, {})

export default new Vuex.Store({
    modules,
})
