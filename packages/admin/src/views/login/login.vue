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
            status-icon
            :rules="rules"
            :inline="true"
            :model="formData"
        >
            <div class="card">
                <div class="rose">
                    <svg-icon iconName="hehua" />
                </div>
                <div class="flip-container">
                    <div class="flipper" :class="{ flip: isFlip }">
                        <!-- signin -->
                        <div class="sign front" key="signIn">
                            <p class="sign__tips">欢迎你～～～</p>
                            <div class="sign__content">
                                <el-form-item class="username custom__form--item" prop="username">
                                    <el-input v-model="formData.username" ref="l_uname" placeholder="请输入账号" autofocus class="no--border"/>
                                    <img src="./images/greeting.png" alt="" width="120" height="114">
                                </el-form-item>
                                <el-form-item class="custom__form--item password" prop="password">
                                    <el-input v-model="formData.password"
                                        placeholder="请输入密码"
                                        class="no--border"
                                        @keyup.enter.native="sign"
                                    />
                                    <img src="./images/blindfold.png" alt="" width="103" height="84">
                                </el-form-item>
                                <img src="./images/normal.png" alt="" width="120" height="95" class="normal">
                            </div>
                            <div class="sign__btn">
                                <el-button type="primary" size="medium" :loading="loading" @click="sign">LOG IN</el-button>
                            </div>
                            <div class="line">
                                <div class="circle">
                                    or
                                </div>
                            </div>
                            <div class="sign__btn sign__btn--up">
                                <el-button type="text" size="mini" @click="isFlip = true">Sing up</el-button>
                            </div>
                        </div>
                        <!-- signup -->
                        <div class="sign back" key="signUp">
                            <i class="el-icon-circle-close" @click="isFlip = false"></i>
                            <p>注册账号</p>
                            <div class="sign__content">
                                <el-form-item class="username custom__form--item" prop="username">
                                    <el-input v-model="formData.username" ref="r_uname" placeholder="请输入账号" class="no--border"/>
                                </el-form-item>
                                <el-form-item class="custom__form--item password" prop="password">
                                    <el-input v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="sign" class="no--border"/>
                                </el-form-item>
                            </div>
                            <div class="sign__btn">
                                <el-button type="primary" size="medium" :loading="loading" @click="sign">sign up</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
import { setCookie } from 'utils/cookie'
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
            isFlip: false
        }
    },
    watch: {
        isFlip (val) {
            if (val) this.$refs.r_uname.focus()
            else this.$refs.l_uname.focus()
            this.$refs.formData.resetFields()
            this.loading = false
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
                            setTimeout(() => {
                                callback(new Error(errorMessage[i]))
                            }, 200)
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
            const sizeArr = [30, 40, 65, 60, 50], style = {}
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
        sign () {
            this.$refs.formData.validate(async valid => {
                let DATA = {
                    account: this.formData.username,
                    password: this.formData.password
                }
                if (valid) {
                    const url = !this.isFlip ? 'login' : 'signup'
                    DATA = { ...DATA, url }

                    this.loading = true

                    const Interface = (Data) => {
                        return new Promise((resolve, reject) => {
                            this.$store.dispatch('user/login', Data)
                                .then((token) => {
                                    if (token) {
                                        if (this.$route.query.originUrl) {
                                            this.$router.push({
                                                path: decodeURIComponent(this.$route.query.originUrl)
                                            })
                                        } else {
                                            this.$router.push({ path: '/' })
                                        }
                                    }
                                    resolve()
                                })
                                .catch(() => {
                                    setTimeout(() => {
                                        this.loading = false
                                    }, 1000)
                                })
                        })
                    }
                    Interface(DATA).then(() => {
                        if (this.isFlip) {
                            // 注册成功需要调用登录接口拉去下token
                            DATA = Object.assign(DATA, { url: 'login' })
                            Interface(DATA)
                        }
                    })
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    @import './scss/login.scss';
</style>
