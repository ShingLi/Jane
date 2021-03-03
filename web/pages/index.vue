<template>
    <div class="index">
        <div class="tips">
            <p>皖ICP备18000360号</p>
            <transition name="fade">
                <h4 v-if="!isCollapse" class="copy fast">当不能在拥有的时候，唯一能做的就是不让自己忘记~ 1011</h4>
            </transition>
        </div>
        <canvas class="canvas"></canvas>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Canvas from '~/components/Canvas/Canvas.js'
export default {
    name: 'Index',
    async fetch () {
        
    },
    async asyncData ({ $axios }) {
        const { data } = await $axios({
            url: '/web/index',
            method: 'post',
        })
        return {
            
        }
    },
    data () {
        return {
            title: '首页',
        }
    },
    computed: {
        ...mapState({
            isCollapse: state => state.menuState,
        }),
    },
    mounted () {
        Canvas()
        this.queue()
    },
    methods: {
        queue () {
            setInterval(() => {
                Canvas()
            }, 5000)
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
