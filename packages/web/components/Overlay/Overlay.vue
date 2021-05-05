<template>
    <transition name="fadeIn">
        <div class="overlay">
            <slot />
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Overlay',
    }
</script>
<style lang="scss" scoped>
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0, 0, 0, .5);
        transition: all .5s ease-in-out;
    }

    .fadeIn{
        background-color: rgba(0, 0, 0, 0);
    }
</style>
