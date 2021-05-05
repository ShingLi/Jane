<template>
    <div class="article">
        <Tag :text="text"/>
        <div class="articlewrap">
            <el-input placeholder="请输入文章标题"
                clearable
                prefix-icon="el-icon-paperclip"
                class="title"
                type=”text“
                v-model="formData.title"
            />
            <div class="markdown">
                <mavon-editor
                    v-model="formData.value"
                    :subfield="false"
                />
            </div>
            <ul class="uploadArea">
                <li>
                    <el-upload
                        drag
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
                    >
                        <div class="icon--fengmian">
                            <svg-icon iconName="fengmian"/>
                        </div>
                        <p class="icon--text">封面图片</p>
                    </el-upload>
                </li>
            </ul>
        </div>
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
            formData: {
                title: '',
                value: ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './scss/article.scss';
</style>
