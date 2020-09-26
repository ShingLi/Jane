<template>
    <div class="sidebar">
        <Avatar :src="avatar" class="custom--avatar"/>
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
            avatar: 'https://thirdwx.qlogo.cn/mmopen/sHGrggDoMxFfm6HEt7P6DRQ7AnxBJ7SgADdfhLib2V4z7iaGvNWytAZSMC9NCNZ94bbrsJiagKfdkjE8w3vQyMEicFeZSnP6K9JJ/132'
        }
    },
}
</script>
<style lang="scss" scoped>
    @import './scss/sidebar.scss';
</style>
