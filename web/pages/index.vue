<template>
    <div class="index">
        首页
    </div>
</template>
<script>
export default {
    name: 'Index',
    data () {
        return {
            title: '首页'
        }
    },
    head () {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '李大锤博客的首页'
                }
            ]
        }
    },
    async asyncData ({ $axios }) {
        // try {
        //     const res = await $axios.post('/web/sign')
        //     console.log(res)
        // } catch (error) {
        //     console.log(error)
        // }
    },
    async fetch () {
        
    },
    async mounted () {
        try {
            const res = await this.$axios.post('/web/index')
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/index.scss';
</style>