<template>
    <div class="article">
        <Processbar />
        <div class="back" @click="$router.go(-1)">
            <svg-icon iconClass="back" />
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
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name: 'essay',
    data () {
        return {
            isBgColor: false
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
                transition: all .3s ease-in-out;
            }
        }
        .back{
            position: fixed;
            top: 40px;
            left: 50px;
            cursor: pointer;
            ::v-deep .icon{
                width: 40px;
                height: 40px;
            }
        }
        .scrollWrap{
            background-color: #f4f4f4;
            min-height: 100vh;
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
                    // min-height: 3000px;
                }
            }
        }
    }
</style>