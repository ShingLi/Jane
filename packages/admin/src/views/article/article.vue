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
                <el-form-item prop="value">
                    <div class="markdown">
                    <mavon-editor
                        v-model="formData.value"
                        :subfield="false"
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
                                    :action="formData.internalImgLink"
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

                <el-button type="primary" size="medium" icon="el-icon-check" @click.native="submit">确认</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import Tag from 'components/Tag/Tag'

export default {
    name: 'Article',
    components: {
        Tag
    },
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
                            console.log(value)
                            if (!value) {
                                callback(new Error('哦？你好像没输入文章标题呀。'))
                            } else if (/[\u4e00-\u9fa5]/gm.test(value)) {
                                callback()
                            } else {
                                callback(new Error('你好像在乱输入，文章标题为中文汉字哦'))
                            }
                        }
                    }
                ],
                value: [
                    {
                        required: true,
                        message: '请开始编辑内容'
                    }
                ]
            },
            formData: {
                title: '',
                value: '',
                extraMusicLink: '',
                internalMusicLink: '',
                internalImgLink: ''
            }
        }
    },
    
    methods: {
        
        submit () {
            this.$refs.ruleForm.validate((valid) => {
                console.log(valid)
                if (valid) {

                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/article.scss';
</style>
