<template>
    <div class="login__wrap">
        <ul class="bubbles__wrap">
        </ul>
        <el-form :model="formData" ref='formData' class="formData">
            <transition name="fade">
                <div class="sign">
                    <p class="sign__tips">欢迎你～～～</p>
                    <div class="sign__content">
                        <el-form-item label="账号" class=custom__form--item>
                            <el-input v-model="formData.username" placeholder="请输入账号" />
                        </el-form-item>
                        <el-form-item label="密码" class=custom__form--item>
                            <el-input v-model="formData.password" placeholder="请输入密码"/>
                        </el-form-item>
                    </div>
                    <div class="sign__btn">
                        <el-button>sign in</el-button>
                    </div>
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
