import vue from 'vue'
import loader from '~/components/Utils/loader'

const loadscript = function ({ app }, inject) {
    vue.prototype.$loadscript = loader
}

export default loadscript
