<template>
    <div class="setting">
        <Tag text="信息修改"/>

        <el-form :model="formData" class="formData" :rules="rules" label-width="60px">
            <el-form-item label="头像" class="validator__placeholder">
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

            <el-form-item label="昵称" prop="name">
                <el-input v-model="formData.uname" placeholder="输入昵称" class="custom__input small"/>
            </el-form-item>

            <el-form-item label="账号" prop="account">
                <el-input v-model="formData.account" placeholder="输入管理员账号" class="custom__input"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="输入管理员密码" class="custom__input"/>
            </el-form-item>

            <el-form-item label="标识" class="validator__placeholder">
                <el-input v-model="formData.authId" placeholder="请输入管理员标识" class="custom__input disabled" disabled></el-input>
            </el-form-item>
        </el-form>
        <div class="btnwrap">
            <el-button type="primary" class="custom__btn">保存</el-button>
        </div>
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
                password: '',
                authId: '芳 '
            },
            imageUrl: '',
            rules: {
                name: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value == '') {
                                callback(new Error('请输入昵称'))
                            } else if (value.length < 4) {
                                callback(new Error('昵称长度需要是4位以上有效字符'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                account: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value == '') {
                                callback(new Error('请输入账号'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (value.length < 6) {
                                callback(new Error('密码最短需要6位'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
            },
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
            if (res.responseCode == '0000') {
                this.imageUrl = res.responseData.imgUrl
            }
        },

    }
}
</script>
<style lang="scss" scoped>
    @import './scss/set.scss';
</style>
