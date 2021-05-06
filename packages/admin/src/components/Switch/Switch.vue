<template>
    <label class="switch">
        <input type="checkbox" class="switch--input"
            :checked="value"
            @change="$emit('input', $event.target.checked)"/>
        <span class="switch--core"></span>
    </label>
</template>
<script>
export default {
    name: 'LcSitch',
    props: ['value'],
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
        border-radius: 16px;
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
            z-index: 1;
            box-shadow: 0 1px 3px rgb(0 0 0 / 40%);
        }
        &::after{
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 50px;
            height: 30px;
            border-radius: 16px;
            background-color: #fdfdfd;
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
            &::after{
                transform: scale(0);
            }
        }
    }
</style>
