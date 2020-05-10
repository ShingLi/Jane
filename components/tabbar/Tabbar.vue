<template>
    <ol class="tabbar">
        <li v-for="(v, i) of tabbarData" :key="i" @click="change(i)">
            <i class="icon"></i>
            <span>{{ v }}</span>
        </li>
    </ol>
</template>
<script>
export default {
    name: 'Tabbar',
    props: {
        value: {
            type: String | Number,
        }
    },
    data () {
        return {
            tabbarData: ['首页', '书影音', '广播', '小组', '我的']
        }
    },
    methods: {
        change (index) {

        }
    }
}
</script>
<style lang="scss">
    @import '~/assets/style/mixin.scss';
    @import './assets/tabbar.scss';
</style>
