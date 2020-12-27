<template>
    <div class="svg">
        <svg aria-hidden="true" class="icon">
            <use :xlink:href="iconName"></use>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            default: '',
        },
    },
    computed: {
        iconName () {
            return `#icon-${this.iconClass}`
        },
    },
}
</script>
<style lang="scss" scoped>
    .icon{
        width: 20px;
        height: 20px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
