<template>
    <div class="sidebar">
        <Avatar :src="avatar" class="custom--avatar"/>
        <ol class="menu">
            <li v-for="(n, i) of menu" :key="i">{{ n }}</li>
        </ol>
    </div>
</template>
<script>
import Avatar from './modules/avatar.jsx'
export default {
    name: 'Sidebar',
    components: {
        Avatar,
    },
    data () {
        return {
            avatar: 'https://thirdwx.qlogo.cn/mmopen/sHGrggDoMxFfm6HEt7P6DRQ7AnxBJ7SgADdfhLib2V4z7iaGvNWytAZSMC9NCNZ94bbrsJiagKfdkjE8w3vQyMEicFeZSnP6K9JJ/132',
            menu: ['首页', '设置', '登出']
        }
    },
    methods: {
        rotate () {
            console.log(1)
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/sidebar.scss';
</style>
