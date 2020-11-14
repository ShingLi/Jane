<template>
    <div class="about">
        <div class="about__content">
            <div class="userinfo">
                <img :src="avatar" class="avatar" id="avatar" v-if="avatar">
                <span class="avatar" id="avatar" v-else></span>
                <p class="username">{{ uname }}</p>
            </div>
            <ul class="skill">
                <li class="circle"></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'About',
    head: {
        title: '关于',
        meta: [
            {
                hid: 'about__description',
                name: 'description',
                content: '李成的个人描述'
            },
            {
                hid: 'author',
                name: 'author',
                content: 'shingli'
            }
        ]
    },
    data () {
        return {
            avatar: '',
            uname: '路过一片云'
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.init()
        })
    },
    destroyed () {
        this.unbindEvent()
    },
    methods: {
        init () {
            this.bindEvent(document.getElementById('avatar'), 'mouseenter', (e) => {
                const style = {
                    cursor: 'pointer',
                    transform: `rotate(1000turn)`
                }
                console.log(e.target)
                e.target.style.cursor = 'pointer'
                e.target.style.transform = `rotate(1000turn)`
            })
        },
        bindEvent (dom, event, callback) {
            dom.addEventListener(event, callback) 
        },
        unbindEvent () {}
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/about.scss';
</style>