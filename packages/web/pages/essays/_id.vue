<template>
    <div class="article">
        <!-- <Processbar /> -->
        <div class="back" @click="$router.push({ path: '/record.html' })">
            <svg-icon iconClass="back_1" />
        </div>
        <div class="scrollWrap">
            <section>
                <div class="header">
                    <h1 class="title">{{ title }}</h1>
                    <div class="stuff">
                        <span>2021年/04/14</span>
                        <span v-if="readNum">阅读 {{ readNum }}</span>
                        <span v-if="true">字数 {{ 111 }}</span>
                        <span>评论 {{ comment }}</span>
                        <span>喜欢{{ likeNum }}</span>
                    </div>
                </div>
                <div class="content">
                    <div v-html="rendered"></div>
                </div>
                <div class="comments">
                    <div class="userInfo">
                        <input type="text" placeholder="Name" v-model="uname">
                        <input type="text" placeholder="Email" v-model="uemail">
                    </div>
                    <textarea class="textarea" :placeholder="textPlaceholder" v-model="textarea"></textarea>
                    <div class="confirm-box">
                        <el-button size="medium" icon="el-icon-s-promotion" @click="submit">SUBMIT</el-button>
                        <p class="desc"></p>
                    </div>

                </div>
                <Comment class="comment"/>
            </section>
        </div>
    </div>
</template>
<script>

import markdown from "~/plugins/markdown"

export default {
    name: 'essay',

    async asyncData ({ $axios, params }) {
        const responseData = await $axios.get('getArticle', {
            params:{
                id: params.id
            }
        })

        console.log('responseData===>', responseData)
        let rendered = markdown.render(responseData.content)
        return {
            ...responseData,
            comment: '',
            rendered,
            articleId: params?.id ?? ''
        }
    },

    data () {
        return {
            isBgColor: false,
            loading: false, // 评论发送
            textPlaceholder: '纵使诗和远方不在眼前！每一天都要开开心心，不是吗？',
            uname: '',
            uemail: '',
            textarea: ''
        }
    },
    
    mounted () {
        
    },

    methods: {
        async submit () {
            const DATA = {
                uname: this.uname,
                content: this.textarea,
                articleId: this.articleId
            }
            const responseData = await this.$axios.post('/submitComment', DATA)
        }
    },
}
</script>
<style lang="scss" scoped>
    .article{
        background-color: #fff;
        // transition: all .4s ease-in-out;

        .back{
            position: fixed;
            top: 40px;
            left: 50px;
            cursor: pointer;
            ::v-deep .icon{
                width: 36px;
                height: 36px;
            }
        }
        .scrollWrap{
            background-color: #fff;
            section{
                width: 800px;
                margin: auto;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                padding-bottom: 30px;
                .header{
                    h1{
                        padding: 80px 0 25px;
                        font-size: 45px;
                        color: #333;
                        // font-family: fang;
                    }
                    .stuff{
                        margin-top: 5px;
                        display: flex;
                        align-items: center;
                        span{
                            font-size: 13px;
                            color: #6a737d;
                            line-height: 22px;
                            margin-right: 10px;
                            // font-family: jane;
                        }
                    }
                }
                .content{
                    margin-top: 45px;
                    flex: 1;
                    ::v-deep pre{
                        font-size: 15px;
                    }
                    div, p {
                        // font-family: Fang;
                        font-size: 20px;
                        // font-weight: 600;
                        line-height: 25px;
                    }
                }
                .comments{
                    position: relative;
                    margin-top: 35px;
                    border-radius: 5px;
                    padding: 16px 12px 10px;
                    border: 1px solid #ebebeb;
                    .userInfo{
                        display: flex;
                        margin-bottom: 15px;
                        font-size: 0;
                        input{
                            width: 300px;
                            outline: none;
                            padding-left: 7px;
                            font-size: 16px;
                            height: 28px;
                            line-height: 27px;
                            background-color: transparent;
                            border-bottom: 1px dashed #f0f0f0;
                            transition: all .3s linear;
                            font-style: italic;
                            &:last-child{
                                margin-left: 30px;
                            }
                            &::-webkit-input-placeholder{
                                color: #bbb;
                            }
                            &:focus{
                                border-bottom: 1px dashed #b9b9b9;
                            }
                            &:focus::-webkit-input-placeholder{
                                color: #888;
                            }
                        }
                    }
                    .textarea{
                        position:relative;
                        height: 180px;
                        width: 100%;
                        outline: none;
                        resize: none;
                        padding: 16px;
                        border-radius: 4px;
                        color: #333;
                        font-size: 15px;
                        border: 1px dashed #eee;
                        background-color: transparent;
                        transition: all .3s ease-in-out;
                        background-position: bottom right;
                        background-repeat: no-repeat;
                        &::-webkit-input-placeholder{
                            color: #bbb;
                        }
                        &:focus{
                            border: 1px dashed #b9b9b9;
                        }
                        &:focus::-webkit-input-placeholder{
                            color: #888;
                        }
                    }
                    .confirm-box{
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                    }
                    .desc{
                        font-size: 14px;
                        color: #F56C6C;
                    }
                    .chahua{
                        position: absolute;
                        bottom: 40px;
                        ::v-deep .icon{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
                .comment{
                    margin-top: 60px;
                }
            }
        }
    }
</style>