<template>
    <div class="index">
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
        const { data } = await $axios({
            url: '/web/index',
            method: 'post'
        })
        return {
            
        }
    },
    data () {
        return {
            title: '首页',
        }
    },
    async mounted () {
        
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
