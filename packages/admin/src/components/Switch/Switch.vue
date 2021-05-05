<template>
    <label for="lc__switch" class="switch">
        <input type="checkbox" id="lc__switch" class="switch--input"/>
        <span class="switch--core"></span>
    </label>
</template>
<script>
export default {
    name: 'LcSitch'
}
</script>
<style lang="scss" scoped>
    .switch{
        display: inline-block;
        cursor: pointer;
    }
    .switch--core{
        display: inline-block;
        height: 32px;
        width: 52px;
        border-radius: 25px;
        position: relative;
        border: 1px solid #d9d9d9;
        background: #d9d9d9;
        transition: all .3s ease-in-out;
        &::before{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            transition: all .3s ease-in-out;
        }
    }
    .switch--input{
        width: 0;
        height: 0;
        position: relative;
        display: none;
        &:checked + .switch--core {
            background-color: #13ce66;
            border-color: #13ce66;
            &::before{
                transform: translateX(20px);
            }
        }
    }
</style>
