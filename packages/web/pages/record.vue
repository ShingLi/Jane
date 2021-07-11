<template>
    <div class="record">
        <div class="header line"></div>
        <div class="record__container">
            <div class="navbar">
                <p>{{ title }}</p>
            </div>
            <ul class="timeline" v-if="articleList && articleList.length">
                <li class="timeline-item" v-for="list of articleList" :key="list.year">
                    <h3 class="year">{{ list.year }}年</h3>
                    <ul>
                        <li class="timeline__item" v-for="item in list.lists" :key="item.id">
                            <div class="line"></div>
                            <div class="point"></div>
                            <div class="card">
                                <div class="content" @click="jump(item)">
                                    <div class="right">
                                        <h4>{{ item.title }}</h4>
                                        <p v-if="item.content">{{ item.content }}</p>
                                        <div class="feedback">
                                            <span v-if="item.likeNum">{{ item.likeNum }} love</span>
                                            <span v-if="item.likeNum">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                                            <span v-if="item.readNum">{{ item.readNum }} read</span>
                                        </div>
                                    </div>
                                    <img :src="item.picUrl" class="img" v-if="item.picUrl">
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul class="timeline" v-else :style="{ marginTop: 0 }">
                <div class="nodata">
                    <i class="icon--gongshi">
                        <svg-icon iconClass="gongshi" />
                    </i>
                    <p>~~ 暂 无 数 据 ~~</p>
                </div>
            </ul>
            <div class="daodil" v-if="loading">
                <div class="line"></div>
                <div class="text">到底了</div>
                <div class="line"></div>
            </div>
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
        <!-- 不使用子路由改成动态路由 -->
        <!-- <NuxtChild /> -->
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
        const data = await $axios.post('findArticle')
        
        let articleList

        if (data.totalCount - 0 > 0) {
            articleList = dealwithData(data?.articleList)
        }

        return {
            pageData: data,
            articleList: articleList ?? []
        }
        
    },
    data () {
        return {
            loading: false,
            title: '标题'
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

        jump (item) {
            // 不使用vuex vuex 数据存在内存中，刷新丢失，就算用vuex 持久化，如果直接通过链接进来，还是会丢失数据
            // this.$store.dispatch('record/saveArticle', item)

            this.$router.push({
                path: `/essays/${item._id}.html`
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
