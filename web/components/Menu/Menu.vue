<template>
    <div class="menu">
        <div class="Svg__content">
            
        </div>
        <transition>
            <div class="mask"></div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    data () {
        return {
            isCollapse: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .menu{
        .Svg{
            &__content{
                width: 50px;
                height: 50px;
            }
        }
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #98bf21;
        }
    }
</style>