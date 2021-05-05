<template>
    <h2>{{ text }}</h2>
</template>
<script>
export default {
    name: 'Tag',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
    h2{
        font-size: 17px;
        line-height: 23px;
        color: #0e8bff;
        padding-left: 18px;
        border-left: 2px solid #0084ff;
    }
</style>
