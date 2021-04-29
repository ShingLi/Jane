<template>
    <div class="record">
        <div class="header line"></div>
        <div class="record__container">
            <div class="navbar">
                <p>QQ音乐</p>
            </div>
            <ul class="timeline">
                <li class="timeline-item" v-for="list of articleList" :key="list.year">
                    <h3 class="year">{{ list.year }}年</h3>
                    <ul>
                        <li class="timeline__item" v-for="item in list.lists" :key="item.id">
                            <div class="line"></div>
                            <div class="point"></div>
                            <div class="card">
                                <div class="content" @click="jump(1)">
                                    <div class="right">
                                        <h4>{{ item.title }}</h4>
                                        <p>{{ item.desc }}</p>
                                        <div class="feedback">
                                            <span>{{ item.likes }} love</span>
                                            <span>&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                            <span>{{ item.read }} read</span>
                                        </div>
                                    </div>
                                    <img :src="item.imgSrc" class="img">
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

const dealwithData = (originalData) => {
    const arr = [], obj = {}
    if (originalData && Array.isArray(originalData)) {
        for (let item of originalData) {
            if (obj[item.year] == undefined) {
                obj[item.year] = []
            }
        
            Object.keys(obj).filter((key) => {
                if (key == item.year) {
                    obj[key].push(item)
                }
            })
        }

        // 将数据对象转为可循环的数据
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                arr.push({
                    year: k,
                    lists: obj[k]
                })
            }
        }
    }
    /*  使用number作为对象的key会自动排序苏，所以需要倒叙处理下
    -------------------------- */
    return arr
}

export default {
    name: 'Record',
    async asyncData ({ $axios }) {
        const data = await $axios.post('/web/record')
        const articleList = dealwithData(data.articleList)

        return {
            pageData: data,
            articleList
        }
        
    },
    data () {
        return {
            scrollTop: 0,
            
        }
    },
    watch: {
        $route (to, from) {
            if (to.name == 'record') {
                // 反正滚动穿透
                document.body.style.cssText = ''
                document.documentElement.style.cssText = ''
                // 回复之前预览的位置
                // window.pageYOffset = this.scrollTop
            } else if (true) {
                
            }
        }
    },
    async mounted () {
        this.initNest()
        this.bindEvent('scroll', this.scroll)
    },
    beforeDestroy () {
        
        if (this.nest) this.nest.destroy()

        this.unbindEvent('scroll', this.scroll)
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

        bindEvent (event, f) {
            window.addEventListener(event, f, {
                passive: true
            })
        },

        unbindEvent (event, f) {
            window.removeEventListener(event, f)
        },

        scroll (e) {
            if (this.$route.name == 'record') {
                this.scrollTop = window.scrollY
                this.$store.commit('record/setScrollTop', window.pageYOffset)
            }
        },

        jump () {
            this.$router.push({
                path: '/record/111111.html'
            })
        },
        
        dealwithData,
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
