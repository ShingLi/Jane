<template>
    <div class="commentwrap">
        <div class="commentlist">
            Comment List
        </div>
        <ul v-if="commentList.length">
            <li v-for="(item, index) of commentList" :key="index">
                <div class="avatar">
                    <img src="/assets/images/3.jpeg">
                </div>
                <div class="info">
                    <div class="time">
                        <div class="reply"></div>
                        <!-- <p>18:00 Aug 08 2021</p> -->
                        <p>{{ format(item.comment_create_time - 0) }}</p>
                    </div>
                    <h3 class="name">{{ item.comment_user_name }}</h3>
                    <p>{{ item.comment_user_content }}</p>
                </div>
            </li>
        </ul>
        <div class="nodata" v-else>
            <i class="icon--nodata">
                <svg-icon iconClass="nodata" />
            </i>
            <p>&nbsp;暂无评论，欢迎抢沙发~~</p>
        </div>
    </div>
</template>
<script>
import SvgIcon from '../SvgIcon/SvgIcon.vue'
export default {
    components: { SvgIcon },
    name: 'Comment',
    props: {
        commentList: {
            type: Array,
            default: () => {[]}
        }
    },
    methods: {
        format (timestamp) {
            let hours = new Date(timestamp).getHours() - 0 < 10
                    ? '0' + new Date(timestamp).getHours()
                    : new Date(timestamp).getHours(),
                minutes = new Date(timestamp).getMinutes() - 0 < 10
                    ? '0' + new Date(timestamp).getMinutes()
                    : new Date(timestamp).getMinutes(), 
                toDateString = new Date(timestamp).toDateString().split(' ').splice(1).join(' ')
            return `${hours}:${minutes} ${toDateString}`
        }
    }
}
</script>
<style lang="scss" scoped>
    .commentwrap{
        font-family: Questrial;
        .commentlist{
            width: fit-content;
            margin-bottom: 20px;
            font-size: 23px;
            font-style: oblique;
            color: #333;
            letter-spacing: 1px;
            border-bottom: 1px solid #333;
            border-bottom-style: dotted;
        }
        >ul{
            li{
                display: flex;
                border-bottom: 1px solid #f6f6f6;
                padding: 20px 0 33px 0;
                position: relative;
                display: flex;
                cursor: pointer;
                .avatar{
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    width: 55px;
                    height: 55px;
                    flex: 0 0 55px;
                    overflow: hidden;
                    cursor: pointer;
                    img{
                        display: block;
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .info{
                    flex: 1;
                    padding-top: 15px;
                    padding-left: 20px;
                    h3{
                        font-size: 16px;
                        // letter-spacing: -1px;
                        margin-bottom: 8px;
                        color: #F56C6C;
                       
                        font-family: Questrial;
                    }
                    p{
                        font-size: 13px;
                        line-height: 22px;
                        color: #303030;
                        word-break: break-all;
                    }
                    .time{
                        position: absolute;
                        right: 5px;
                        top: 20px;
                        p{
                            font-size: 13px;
                            color: #999;
                            letter-spacing: 0;
                            font-family: Questrial;
                        }
                    }
                }
            }
        }
        .nodata{
            
            p{
                text-align: center;
                font-size: 14px;
                color: #bbb;
            }
        }
    }
</style>