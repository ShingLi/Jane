<template>
    <div class="login__wrap">
        <ul class="bubbles__wrap">
            <li v-for="(item, index) of bubbles"
                :key="index"
                :style="calcStyle(item)"
                :class="item"
            ></li>
        </ul>
        <el-form ref='formData'
            class="formData"
            :rules="rules"
            :inline="true"
            :model="formData"
        >
            <div class="flip-container">
                <div class="flipper" :class="{ flip: isFlip }">
                    <div class="sign front" key="signIn">
                        <p class="sign__tips">欢迎你～～～</p>
                        <div class="sign__content">
                            <el-form-item class="username custom__form--item" prop="username">
                                <el-input v-model="formData.username" placeholder="请输入账号" autofocus/>
                                <img src="./img/greeting.png" alt="" width="120" height="114">
                            </el-form-item>
                            <el-form-item class="custom__form--item password" prop="password">
                                <el-input v-model="formData.password"
                                    placeholder="请输入密码"
                                    @keyup.enter.native="signIn"
                                />
                                <img src="./img/blindfold.png" alt="" width="103" height="84">
                            </el-form-item>
                            <img src="./img/normal.png" alt="" width="120" height="95" class="normal">
                        </div>
                        <div class="sign__btn">
                            <el-button type="primary" size="medium" :loading="loading" @click="signIn">sign in</el-button>
                        </div>
                        <div class="sign__btn sign__btn--up">
                            <el-button type="text" size="mini" @click="isFlip = true">sing up</el-button>
                        </div>
                    </div>
                    <div class="sign back" key="signUp">
                        <i class="el-icon-circle-close" @click="isFlip = false"></i>
                        <p>注册账号</p>
                    </div>
                </div>
            </div>
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
                repeatpwd: '',
            },
            bubbles: [], // 气泡的随机数
            loading: false,
            isFlip: true
        }
    },
    created () {
        this.initvalidate()
        this.generateRandom()
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
                    },
                }
            })
            this.rules = rules
        },
        generateRandom () {
            const presetName = ['circle', 'rectangle', 'square', 'triangle', 'star-five'],
                className = []
            let number = 10
            while (number > 0) {
                number--
                const index = Math.floor(Math.random() * presetName.length)
                className.push(presetName[index])
            }
            this.bubbles = className
        },
        calcStyle (item) {
            const sizeArr = [30, 40, 75, 60, 50], style = {}
            const size = sizeArr[Math.floor(Math.random() * sizeArr.length)]
            switch (item) {
                case 'circle':
                    style['width'] = style['height'] = size
                    style['left'] = Math.random() * 100 + '%'
                    break
                case 'rectangle':
                    style['width'] = size
                    style['height'] = size / 2
                    style['left'] = Math.random() * 100 + '%'
                    break
                case 'square':
                    style['width'] = style['height'] = size
                    style['left'] = Math.random() * 100 + '%'
                    break
                case 'ellipse':
                    style['width'] = size
                    style['height'] = size / 2
                    style['border-radius'] = style['width'] + 'px/' + style['height'] + 'px'
                    style['left'] = Math.random() * 100 + '%'
                    break
                case 'triangle':
                    style['border-left-width'] = size + 'px'
                    style['border-right-width'] = size + 'px'
                    style['border-bottom-width'] = size * 2 + 'px'
                    style['left'] = Math.random() * 100 + '%'
                    break
                case 'star-five':
                    style['left'] = Math.random() * 100 + '%'
                    break
            }
            style.width = style.width + 'px'
            style.height = style.height + 'px'
            return style
        },
        signIn () {
            this.$refs.formData.validate(async valid => {
                const DATA = {
                    username: this.formData.username,
                    password: this.formData.password
                }
                if (valid) {
                    await this.$http.post(urls.login, DATA)
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    @import './scss/login.scss';
</style>
