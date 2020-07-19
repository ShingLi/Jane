<template>
    <div class="login__wrap">
        <ul class="bubbles__wrap">
        </ul>
        <el-form :model="formData" ref='formData' class="formData">
            <transition name="fade">
                <div class="sign">
                    <p class="sign__tips">欢迎回家！</p>
                </div>
            </transition>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data () {
        return {
            formData: {
                username: '',
                password: '',
                repeatpwd: ''
            }
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/login.scss';
</style>
