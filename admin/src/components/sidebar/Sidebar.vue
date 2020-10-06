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
export default {
    name: 'Sidebar',
    components: {
        Avatar,
    },
    data () {
        return {
            userInfo: {
                name: '路过一片云',
                avatar: 'https://thirdwx.qlogo.cn/mmopen/sHGrggDoMxFfm6HEt7P6DRQ7AnxBJ7SgADdfhLib2V4z7iaGvNWytAZSMC9NCNZ94bbrsJiagKfdkjE8w3vQyMEicFeZSnP6K9JJ/132'
            },
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
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    @import './scss/sidebar.scss';
</style>
