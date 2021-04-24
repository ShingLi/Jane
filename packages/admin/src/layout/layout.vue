<template>
    <div class="layout">
        <div class="layout__main">
            <!-- <Sidebar /> -->
            <div class="layout__content">
                <router-view class="router"/>
            </div>
        </div>
    </div>
</template>
<script>
// import Sidebar from 'components/sidebar/Sidebar'

export default {
    name: 'Layout',
    components: {
        // Sidebar
    }
}
</script>
<style lang="scss" scoped>
    .layout{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100vw;
        height: 100vh;
        &__main{
            width: 90vw;
            max-width: 1250px;
            height: 90vh;
            overflow: hidden;
            border-radius: 30px;
            display: flex;
            background-color: #0e8bff;
            box-shadow: 0 4px 6px #d2d2d2, 0 -2px 10px #d2d2d2;
            background-image: linear-gradient(45deg,#0ea6ff,#13adff);
        }
        &__content{
            flex:1;
            background-color: #fff;
            border-radius: 30px;
            overflow: hidden;
            .router{
                padding: 15px;
                overflow-y: auto;
            }
        }
    }
</style>
