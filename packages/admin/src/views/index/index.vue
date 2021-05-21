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
            text: '花有重开日'
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
