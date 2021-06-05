<template>
    <div class="comment">
        <Tag :text="text" />
        <div class="main">
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'Comment',
    data () {
        return {
            text: '若是气质藏于身，岁月从不败美人'
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/comment.scss';
</style>
