<template>
    <div class="article">
        <Tag :text="text"/>
        <el-form :model="formData" :rules="rules" ref="ruleForm" status-icon>
            <div class="articlewrap">
                <el-form-item prop="title">
                    <el-input placeholder="请输入文章标题"

                        prefix-icon="el-icon-paperclip"
                        class="title"
                        type=”text“
                        props="title"
                        v-model="formData.title"
                    />
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入SEO关键字"

                        prefix-icon="el-icon-paperclip"
                        class="title"
                        type=”text“
                        props="title"
                        v-model="formData.seo"
                    />
                </el-form-item>

                <el-form-item prop="content">
                    <div class="markdown">
                    <mavon-editor
                        v-model="formData.content"
                        :subfield="false"
                        fontSize="15px"
                        codeStyle="monokai"
                    />
                </div>
                </el-form-item>
                <el-collapse-transition>
                    <div v-show="!isInternal">
                        <div class="extraInput">
                            <el-form-item label="背景音乐">
                                <el-input v-model="formData.extraMusicLink" placeholder="请输入背景音乐地址"/>
                            </el-form-item>
                            <el-form-item label="封面图片">
                                <el-input v-model="formData.extraMusicLink" placeholder="请输入封面图片地址"/>
                            </el-form-item>
                        </div>
                    </div>
                </el-collapse-transition>
                <el-collapse-transition>
                    <div v-show="isInternal">
                        <ul class="uploadArea">
                            <li>
                                <el-upload
                                    drag
                                    :action="formData.internalMusicLink"
                                >
                                    <div class="icon--music">
                                        <svg-icon iconName="music"/>
                                    </div>
                                    <p class="icon--text">背景音乐</p>
                                </el-upload>
                            </li>
                            <li>
                                <el-upload
                                    drag
                                    with-credentials
                                    name="fengmian"
                                    :action="formData.internalImgLink"
                                    :auto-upload="true"
                                    :show-file-list="false"
                                    :limit="1"
                                    :before-upload="beforeAvatarUpload"
                                    :on-exceed="handleAvatarExceed"
                                    :on-success="handleAvatarSuccess"
                                >
                                    <div class="icon--fengmian">
                                        <svg-icon iconName="fengmian"/>
                                    </div>
                                    <p class="icon--text">封面图片</p>
                                </el-upload>
                            </li>
                        </ul>
                    </div>
                </el-collapse-transition>
                <div class="switch--box">
                    <lc-switch v-model="isInternal"/>
                    <span>使用本地文件上传</span>
                </div>

                <div class="btnwrap">
                    <el-button type="primary" size="medium" @click.native="submit">确认</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'Article',
    data () {
        return {
            text: '夜泊秦淮近酒家，商女不知亡国恨',
            isInternal: true,
            rules: {
                title: [
                    {
                        trigger: 'blur',
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('哦？你好像没输入文章标题呀!'))
                            } else if (/[\u4e00-\u9fa5]/gm.test(value)) {
                                callback()
                            } else {
                                callback(new Error('你好像在乱输入，文章标题为中文汉字哦!'))
                            }
                        }
                    }
                ],
                content: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请开始编辑文章内容!'))
                            } else callback()
                        }
                    }
                ]
            },
            formData: {
                title: '', // 文章标题
                seo: '', // seo 关键字
                content: '', // 文章内容
                extraMusicLink: '', // 外部音乐连接
                internalMusicLink: '', // 内部音乐地址
                internalImgLink: 'https://jsonplaceholder.typicode.com/posts/', // 图片上传地址
            }
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

        handleAvatarSuccess (response, file, fileist) {
            console.log(response)
            console.log(file)
        },

        handleAvatarExceed (files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
        },

        submit () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const data = {
                        ...this.formData
                    }

                    this.$http.post('saveArticle').then(data => {
                        
                    })
                }
            })
        },
        
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/article.scss';
</style>
