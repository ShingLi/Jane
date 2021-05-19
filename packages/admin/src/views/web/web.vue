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
                    <el-button type="text">保存</el-button>
                </div>
            </el-form>
            <el-divider content-position="right" class="small">关于</el-divider>
            <el-form :model="aboutFormData" class="aboutFormData">
                <el-form-item :label="`HTML ${aboutFormData.html} %`" label-position="left">
                    <el-slider v-model="aboutFormData.html"></el-slider>
                </el-form-item>
                <div class="btnwrap">
                    <el-button type="text" class="danger" disabled>取消</el-button>
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
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/web.scss';
</style>
