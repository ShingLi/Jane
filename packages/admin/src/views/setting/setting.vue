<template>
    <div class="setting">
        <Tag text="网站信息修改"/>
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
                <el-input v-model="formData.uname" placeholder="请输入昵称"/>
            </el-form-item>
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
                name: ''
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
