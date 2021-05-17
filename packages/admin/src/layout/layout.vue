<template>
    <div class="layout">
        <div class="layout__main">
            <div class="sidebar">
                <!-- <div class="radius"></div> -->
                <SideBar/>
            </div>
            <div class="content">
                <div class="navbar">
                    <div class="tools">
                        <i class="icon full--screen" @click="toggleScreen">
                            <svg-icon :iconName="!screen ? 'full--screen' : 'scale--screen'" />
                        </i>
                    </div>
                    <div class="userinfo">
                        <Avatar
                            class="avatar"
                            :src="require('@/assets/images/avatar.jpeg')"
                        />
                        <el-dropdown>
                            <div class="el-dropdown-link">
                                <p>一片云</p>
                                <i class="icon arrow--bottom">
                                    <svg-icon
                                        iconName="arrow--sj"
                                        class="svg"
                                    />
                                </i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    icon="el-icon-s-promotion"
                                    class="txt"
                                >
                                    <a href=""> 首页 </a>
                                </el-dropdown-item>
                                <el-dropdown-item
                                    icon="el-icon-switch-button"
                                    class="txt"
                                    @click.native="signout"
                                >
                                    退出
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <router-view class="router" />
            </div>
        </div>
    </div>
</template>
<script>
import Avatar from 'components/Avatar/Avatar'
import SideBar from 'components/SideBar/SideBar'

export default {
    name: 'Layout',
    components: {
        Avatar,
        SideBar
    },
    data () {
        return {
            screen: false
        }
    },
    mounted () {
        this.init()
    },

    methods: {
        init () {
            // 监听全屏事件
            document.documentElement.onfullscreenchange = () => {
                setTimeout(() => {
                    if (!document.fullscreenElement) this.screen = false
                }, 28)
            }
        },

        signout() {
            this.$store.dispatch('user/signout')
        },

        toggleScreen () {
            if (!document.fullscreenElement) {
                this.screen = true
                document.documentElement.requestFullscreen()
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                    this.screen = false
                }
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.layout {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    &__main {
        width: 90vw;
        max-width: 1250px;
        min-width: 800px;
        height: 85vh;
        overflow-y: hidden;
        overflow-x: auto;
        border-radius: 20px;
        display: flex;
        background: #0e8bff;
        box-shadow: 0 5px 40px #d2eaff;
        position: relative;
        transition: all 0.3s ease-in-out;
        @media only screen and (min-width : 1500px) {
            height: 70vh;
            max-width: 1300px;
        }
        @media only screen and (max-width : 1366px) {
            width: 1100px;
        }
    }
    .sidebar {
        position: relative;
        width: 230px;
        height: 100%;
        @media only screen and (max-width : 1366px) {
            width: 200px;
        }
        .radius {
            position: absolute;
            width: 50px;
            height: 50px;
            bottom: 0px;
            right: 0px;
            background-color: #fff;
            &::after {
                content: '';
                display: block;
                width: 50px;
                height: 50px;
                border-radius: 0 0 17px 0;
                background-color: #0e8bff;
            }
        }
    }
    .content {
        flex: 1;
        background-color: #fff;
        border-radius: 18px;
        overflow: hidden;
        border-left: none;
        display: flex;
        flex-direction: column;
        .router {
            padding: 30px;
            overflow-y: auto;
            padding-top: 35px;
            flex: 1;
        }
        .navbar {
            position: relative;
            width: 100%;
            height: 60px;
            flex: 0 0 59px;
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            align-items: center;
            border-bottom: 1px dotted #48b4f1;
            .userinfo {
                display: flex;
                align-items: center;
                height: 100%;
                padding-left: 15px;
                border-left: 1px solid #ebebeb;
                cursor: pointer;
                .el-dropdown-link {
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                    > p {
                        font-family: Jane;
                        font-size: 15px;
                        &:hover {
                            color: #98bf21;
                        }
                    }
                    .arrow--bottom {
                        width: 10px;
                        height: 10px;
                        margin-left: 5px;
                    }
                }
            }
            .tools {
                margin-right: 15px;
                .full--screen {
                    width: 25px;
                    height: 25px;
                    &:hover {
                        color: #98bf21;
                    }
                }
            }
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid #bbb;
                padding: 1px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
        }
    }
}

.txt {
    text-transform: capitalize;
}
</style>
