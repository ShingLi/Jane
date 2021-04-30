<template>
    <div class="sidebar">
        <div id="avatar"
        >
            <Avatar :src="userInfo.avatar" class="custom--avatar avatar"/>
            <p class="username">{{ userInfo.name }}</p>
        </div>
        <ol class="menu">
            <li v-for="(v, i) of menuList"
                :key="i"
            >{{ v.title }}</li>
        </ol>
    </div>
</template>
<script>
import Avatar from 'components/Avatar/Avatar.jsx'
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
                    title: '首页'
                },
                {
                    title: '设置'
                },
                {
                    title: '退出'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            userInfo: {
                username: state => state.user.username
            }
        })
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .sidebar{
        height: 100%;
        width: 240px;
        padding: 30px 0 16px 16px;
        // 头像左右居中
        .custom--avatar{
            margin: auto;
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
            margin-top: 12px;
            flex-direction: column;
            li{
                flex: 1;
                color: #fff;
                font-size: 15px;
                padding: 13px 0 13px 20px;
                border-radius: 20px 0 0 20px;
                margin-bottom: 6px;
                cursor: pointer;
                &:hover{
                    color: #409EFF;
                    background-color: #fff;
                    box-shadow: 1px 2px 5px #e6e6e6;
                }
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
