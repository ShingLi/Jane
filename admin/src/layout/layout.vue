<template>
    <div class="layout">
        <div class="sidebar"></div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    name: 'Layout'
}
</script>
<style lang="scss" scoped>
    .layout{
        position: relative;
        width: 90vw;
        height: 90vh;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 5vh;
        background-color: #ccc;
        border-radius: 30px;
    }
</style>
