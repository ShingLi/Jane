<template>
    <div class="article">
        <Processbar />
        <div class="back" @click="$router.go(-1)">
            <svg-icon iconClass="back_1" />
        </div>
        <div class="scrollWrap">
            <section>
                <h1 class="title">新的一年快快乐乐</h1>
                <div class="stuff">
                    <span>2021年/04/14</span>
                    <span>阅读 500</span>
                    <span>字数 20000</span>
                    <span>评论 4</span>
                    <span>喜欢24</span>
                </div>
                <div class="content">

                </div>
                <div class="comments">
                    <div class="userInfo">
                        <input type="text" placeholder="Name">
                        <input type="text" placeholder="Email">
                    </div>
                    <textarea class="textarea" :placeholder="textPlaceholder"></textarea>
                    <div class="confirm-box">
                        
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name: 'essay',
    data () {
        return {
            isBgColor: false,
            textPlaceholder: '纵使诗和远方不在眼前！每一天都要开开心心的，不是吗？'
        }
    },
    created () {
        if (process.client) {
            setTimeout(() => {
                this.initScrollTop()
            }, 1000)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
            this.$nuxt.$loading.finish(800)
        })
    },
    beforeDestroy () {
        this.$nuxt.$loading.start()
        this.$nuxt.$loading.finish(500)
    },
    methods: {
        initScrollTop () {
            const style = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden
            `
            document.body.style.cssText = style
            document.documentElement.style.cssText = style
        }
    },
    transition: {
        name: 'back',
        afterEnter (el) {
            // 这里竟然无法访问当前组件实例
            setTimeout(() => {
                el.classList.add('bgColor')
            }, 400);
        },
    }
}
</script>
<style lang="scss" scoped>
    .article{
        position: fixed; // 为什么使用fixed 而不是用absolute 因为absolute导致子路由页面滚动条计算不正确，原因未知
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        z-index: 9;
        transition: all .4s ease-in-out;
        &.bgColor{
            .scrollWrap{
                background-color: #fff;
                transition: all .4s ease-in-out;
            }
        }
        .back{
            position: fixed;
            top: 40px;
            left: 50px;
            cursor: pointer;
            ::v-deep .icon{
                width: 36px;
                height: 36px;
            }
        }
        .scrollWrap{
            background-color: #f4f4f4;
            min-height: 100vh;
            padding-bottom: 50px;
            section{
                width: 800px;
                margin: auto;

                h1{
                    padding: 130px 0 25px;
                    font-size: 32px;
                    font-weight: bold;
                    color: #333;
                }
                .stuff{
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 13px;
                        color: #6a737d;
                        line-height: 22px;
                        margin-right: 10px;
                    }
                }
                .content{
                    margin-top: 45px;
                    min-height: 300px;
                    
                }
                .comments{
                    margin-top: 35px;
                    
                    border-radius: 5px;
                    padding: 15px 12px 22px;
                    border: 1px solid #ebebeb;
                    .userInfo{
                        display: flex;
                        margin-bottom: 15px;
                        input{
                            width: 300px;
                            outline: none;
                            padding-left: 7px;
                            font-size: 15px;
                            height: 28px;
                            line-height: 27px;
                            background-color: transparent;
                            border-bottom: 1px dashed #f0f0f0;
                            transition: all .3s linear;
                            font-family: "PingFang Medium";
                            &:last-child{
                                margin-left: 30px;
                            }
                            &::-webkit-input-placeholder{
                                color: #bbb;
                            }
                            &:focus{
                                border-bottom: 1px dashed #b9b9b9;
                            }
                        }
                    }
                    .textarea{
                        position:relative;
                        height: 200px;
                        width: 100%;
                        outline: none;
                        resize: none;
                        padding: 16px;
                        border-radius: 4px;
                        color: #333;
                        font-size: 14px;
                        border: 1px dashed #eee;
                        background-color: transparent;
                        transition: all .3s ease-in-out;
                        &::-webkit-input-placeholder{
                            color: #bbb;
                        }
                        &:focus{
                            border: 1px dashed #b9b9b9;
                        }
                    }
                }
            }
        }
    }
</style>