<template>
    <div class="about">
        <div class="about__content">
            s
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
    }
}
</script>
<style lang="scss" scoped>
    @import './assets/scss/about.scss';
</style>