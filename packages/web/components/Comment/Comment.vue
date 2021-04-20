<template>
    <div class="commentwrap">
        <div class="commentlist">
            Comment List
        </div>
        <ul>
            <li v-for="n in 1">
                <div class="avatar">
                    <img src="/assets/images/3.jpeg">
                </div>
                <div class="info">
                    <div class="time">
                        <div class="reply"></div>
                        <p>18:00 Aug 08 2021</p>
                    </div>
                    <h3 class="name">李大锤</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sed !</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Comment',
    props: {
        listData: {
            type: Object,
            default: () => {[]}
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
    }
</style>