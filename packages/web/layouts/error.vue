<template>
    <div class="container">
        <div class="center">
            <div class="errorpage">
                <svg-icon iconClass="error"/>
            </div>
            <ul class="descript">
                <li>人生中很多人都是过客，错过了就是错过了，正如同这个页面一样，丢了就真的丢了。</li>
            </ul>
            <div class="tickwrap">
                <span>亦或许可以给我一个机会, 让我重新开始! 倒计时 </span>
                <i>{{ tickNum }}</i>
                <span>&nbsp;s</span>
                <b @click="pageStatusSwitch">{{ `( ${pageStatus == 0 ? '暂停计时' : '重新开始' })` }}</b>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Error',
    props: ['error'],
    data () {
        return {
            tickNum: 10,
            pageStatus: 0, // 0 倒计时进行中  1 暂停倒计时
        }
    },
    mounted () {
        this.tickFn()
    },
    methods: {
        tickFn () {
            this.pageStatus  = 0
            this.timer = setInterval(() => {
                if (this.tickNum > 1) {
                    this.tickNum--
                } else {
                    this.timer && clearInterval(this.timer)
                    this.$router.push({
                        path: '/'
                    })
                }
            }, 1000)
        },
        pageStatusSwitch () {
            if (this.pageStatus == 0) {
                this.timer && clearInterval(this.timer)
                this.pageStatus = 1
            } else this.tickFn()
        }
    },
    asyncData () {

    },
    head () {
        return {
            title: '页面找不到了，可能丢了~~'
        }
    }
}
</script>
<style lang="scss" scoped>
    .container{
        min-height: 100vh;
        width: 100vw;
        padding-top: 4vh;
        position: relative;
        .center{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .errorpage{
                width: 50vw;
                height: 50vh;
                margin: auto;
                ::v-deep .icon{
                    width: 100%;
                    height:100%;
                }
            }
            .descript{
                margin: 40px auto 0;
                max-width: 70vw;
                text-align: center;
                li{
                    font-size:14px;
                    margin-bottom: 15px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                };
            }
            .tickwrap{
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 20px;
                i{
                    color: red;
                }
                span{
                    color: #98bf21;
                }
                b{
                    color: #ff0090;
                }
            }
        }
    }
</style>
