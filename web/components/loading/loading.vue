<template>
    <div v-if="loading" class="loading">
        <div class="loading--pc"></div>
        <div v-if="false" class="loading--wap">
            <div class="loading__content">
                <div class="loading__content--svg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="56"
                        height="56"
                        viewBox="0,0,55,55">
                        <circle
                            r = "25"
                            cx="28"
                            cy="28"
                            stroke="#fff"
                            fill="none"
                            class="circle"
                            stroke-width="2px"
                            stroke-lineap="round">
                        </circle>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// circle  load progress
export default {
    name: 'Loading',
    data: () => ({
        loading: false,
        dashOffset: 0,
        dashArray: 164,
    }),
    methods: {
        start () {
            this.loading = true
            console.log('start')
        },
        finish () {
            setTimeout(() => {
                this.loading = false
            }, 1800)
        },
        fail (error) {},
    },
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
                vertical-align: bottom;
                animation: circle 3s linear infinite;
                @keyframes circle {
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
                .circle{
                    stroke-dasharray: 164;
                    animation: rotate 1.3s ease-in-out infinite;
                }
                @keyframes rotate {
                    0%{
                        stroke-dasharray: 1, 200;
                        stroke-dashoffset: 0;
                    }
                    50%{
                        stroke-dasharray: 130, 170;
                        stroke-dashoffset: -49;
                    }
                    100%{
                        stroke-dasharray: 130, 170;
                        stroke-dashoffset: -165;
                    }
                }
            }
            &--text{
                color: #fff;
                font-size: 14px;
            }
        }
        &--pc{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            border-radius: 4px;
            z-index: 99999;
            // background-position: 0 0;
            background-image: linear-gradient(to right, #F16F5C 0%, #F16F5C 12.5%, #5B56DD 12.5%, #5B56DD 25%, #E15CED 25%, #E15CED 37.5%, #27E559 37.5%, #27E559 50%, #18C8C9 50%, #18C8C9 62.5%, #DC8987 62.5%, #DC8987 75%, #BB83D6 75%, #BB83D6 87.5%, #E774BD 87.5%, #E774BD 100%);
            animation: loader 3s linear infinite;
        }
        @keyframes loader {
            0%{
                background-position: 0 0;
            }
            100% {
                background-position: 930px 0;
                animation-fill-mode: forwards;
            }
        }
    }
</style>
