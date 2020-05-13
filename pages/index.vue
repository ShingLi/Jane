<template>
    <div class="page_container">
        <logo class="logo"/>
        <Tabbar v-model="tabbar.active"/>
    </div>
</template>

<script>
import Logo from "~/components/Logo.vue"
import Tabbar from '~/components/Tabbar/Tabbar.vue'
export default {
    components: {
        Logo,
        Tabbar
    },
    data () {
        return {
            title: '首页',
            tabbar: {
                active: 0,
                tabbarData: []
            }
        }
    },
    asyncData () {

    },
    head () {
        return {
            title: this.title
        }
    }
}
</script>
<style lang="scss" scoped>
    .page_container{
        padding-top: 10px;
        .logo{
            display: block;
            margin: auto;
        }
    }
</style>
