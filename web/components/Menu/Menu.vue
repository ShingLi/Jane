<template>
    <div class="menu">
        <div class="Svg__content">
            <svg-icon :icon-class="className" @click.native="isCollapse = !isCollapse"/>
        </div>
        <transition name="fadeIndown">
            <div v-show="isCollapse" class="mask">
                <div class="mask__container">
                    <ul class="navbar">
                        <li v-for="(item, index) of navbar" :key="index">
                            <!-- <span :class="{ active: $route.name == item.routername }">{{ item.navtitle }}</span> -->
                            <nuxt-link :to="item.path" @click.native="navigator">{{ item.navtitle }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>

import { mapMutations } from 'vuex'
export default {
    name: 'Menu',
    data () {
        return {
            isCollapse: false,
            navbar: [
                {
                    navtitle: '首页',
                    path: '/index.html',
                },
                {
                    navtitle: '关于',
                    path: '/about.html',
                },
            ],
        }
    },
    computed: {
        className () {
            let icon
            if (!this.isCollapse) {
                icon = 'menu--open'
            } else icon = 'menu--close'
            return icon
        },
    },
    methods: {
        navigator () {
            this.isCollapse = false
            this.menuClick(true)
        },
        ...mapMutations({
            menuClick: 'changeClick'
        })
    }
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
                background: rgba(255, 255, 255, 0.4);
                // padding: 60px 0;
                padding-top: calc(25vh /2);
                
                .navbar{
                    position: relative;
                    width: 100%;
                    display: flex;
                    height: 44px;
                    align-items: center;
                    padding-left: 13vw;
                    transform: translate3d(0, -100%, 0);
                    line-height: 23px;
                    li{
                        text-align: center;
                        cursor: pointer;
                        span, a{
                            font-size: 16px;
                            color: #000;
                            &.active{
                                color: #1a73e8;
                            }
                        }
                        .nuxt-link-active{
                            color: #1a73e8;
                        }
                        margin-right: 30px;
                    }

                }
            }
            // backdrop-filter: blur(1px);
        }
    }
</style>
