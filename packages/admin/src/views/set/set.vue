<template>
    <div class="setting">
        <Tag text="信息修改"/>

        <el-form
            label-width="60px"
            class="formData"
            ref="formData"
            :model="formData"
            :rules="rules"
        >
            <el-form-item label="头像" class="validator__placeholder">
                <el-upload
                    ref="avatar"
                    class="avatar-uploader"
                    name="uploadIMG"
                    action="http://localhost:4000/admin/upload"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="onChange"
                    :on-success="handleAvatarSuccess"
                >
                    <img v-if="uploadFile.imageUrl" :src="uploadFile.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="昵称">
                <el-input v-model="formData.uname" placeholder="输入要修改的昵称" class="custom__input small"/>
            </el-form-item>

            <el-form-item label="账号" prop="account">
                <el-input v-model="formData.account" placeholder="输入要修改的管理员账号" class="custom__input"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" placeholder="输入要修改的管理员密码" class="custom__input"/>
            </el-form-item>

            <el-form-item label="标识" class="validator__placeholder">
                <el-input v-model="formData.authId" placeholder="请输入管理员标识" class="custom__input disabled" disabled></el-input>
            </el-form-item>
        </el-form>
        <div class="btnwrap">
            <el-button type="danger" @click="cancel">取 消</el-button>
            <el-button type="primary" :loading="loadFlag" @click="submit">保 存</el-button>
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
                authId: 'Jane '
            },
            uploadFile: {
                imageUrl: '',
                file: null
            },
            loadFlag: false,
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
        onChange ({ raw: file }) {
            const defaulType = ['image/jpeg', 'image/png', 'image/jpg']
            if (!defaulType.includes(file.type)) {
                this.$message.error('请上传jpeg/png/jpg 类型的图片')
                return false
            } else {
                this.revokeUrl()

                const temporaryUrl = URL.createObjectURL(file)

                this.uploadFile.imageUrl = temporaryUrl
            }
        },

        handleAvatarSuccess (res, file) {
            if (res.responseCode == '0000') {
                this.uploadFile.imageUrl = res.responseData.imgUrl
            }
        },

        cancel () {
            this.$refs.formData.clearValidate()
            this.$refs.formData.resetFields()

            for (const k in this.formData) {
                if (k != 'authId') {
                    this.formData[k] = ''
                }
            }

            this.revokeUrl()

            this.uploadFile.imageUrl = ''
            this.uploadFile.file = null
        },
        
        revokeUrl () {
            if (this.uploadFile.imageUrl) URL.revokeObjectURL(this.uploadFile.imageUrl)
        },

        submit () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/set.scss';
</style>
