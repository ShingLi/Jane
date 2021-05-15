<template>
    <div class="sidebar">
        <div id="avatar">
            <div class="IMGWRAP">
                <div class="moon">
                    <Avatar src="" class="custom--avatar avatar"/>
                </div>
            </div>
            <p class="username">{{ userInfo.uname }}</p>
        </div>
        <ol class="menu">
            <li v-for="(v, i) of menuList"
                :key="i"
                :class="{ active: $route.path == v.path }"
                @mouseenter="mousetoggle"
                @mouseleave="mousetoggle"
                @click="gopage(v)"
            >{{ v.title }}</li>
        </ol>
    </div>
</template>
<script>

import Avatar from 'components/Avatar/Avatar'

import { mapState } from 'vuex'

export default {
    name: 'SideBar',
    components: {
        Avatar,
    },
    data () {
        return {
            menuList: [
                {
                    title: '首页',
                    path: '/index'
                },
                {
                    title: '文章',
                    path: '/article'
                },
                {
                    title: '评论',
                    path: ''
                },
                {
                    title: 'web',
                    path: ''
                },
                {
                    title: '设置',
                    path: '/setting'
                },
                {
                    title: '退出',
                    path: '/exit'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state?.user?.userInfo ?? {}
        })
    },
    methods: {
        mousetoggle ($event) {
            setTimeout(() => {
                $event.target.classList.toggle('hover')
            }, 100)
        },

        gopage (item) {
            if (item.path == '/exit') {
                this.$store.dispatch('user/signout')
                return
            }
            this.$router.push({
                path: item.path
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .sidebar{
        height: 100%;
        width: 240px;
        padding: 30px 0 16px 16px;
        display: flex;
        flex-direction: column;
        overflow: auto;
        .IMGWRAP{
            margin: auto;
            padding-right: 16px;
            width: 150px;
            height: 150px;
            position: relative;
            // left: -20px;
            .moon{
                border-radius: 50%;
                border: 1px solid #fff;
            }
        }
        .avatar{
            &:hover{
                transition-property: transform;
                transition-duration: 60s;
                transform: rotate(1000turn);
                transition-timing-function: cubic-bezier(.39,.01,1,.59);
            }
        }
        .username{
            font-size: 14px;
            color: #fff;
            text-align: center;
            margin-top:14px;
            cursor: pointer;
        }
        // 菜单
        .menu{
            display: flex;
            margin-top: 20px;
            flex-direction: column;
            flex: 1;
            li{
                flex: 1;
                color: #fff;
                font-size: 15px;
                padding: 0 0 0 20px;
                border-radius: 20px 0 0 20px;
                margin-bottom: 15px;
                cursor: pointer;
                width: 100%;
                transition: all .3s ease-in-out;
                flex: 0 0 35px;
                height: 35px;
                display: flex;
                align-items: center;
                &.hover{
                    color: #409EFF;
                    background-color: #fff;
                    width: 50%;
                    border-radius: 20px;
                }
                &.active{
                    color: #409EFF;
                    background-color: #fff;
                    box-shadow: 0 1px 0 #e6e6e6;
                    width: 100%;
                    border-radius: 20px 0 0 20px;
                }
                &:last-child{
                    margin-bottom: 0 !important;
                }
            }
        }
    }

    @media only screen and (max-width: 1366px) {
        .IMGWRAP{
            width: 130px !important;
            height: 130px !important;
        }
        .menu{
            li{
                margin-bottom: 10px !important;
                font-size: 14px !important;
            }
        }
    }
</style>
