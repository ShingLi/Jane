<template>
    <transition name="side">
        <div class="article">
        
        </div>
    </transition>
</template>
<script>
export default {
    name: 'essay',
    mounted () {
        console.log('mounted')
    }
}
</script>
<style lang="scss" scoped>
    .article{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3000px;
        background-color: #ddd;
        z-index: 5;
        transition: all .4s;
    }
</style>