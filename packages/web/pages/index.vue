<template>
    <div class="index">
        <div class="tips">
            <p>
                <a :href="ICPWebsit" target="_blank">{{ ICPNumber }}</a>
            </p>
            <transition name="fade">
                <h4 v-if="!isCollapse" class="copy fast">{{ IndexDesc }}</h4>
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
    async asyncData ({ $axios }) {
        const  responseData  = await $axios.post('index')

        const presetData = {
            ICPNumber: '皖ICP备18000360号',
            IndexDesc: '皆是风景，幸会！',
            ICPWebsit: '//beian.miit.gov.cn',
        }

        return {
            ...presetData,
            IndexDesc: responseData?.IndexDesc ?? '皆是风景，幸会！'
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
