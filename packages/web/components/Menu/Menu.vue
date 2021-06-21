<template>
    <div class="menu">
        <div class="fixed--top">
            <transition name="fade">
                <div class="left sfast" v-if="wide">
                    <div class="back" @click="$router.push({ path: '/record.html' })">
                        <svg-icon iconClass="back2" />
                    </div>
                </div>
            </transition>
            <div class="process"></div>
            <div class="right">
                <svg-icon :icon-class="className" @click.native.stop="isCollapse = !isCollapse"/>
            </div>
            <transition name="fade">
                <p class="line sfast" v-if="wide">
                    <span class="liner" :style="calcWidth"></span>
                </p>
            </transition>
        </div>
        
        <transition name="fadeIndown">
            <div v-show="isCollapse" class="mask">
                <div class="mask__container">
                    <ul class="navbar">
                        <li v-for="(item, index) of navbar" :key="index">
                            <!-- <span :class="{ active: $route.name == item.routername }">{{ item.navtitle }}</span> -->
                            <template v-if="item.path != 'external'">
                                <nuxt-link :to="item.path" @click.native="navigator">{{ item.navtitle }}</nuxt-link>
                            </template>
                            <template v-else>
                                <a :href="item.href"  target="_blank">{{ item.navtitle }}</a>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
                            </template>
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
    props: {
        scrollTop: {
            type: Number,
            default: 0
        },
        scrollHeight: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            isCollapse: false,
            navbar: [
                {
                    navtitle: '首页',
                    path: '/index.html',
                },
                {
                    navtitle: '记录',
                    path: '/record.html',
                },
                {
                    navtitle: '关于',
                    path: '/about.html',
                },
                {
                    navtitle: 'GitHub',
                    path: 'external',
                    href: 'https://github.com/shingli'
                }
            ],
            wide: false
        }
    },
    computed: {
        className () {
            let icon
            if (!this.isCollapse) {
                icon = 'menu--open'
            } else icon = 'menu--close'
            
            this.$store.commit('changeMenuState', this.isCollapse)

            return icon
        },
        calcWidth () {
            let width = 0, canscrollTop = this.scrollHeight - document.documentElement.clientHeight
            if (this.scrollTop) {
                width = (this.scrollTop / canscrollTop) * 100
            }
            return {
                width: `${width}%`,
            }
        }
    },
    watch: {
        $route (val) {
            this.validate()
        }
    },
    mounted () {
        this.validate()
    },
    methods: {
        navigator () {
            this.isCollapse = false
            this.menuClick(true)
        },
        validate () {
            if (this.$route.name == 'essays-id') {
                setTimeout(() => {
                    this.wide = true
                },2000)
            } else {
                this.wide = false
            }
        },
        ...mapMutations({
            menuClick: 'changeClick'
        }),
    }
}
</script>
<style lang="scss" scoped>
    .menu{
        position: fixed;
        height: 55px;
        left: 0;
        width: 100%;
        z-index: 3;
        border-bottom: 1px solid transparent;
        &.border-1px{
            border-bottom-color: #f0f0f0;
        }
        .fixed--top{
            top: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            padding: 0 22px;
            // backdrop-filter: blur(0px);
            .line{
                height: 1px;
                position: absolute;
                bottom: 0;
                width: 100%;
                background-color: #f0f0f0;
                .liner{
                    position: relative;
                    display: block;
                    width: 0%;
                    height: 2px;
                    border-radius: 4px;
                    top: -0.5px;
                    background-color: #1a73e8;
                    transition: all .4s linear;
                }
            }
            div{
                height: 100%;
                display: flex;
                align-items: center;
                &.process{
                    flex: 1;
                }
                &.right,&.left{
                    cursor: pointer;
                }
                &.right{
                    width: 30px;
                    position: relative;
                    ::v-deep{
                        .svg{
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            z-index: 4;
                        }
                    }
                }
                ::v-deep .svg{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .mask{
            position: fixed;
            top: 0;
            height: 100%;
            left: 0;
            width: 100%;
            z-index: 3;
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
                    .outbound{
                        color: #aaa;
                    }

                }
            }
            // backdrop-filter: blur(1px);
        }
    }
</style>
