<template>
    <div class="web">
        <Tag text="Web信息"/>
        <div class="main">

            <el-divider content-position="left" class="small">首页</el-divider>

            <el-form :model="indexFormData" class="formData" :rules="indexFormDataRules" ref="indexFormData">
                <el-form-item label="" prop="">
                    <el-input v-model="indexFormData.ICPNumber" placeholder="ICP备案号 (皖ICP备18000360号)" disabled class="disabled"></el-input>
                </el-form-item>
                <el-form-item label="" prop="">
                    <el-input v-model="indexFormData.ICPwebsit" placeholder="工信部 ICP/IP地址/域名信息备案管理系统网址" disabled class="disabled"></el-input>
                </el-form-item>
                <el-form-item label="" prop="IndexDesc">
                    <el-input v-model="indexFormData.IndexDesc" placeholder="请输入首页文案"></el-input>
                </el-form-item>
                <div class="btnwrap">
                    <el-button type="text" @click="saveIndex">保存</el-button>
                </div>
            </el-form>

            <el-divider content-position="right" class="small">关于</el-divider>

            <el-form :model="aboutFormData" class="aboutFormData">
                <el-form-item label="">
                    <el-input v-model="abourpre" placeholder="~~"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="aboutDesc" placeholder="随便写写吧~"></el-input>
                </el-form-item>
                <el-form-item :label="`${(item + '').toLowerCase()} ${aboutFormData[item]} %`"
                    label-position="left"
                    v-for="(item, index) of Object.keys(aboutFormData)"
                    :key="index"
                    class="custom_slider"
                >
                    <el-slider v-model="aboutFormData[item]"></el-slider>
                    <el-color-picker v-model="color" show-alpha></el-color-picker>
                </el-form-item> 
                <div class="btnwrap">
                    <el-button type="text" class="danger">取消</el-button>
                    <el-button type="text">保存</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Web',
    data () {
        return {
            indexFormData: {
                ICPNumber: '', // 备案号
                ICPwebsit: '', // 工信部备案系统
                IndexDesc: '', // 首页文案
            },
            aboutFormData: {
                html: 60,
                css: 70,
                jquery: 60,
                javascript: 61,
                'mini program': 60,
                vue: 70,
                nuxt: 50,
                react: 30,
                express: 10,
                mongodb: 10,
            },
            abourpre: '',
            aboutDesc: '',
            color: 'rgba(19, 206, 102, 0.8)',
            indexFormDataRules: []
        }
    },
    created () {
        this.initvalidate()
    },
    methods: {
        initvalidate () {
            const errorMessage = ['请输入ICP备案号', '请输入ICP/IP地址/域名信息备案管理系统网址', '请输入首页文案'], filed = ['ICPNumber', 'ICPwebsit', 'IndexDesc'], indexFormDataRules = {}
            filed.forEach((v, i) => {
                indexFormDataRules[v] = {
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
            this.indexFormDataRules = indexFormDataRules
        },

        async saveIndex () {
            const DATA = {
                ...this.indexFormData
            }

            this.$refs.indexFormData.validate(async valid => {
                if (valid) {
                    const { isOk } = await this.$http.post('saveIndex', DATA)
                    if (isOk) {
                        this.$refs.indexFormData.resetFields()
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/web.scss';
</style>
