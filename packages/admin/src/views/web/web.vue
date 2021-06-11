<template>
    <div class="web">
        <Tag text="Web信息"/>
        <div class="main">
            <el-divider content-position="left" class="small">首页</el-divider>
            <el-form :model="indexFormData" class="formData">
                <el-form-item label="">
                    <el-input v-model="indexFormData.recordNumber" placeholder="请输入ICP备案号"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="indexFormData.ICPwebsit" placeholder="请输入ICP/IP地址/域名信息备案管理系统网址"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="indexFormData.indexDesc" placeholder="请输入首页文案"></el-input>
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
                recordNumber: '', // 备案号
                ICPwebsit: '', // 工信部备案系统
                indexDesc: '', // 首页文案
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
            color: 'rgba(19, 206, 102, 0.8)'
        }
    },
    created () {
        
    },
    methods: {
        async saveIndex () {
            const DATA = {
                ...this.indexFormData,
                outer: true,
            }

            const res = await this.$http.post('saveIndex', DATA) 
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/web.scss';
</style>
