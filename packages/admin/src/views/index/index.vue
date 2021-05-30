<template>
    <div class="index__wrap">
        <Tag :text="text" />
    </div>
</template>
<script>
export default {
    name: 'Index',
    data () {
        return {
            text: '若是气质藏于身，岁月从不败美人'
        }
    },
    beforeRouteEnter (to, from, next) {
        next()
    },
    methods: {
        fetchData () {

        }
    }
}
</script>
<style lang= "scss" scoped>
    @import './scss/index.scss';
</style>
