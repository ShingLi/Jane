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
                        <svg-icon :icon-class="item.iconclass" :class="{ heartbeat : item.iconclass == 'zhifeiji' }"/>
                        <span v-html="item.description"></span>
                    </li>
                </ol>
            </div>
            <ul class="skill">
                <li class="circle">
                    <svg-icon icon-class="molecule"/>
                </li>
                <li class="skill__content">
                    <h4 class="title">!&nbsp;&nbsp;</h4>
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
                        <code>Mini Program</code>
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
                        <p>一个人走过无人问津的日子，方才觉得，生活不止眼前的代码还有远方~~~~~~ </p>
                        <div class="timeline">
                            今天是<span class="year">{{ year }}</span>年<span class="month">{{ month }}</span>月<span class="day">{{ day }}</span>日 ___
                            <span style="display: inline-block; width: 90px; text-align:left">{{ timerString }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 定位不准没意义 -->
        <!-- <Overlay>
            <div id="container"></div>
        </Overlay> -->
    </div>
</template>
<script>
import host from 'config/host'

export default {
    name: 'About',
    asyncData ({ $axios, error }) {
        return $axios({
            method: 'post',
            url: '/web/about',
        }).then((data) => {
            console.log(data)
            return {
                avatar: data?.avatar ?? '',
                uname: data?.uname ?? '一片云'
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
            timerString: new Date().toLocaleTimeString(),
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
                    description: '安徽芜湖 ⇄ <span style="color: red" id="workspace">江苏南京</span>',
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
            visible: false,
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
        this.$nextTick(() => {
            this.bindEvent(document.getElementById('workspace'), 'click', () => {
                this.visible = true
            })
        })
        // this.setAMAP()
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
            this.calcTime()
        },

        setAMAP () {
            this.map = new AMap.Map('container', {
                resizeEnable: true,
            })

            this.map.plugin('AMap.Geolocation', () => {
                const geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: false,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                })
                
                this.map.addControl(geolocation)
                geolocation.getCurrentPosition()
            })
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

        calcTime () {
            setInterval(() => {
                this.timerString = new Date().toLocaleTimeString()
            }, 1000)
        }
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
            },
            script: [
                {
                    src: host.amap,
                    pbody: true
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/about.scss';
</style>
