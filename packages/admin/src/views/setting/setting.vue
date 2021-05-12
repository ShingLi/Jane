<template>
    <div class="setting">
        <Tag text="信息修改"/>
        <el-form :model="formData" class="formData">
            <el-form-item label="头像">
                <el-upload
                    ref="avatar"
                    class="avatar-uploader"
                    name="janeAvatar"
                    action="http://localhost:4000/admin/upload"
                    :headers="{
                        Authorization: token
                    }"
                    :limit="1"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="昵称">
                <el-input v-model="formData.uname" placeholder="输入昵称" class="custom__input small"/>
            </el-form-item>

            <el-form-item label="账号">
                <el-input v-model="formData.account" placeholder="输入管理员账号" class="custom__input"/>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="formData.password" placeholder="输入管理员密码" class="custom__input"/>
            </el-form-item>

            <div class="btnwrap">
                <el-button type="primary" class="custom__btn">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import { getCookie, removeCookie } from 'utils/cookie'
export default {
    name: 'Setting',
    data() {
        return {
            formData: {
                name: '',
                account: '',
                password: ''
            },
            imageUrl: '',
            token: `Bearer ${getCookie('token')}`,
        }
    },
    methods: {
        beforeAvatarUpload (file) {
            const defaulType = ['image/jpeg', 'image/png', 'image/jpg']
            if (!defaulType.includes(file.type)) {
                this.$message.error('请上传jpeg/png/jpg 类型的图片')
                return false
            }
        },

        handleAvatarSuccess (res, file) {
            console.log('上传成功')
            console.log(res)
            console.log(file)
        },

    }
}
</script>
<style lang="scss" scoped>
    @import './scss/setting.scss';
</style>
