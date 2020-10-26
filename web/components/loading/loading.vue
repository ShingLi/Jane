<template>
    <div class="loading" v-if="loading">
        <div class="loading--pc" v-if="false"></div>
        <div class="loading--wap">
            <div class="loading__content">
                <div class="loading__content--svg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        stroke-width="2px"
                        viewBox="0,0,60,60">
                        <circle r = '29' cx="30" cy="30" stroke="#fff" fill="transparent"></circle>
                    </svg>
                </div>
                <!-- <p class="loading__content--text">加载中···</p> -->
            </div>
        </div>
    </div>
</template>
<script>
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
            &--text{
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>