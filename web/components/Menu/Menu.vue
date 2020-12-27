<template>
    <div class="menu">
        <div class="Svg__content">
            <svg-icon :iconClass="className"/>
        </div>
        <transition>
            <div class="mask" v-if="false"></div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    computed: {
        className () {
            return 'menu--open'
        }
    },
    data () {
        return {
            isCollapse: true
        }
    },

}
</script>
<style lang="scss" scoped>
    .menu{
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        z-index: 1;
        cursor: pointer;
        .Svg{
            &__content{
                width: 100%;
                height: 100%;
                >>> .svg{
                    width: 100%;
                    height: 100%;
                }
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