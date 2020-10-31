<template>
    <div class="loading" v-if="loading">
        <div class="loading--pc" v-if="false"></div>
        <div class="loading--wap">
            <div class="loading__content">
                <div class="loading__content--svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        
                        viewBox="0,0,60,60">
                        <circle r = '26' cx="30" cy="30" stroke="#fff" fill="transparent" class="circle" stroke-width="3px"></circle>
                    </svg>
                </div>
                <!-- <p class="loading__content--text">加载中···</p> -->
            </div>
        </div>
    </div>
</template>
<script>
// circle  load progress
export default {
    name: 'Loading',
    data: () => ({
        loading: true,
    }),
    methods: {
        start () {
            this.loading = true
        },
        finish () {
            this.loading = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .loading{
        &--wap{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            // background-color: #ccc;
        }
        &__content{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%,0);
            // width: 80px;
            // height: 80px;
            padding: 10px;
            border-radius: 6px;
            background-color: rgba(0,0,0, .6);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            &--svg{
                animation: circle 1s linear infinite;
                @keyframes circle {
                    0%{
                        transform: rotate(0deg);
                    }
                    50%{
                        transform: rotate(180deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
                .circle{
                    stroke-dasharray: 164;
                    stroke-dashoffset: 0;
                    animation: rotate 2.3s ease-in-out infinite;
                }
                @keyframes rotate {
                    0%{
                        stroke-dashoffset: 0;
                    }
                    20%{
                        stroke-dashoffset: -100;
                    }
                    40%{
                        stroke-dashoffset: -170;
                    }
                    60%{
                        stroke-dashoffset: -240;
                    }
                    80%{
                        stroke-dashoffset: -300;
                    }
                    100%{
                        stroke-dashoffset: -330;
                    }
                }
            }
            &--text{
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>