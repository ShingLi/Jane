<template>
    <div class="record">
        <div class="header line">
            
        </div>
        <div class="content">
            <el-timeline>
                <el-timeline-item :timestamp="item.date" placement="top" color="hsl" type="danger" v-for="(item, index) of article" :key="item.id">
                    <div class="card">
                        <el-card>
                            <div class="info">
                                <img :src="item.imgsrc">
                                <div class="desc">
                                    <h4>{{ item.subtitle }}</h4>
                                    <p>阅读</p>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </div>
        <div class="nest" ref="nest">

        </div>
    </div>
</template>
<script>
export default {
    name: 'Record',
    asyncData () {
        return {
            article: [
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                },
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                },
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                },
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                },
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                },
                {
                    date: '2018/4/3',
                    imgsrc: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    subtitle: '副标题',
                    desc: '简述',
                    id: '12222'
                }
            ]
        }
    },
    data () {
        return {

        }
    },
    mounted () {
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
                color: '255,0,0',
                count: 88,
            }
            this.$nextTick(() => {
                this.nest = new CanvasNest(this.$refs.nest, config)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/record.scss';
</style>
