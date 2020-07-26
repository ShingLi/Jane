<template>
    <div class="login__wrap">
        <ul class="bubbles__wrap">
        </ul>
        <el-form ref='formData'
            class="formData"
            :rules="rules"
            :inline="true"
            :model="formData"
        >
            <transition name="fade">
                <div class="sign">
                    <p class="sign__tips">欢迎你～～～</p>
                    <div class="sign__content">
                        <el-form-item class="username custom__form--item" prop="username">
                            <el-input v-model="formData.username" placeholder="请输入账号" autofocus/>
                            <img src="./img/greeting.png" alt="" width="120" height="114">
                        </el-form-item>
                        <el-form-item class="custom__form--item password" prop="password">
                            <el-input v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="signIn"/>
                            <img src="./img/blindfold.png" alt="" width="103" height="84">
                        </el-form-item>
                        <img src="./img/normal.png" alt="" width="120" height="95" class="normal">
                    </div>
                    <div class="sign__btn">
                        <el-button type="primary" size="medium" :loading="loading" @click="signIn">sign in</el-button>
                    </div>
                </div>
            </transition>
        </el-form>
    </div>
</template>
<script>
import urls from 'config/urls'
export default {
    name: 'login',
    data () {
        return {
            formData: {
                username: '',
                password: '',
                repeatpwd: ''
            },
            loading: false
        }
    },
    created () {
        this.initvalidate()
    },
    methods: {
        initvalidate () {
            const errorMessage = ['请输入账号', '请输入密码'], filed = ['username', 'password'], rules = {}
            filed.forEach((v, i) => {
                rules[v] = {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value == '') {
                            callback(new Error(errorMessage[i]))
                        } else {
                            callback()
                        }
                    }
                }
            })
            this.rules = rules
        },
        signIn () {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.$http.post(urls.login, this.formData)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/login.scss';
</style>
