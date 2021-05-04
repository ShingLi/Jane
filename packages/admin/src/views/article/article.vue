<template>
    <div class="article">
        <Tag />
        <div class="articlewrap">
            
        </div>
    </div>
</template>
<script>
import Tag from 'components/Tag/Tag'
export default {
    name: 'Article',
    components: {
        Tag
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/article.scss';
</style>
