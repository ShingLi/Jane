<template>
    <div class="record">
        <div class="header line"></div>
        <div class="record__container">
            <div class="navbar">
                <p>QQ音乐</p>
            </div>
            <ul class="timeline">
                <li class="timeline-item" v-for="n in 3">
                    <h3 class="year">2021年</h3>
                    <ul>
                        <li class="timeline__item" v-for="n in 3">
                            <div class="line"></div>
                            <div class="point"></div>
                            <div class="card">
                                <div class="content" @click="jump(1)">
                                    <div class="right">
                                        <h4>CSS样ehddddddddddddddhah哈哈哈哈哈式</h4>
                                        <p>这是描述性的文字哦哦哦哦哦哦哦哦hahhahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哦哦哦哦</p>
                                        <div class="feedback">
                                            <span>23 love</span>
                                            <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                            <span>54 read</span>
                                        </div>
                                    </div>
                                    <img src="/assets/images/1.jpeg" class="img">
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 背景区域 -->
        <div class="nest" ref="nest">
            <div class="garden">
                <div class="garden__main"></div>
                <!-- <img src="./assets/images/record/context.svg"> -->
            </div>
            <div class="timeaxes">
                <div class="axescard">

                </div>
            </div>
        </div>
        <!-- 文章详情 -->
        <NuxtChild />
    </div>
</template>
<script>
export default {
    name: 'Record',
    async asyncData ({ $axios }) {

        return {
               
        }
    },
    data () {
        return {

        }
    },
    async mounted () {
        this.initNest()
    },
    beforeDestroy () {
        if (this.nest) this.nest.destroy()
    },
    methods: {
        initNest () {
            let CanvasNest

            if (!window.CanvasNest) {
                CanvasNest = require('canvas-nest.js')
            }

            const config = {
                color: '190,34,135',
                pointColor: '126,19,49',
                count: 120,
                opacity: 1,
            }
            this.$nextTick(() => {
                this.nest = new CanvasNest(this.$refs.nest, config)
            })
        },
        jump () {
            this.$router.push({
                path: '/record/111111.html'
            })
        }
    },
    head () {
        return {
            title: '文章',
            bodyAttrs: {
                class: 'record'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/record.scss';
</style>
