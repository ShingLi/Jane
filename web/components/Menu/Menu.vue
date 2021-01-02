<template>
    <div class="menu">
        <div class="Svg__content">
            <svg-icon :iconClass="className" @click.native="isCollapse = !isCollapse"/>
        </div>
        <transition name="fadeIndown">
            <div class="mask" v-show="isCollapse">
                <div class="mask__container">
                    
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    computed: {
        className () {
            let icon
            if (!this.isCollapse) {
                icon = 'menu--open'
            } else icon = 'menu--close'
            return icon
        }
    },
    data () {
        return {
            isCollapse: false
        }
    },
}
</script>
<style lang="scss" scoped>
    .menu{
        position: fixed;
        top: 20px;
        right: 20px;
        width: 30px;
        height: 30px;
        z-index: 2;
        cursor: pointer;
        .Svg{
            &__content{
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 3;
                
                ::v-deep .icon{
                    width: 30px;
                    height:30px;
                }
            }
        }
        .mask{
            position: fixed;
            top: 0;
            height: 100%;
            left: 0;
            width: 100%;
            &__container{
                position: relative;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
            }
            // backdrop-filter: blur(1px);
        }
    }
</style>