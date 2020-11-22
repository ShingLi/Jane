<template>
    <svg aria-hidden="true" class="icon">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName () {
            return `#icon-${this.iconClass}`
        }
    }
}
</script>
<style lang="scss" scoped>
    .icon{
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>