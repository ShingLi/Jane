<template>
    <div class="sidebar">
        <div id="avatar"
        >
            <Avatar :src="userInfo.avatar" class="custom--avatar avatar"/>
            <p class="username">{{ userInfo.name }}</p>
        </div>
        <ol class="menu">
            <li v-for="(v, i) of menuList"
                :key="i"
            >{{ v.title }}</li>
        </ol>
    </div>
</template>
<script>
import Avatar from './modules/avatar'
import { mapState } from 'vuex'
export default {
    name: 'Sidebar',
    components: {
        Avatar,
    },
    data () {
        return {
            menuList: [
                {
                    title: '首页'
                },
                {
                    title: '设置'
                },
                {
                    title: '退出'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: {
                username: state.user.username
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    @import './scss/sidebar.scss';
</style>
