<template>
    <div class="about">
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
                <li class="circle"></li>
                <div class="skill__content">
                    hhehhehe
                </div>
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
        }).then(({ data }) => {
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
            userinfo: [
                {
                    iconclass: 'V',
                    description: '男',
                },
                {
                    iconclass: 'xingming',
                    description: '李大锤.字伯鸾.号凤雏',
                },
                {
                    iconclass: 'aihao',
                    description: '漂亮MM，LOL，钓鱼',
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
    mounted () {
        this.$nextTick(() => {
            this.init()
        })
    },
    destroyed () {
        this.unbindEvent(document.getElementById('avatar'), 'mouseenter', this.mouseenter)
        this.unbindEvent(document.getElementById('avatar'), 'mouseleave', this.mouseleave)
    },
    transition: 'side-about',
    methods: {
        init () {
            this.bindEvent(document.getElementById('avatar'), 'mouseenter', this.mouseenter)

            this.bindEvent(document.getElementById('avatar'), 'mouseleave', this.mouseleave)
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
    },
    head: {
        title: '关于',
        meta: [
            {
                hid: 'about__description',
                name: 'description',
                content: '李成的个人描述',
            },
            {
                hid: 'author',
                name: 'author',
                content: 'shingli',
            },
        ],
        script: [
            {
                src: '//at.alicdn.com/t/font_2212935_g9uascawao7.js',
                body: true,
            },
        ],
    },
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/about.scss';
</style>
