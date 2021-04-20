<template>
    <div class="article">
        <Processbar />
        <div class="back" @click="$router.go(-1)">
            <svg-icon iconClass="back_1" />
        </div>
        <div class="scrollWrap">
            <section>
                <div class="header">
                    <h1 class="title">新的一年快快乐乐</h1>
                    <div class="stuff">
                        <span>2021年/04/14</span>
                        <span>阅读 500</span>
                        <span>字数 20000</span>
                        <span>评论 4</span>
                        <span>喜欢24</span>
                    </div>
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
                        <el-button size="medium" icon="el-icon-s-promotion">SUBMIT</el-button>
                        <p class="desc"></p>
                    </div>

                </div>
                <Comment class="comment"/>
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
            loading: false, // 评论发送
            textPlaceholder: '纵使诗和远方不在眼前！每一天都要开开心心，不是吗？'
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
        
        // 刷新页面不执行transition动画，所以这里手动判断下
        setTimeout(() => {
            const rootDom = document.querySelector('.article')
            if (!rootDom.classList.contains('bgColor')) {
                rootDom.classList.add('bgColor')
            }
        }, 800)
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
            console.log(el)
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
            section{
                width: 800px;
                margin: auto;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                padding-bottom: 30px;
                .header{
                    h1{
                        padding: 80px 0 25px;
                        font-size: 36px;
                        font-weight: bold;
                        color: #333;
                        font-family: fang;
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
                }
                .content{
                    margin-top: 45px;
                    flex: 1;
                }
                .comments{
                    position: relative;
                    margin-top: 35px;
                    border-radius: 5px;
                    padding: 16px 12px 10px;
                    border: 1px solid #ebebeb;
                    .userInfo{
                        display: flex;
                        margin-bottom: 15px;
                        font-size: 0;
                        input{
                            width: 300px;
                            outline: none;
                            padding-left: 7px;
                            font-size: 18px;
                            height: 28px;
                            line-height: 27px;
                            background-color: transparent;
                            border-bottom: 1px dashed #f0f0f0;
                            transition: all .3s linear;
                            font-family: fang;
                            font-weight: 500;
                            &:last-child{
                                margin-left: 30px;
                            }
                            &::-webkit-input-placeholder{
                                color: #bbb;
                            }
                            &:focus{
                                border-bottom: 1px dashed #b9b9b9;
                            }
                            &:focus::-webkit-input-placeholder{
                                color: #888;
                            }
                        }
                    }
                    .textarea{
                        position:relative;
                        height: 180px;
                        width: 100%;
                        outline: none;
                        resize: none;
                        padding: 16px;
                        border-radius: 4px;
                        color: #333;
                        font-size: 18px;
                        border: 1px dashed #eee;
                        background-color: transparent;
                        transition: all .3s ease-in-out;
                        font-family: fang;
                        // background-image: url('~assets/images/hui.jpeg');
                        background-position: bottom right;
                        background-repeat: no-repeat;
                        &::-webkit-input-placeholder{
                            color: #bbb;
                        }
                        &:focus{
                            border: 1px dashed #b9b9b9;
                        }
                        &:focus::-webkit-input-placeholder{
                            color: #888;
                        }
                    }
                    .confirm-box{
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .desc{
                        font-size: 14px;
                        color: #F56C6C;
                    }
                    .chahua{
                        position: absolute;
                        bottom: 40px;
                        ::v-deep .icon{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
                .comment{
                    margin-top: 60px;
                }
            }
        }
    }
</style>