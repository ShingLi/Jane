<template>
    <div class="about" :class="{ refresh: !isAboutClick }">
        <div class="about__content">
            <div class="userinfo">
                <img
                    v-if="avatar"
                    id="avatar"
                    :src="avatar"
                    class="avatar"
                >
                <span
                    v-else
                    id="avatar"
                    class="avatar"></span>
                <p class="username">{{ uname }}</p>
                <ol>
                    <li
                        v-for="(item, index) of userinfo"
                        :key="index"
                        class="userinfo__item">
                        <svg-icon :icon-class="item.iconclass"/>
                        <span>{{ item.description }}</span>
                    </li>
                </ol>
            </div>
            <ul class="skill">
                <li class="circle">
                    <svg-icon icon-class="molecule"/>
                </li>
                <li class="skill__content">
                    <h4 class="title">人生若只如初见!&nbsp;&nbsp;</h4>
                    <!-- <p>我什么时候才能达到人生的第二重境界? 衣带渐宽终不悔，唯一一人饮憔悴</p> -->
                    <div class="progress">
                        <code>Html</code>
                        <el-progress :percentage="70"></el-progress>
                        <code>Css</code>
                        <el-progress :percentage="70" color="#8e71c7"></el-progress>
                        <code>Jquery</code>
                        <el-progress :percentage="60" color="#909399"></el-progress>
                        <code>JavaScript</code>
                        <el-progress :percentage="61" color="#F56C6C"></el-progress>
                        <code>Mini program</code>
                        <el-progress :percentage="60" color="#2db7f5"></el-progress>
                        <code>Vue</code>
                        <el-progress :percentage="70" color="#F16F5C"></el-progress>
                        <code>Nuxt</code>
                        <el-progress :percentage="50" color="#19be6b"></el-progress>
                        <code>React</code>
                        <el-progress :percentage="30" color="#E15CED"></el-progress>
                        <code>Express</code>
                        <el-progress :percentage="10" color="#F56C6C"></el-progress>
                        <code>MongoDb</code>
                        <el-progress :percentage="10" color="#000"></el-progress>
                    </div>
                    <div class="descript">
                        <!-- <p>关于我？其实也没什么好说的，四流前端开发,下九流设计师</p> -->
                        <br>
                        <p>生活不止眼前的代码还有买房和娶媳妇~~~~~~ </p>
                        <div class="timeline">
                            今天是<span class="year">{{ year }}</span>年<span class="month">{{ month }}</span>月<span class="day">{{ day }}</span>日
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About',
    asyncData ({ $axios, error }) {
        return $axios({
            method: 'post',
            url: '/web/about',
        }).then((data) => {
            const { responseCode, responseMsg, responseData } = data
            if (responseCode == '0000') {
                return {
                    responseData,
                    avatar: responseData.avatar,
                    uname: responseData.uname,
                }
            } else {
                // 错误
            }
        }).catch(e => {
            console.log(e)
        })
    },
    data () {
        return {
            year: new Date().getFullYear(),
            month: (new Date().getMonth() + 1 - 0) < 10 ?  '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
            calcSty: '#000',
            userinfo: [
                {
                    iconclass: 'v',
                    description: '男',
                },
                {
                    iconclass: 'xingming',
                    description: '李大锤.字伯鸾.号凤雏',
                },
                {
                    iconclass: 'aihao',
                    description: '某人，LOL，钓鱼',
                },
                {
                    iconclass: 'zhifeiji',
                    description: '安徽芜湖',
                },
                {
                    iconclass: 'weixin1',
                    description: 'qin0251313',
                },
                {
                    iconclass: 'youxiang2',
                    description: '74573545@qq.com',
                },
            ],
        }
    },
    computed: {
        isAboutClick () {
            return this.$store.state.clicked
        }
    },
    created () {
        if (process.client) {
            this.$nextTick(() => {
                this.init()
                /* licheng 刷新手动开启加载动画
                -------------------------- */
                if (!this.isAboutClick) {
                    this.$nuxt.$loading.start()
                    this.$nuxt.$loading.finish()
                }
            })
        }
    },
    mounted () {
        
        window.addEventListener('beforeunload', e => {
            
        })
    },
    destroyed () {
        this.unbindEvent(document.getElementById('avatar'), 'mouseenter', this.mouseenter)
        this.unbindEvent(document.getElementById('avatar'), 'mouseleave', this.mouseleave)
    },
    methods: {
        init () {
            this.bindEvent(document.getElementById('avatar'), 'mouseenter', this.mouseenter)

            this.bindEvent(document.getElementById('avatar'), 'mouseleave', this.mouseleave)

            this.initColor()
        },
        mouseenter (e) {
            const style = {
                cursor: 'pointer',
                transform: `rotate(1000turn)`,
            }
            console.log(e.target)
            e.target.style.cursor = 'pointer'
            e.target.style.transform = `rotate(1000turn)`
        },
        mouseleave (e) {
            e.target.style.transform = ''
        },
        bindEvent (dom, event, callback) {
            dom.addEventListener(event, callback) 
        },
        unbindEvent (dom, event, callback) {
            dom.removeEventListener(event, callback)
        },
        initColor () {
            const colorlist = ['#8e71c7', '#909399', '#F56C6C', '#2db7f5', '#98bf21']
            let index = 0
            setInterval(() => {
                if (index == colorlist.length) index = 0
                index++
                this.calcSty = colorlist[index]
            }, 3000)
        },
    },
    head () {
        return {
            title: '关于',
            meta: [
                {
                    hid: 'about__description',
                    name: 'description',
                    content: '关于李成，帅气的李大锤',
                },
                {
                    hid: 'author',
                    name: 'author',
                    content: 'shingli',
                },
            ],
            bodyAttrs: {
                class: 'about'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/about.scss';
</style>
