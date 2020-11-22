<template>
    <div v-if="loading" class="loading">
        <div v-if="false" class="loading--pc"></div>
        <div class="loading--wap">
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
        },
        finish () {
            this.loading = false
        },
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
    }
</style>
