import loader from '~~/components/utils/loader'
import vue from 'vue'

const loadscript = function ({ app }, inject) {
    vue.prototype.$loadscript = loader
}

export default loadscript