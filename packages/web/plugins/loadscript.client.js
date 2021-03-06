import vue from 'vue'
import loader from '~~/components/utils/loader'

const loadscript = function ({ app }, inject) {
    vue.prototype.$loadscript = loader
}

export default loadscript
