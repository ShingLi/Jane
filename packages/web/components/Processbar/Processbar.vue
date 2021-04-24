<template>
    <div class="processbar" ref="processbar"></div>
</template>
<script>
export default {
    name: 'ProcessBar',
    props: {
        scrollHeight: {
            type: Number,
            default: 0
        },
        scrollTop: {
            type: Number,
            default: 0
        },
        mode: 'universal'
    },
    watch: {
        scrollTop (val) {
            this.$nextTick(() => {
                this.setProcessBarWidth(val)
            })
        }
    },
    mounted () {
        this.setProcessBarWidth()
    },
    methods: {
        setProcessBarWidth (val = this.scrollTop) {
            this.$refs.processbar.style.width = (this.scrollTop / this.scrollHeight) + '%'
        }
    }
}
</script>
<style lang="scss" scoped>
    .processbar{
        position:fixed;
        top: 0;
        left: 0;
        height: 2px;
        // width: 50%;
        background-color: #409EFF;
        border-radius: 2px;
        transition: all .3s ease;
    }
</style>