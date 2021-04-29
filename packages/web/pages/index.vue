<template>
    <div class="index">
        <div class="tips">
            <p><a href="//beian.miit.gov.cn" target="_blank">皖ICP备18000360号</a></p>
            <transition name="fade">
                <h4 v-if="!isCollapse" class="copy fast">遗憾吗？那个你曾忙完就想找她聊天的人，终于和你无话可说了。那一切好像开始了，又好像从没开始！始于陌生，归于陌生是你和她所有的故事</h4>
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
        // this.queue()
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
