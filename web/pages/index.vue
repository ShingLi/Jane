<template>
    <div class="index">
        <p>hahhahhahah</p>
        <div>

            
        </div>
    </div>
</template>
<script>
import 'assets/svg/xingming.svg'
export default {
    name: 'Index',
    async fetch () {
        
    },
    async asyncData ({ $axios }) {
        // try {
        //     const res = await $axios.post('/web/sign')
        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }
    },
    data () {
        return {
            title: '首页',
        }
    },
    async mounted () {
        try {
            const res = await this.$axios.post('/web/index')
        } catch (error) {
            console.log(error)
        }
    },
    head () {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '李大锤博客的首页',
                },
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/index.scss';
</style>
