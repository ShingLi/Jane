<template>
    <div class="article">
        <div class="tools">
            <template>
                <div class="icon--heart" @click="dolike" :class="{ bounce : like }">
                    <svg-icon :iconClass="like ? 'heart2' : 'heart1'"/>
                </div>
            </template>
        </div>
        <div class="scrollWrap">
            <section>
                <div class="header">
                    <h1 class="title">{{ title }}</h1>
                    <div class="stuff">
                        <span>{{ calcTimer(createTime) }}</span>
                        <span v-if="readNum">阅读 {{ readNum }}</span>
                        <span v-if="true">字数 {{ length }}</span>
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
                        <el-button size="medium" icon="el-icon-s-promotion" @click="submit" :loading="loading">SUBMIT</el-button>
                        <p class="desc"></p>
                    </div>

                </div>
                <Comment class="comment" :commentList="commentList"/>
            </section>
        </div>
    </div>
</template>
<script>

import markdown from "plugins/markdown"
import utils from 'plugins/utils'
import SvgIcon from '../../components/SvgIcon/SvgIcon.vue'

export default {
    components: { SvgIcon },
    name: 'essay',

    async asyncData ({ $axios, params }) {
        const responseData = await $axios.get('getArticle', {
            params:{
                id: params.id
            }
        })

        delete responseData.__v
        delete responseData._id

        // console.log('responseData===>', responseData)

        let rendered = markdown.render(responseData.content)
        
        return {
            ...responseData,
            comment: 0,
            rendered,
            length: 0,
            articleId: params?.id ?? ''
        }
    },

    async fetch ()  {
        const  { commentList }  = await this.$axios.get('/getComment', {
            params: {
                articleId: this.articleId ?? ''
            }
        })
        
        this.commentList = commentList
    },

    data () {
        return {
            isBgColor: false,
            loading: false, // 评论发送
            textPlaceholder: '纵使诗和远方不在眼前！每一天都要开开心心，不是吗？',
            uname: '',
            uemail: '',
            textarea: '',
            commentList: [], // 评论
            like: false
        }
    },

    mounted () {
        utils.bindEvent('scroll', () => {
            let scrollTop = (document.documentElement || document.body).scrollTop
            this.$store.commit('record/UPDATE_SCROLL_TOP', scrollTop)
        })
        
        this.initPageHeight()
    },

    methods: {
        async submit () {
            this.loading = true
            const DATA = {
                uname: this.uname,
                uemail: this.uemail,
                content: this.textarea,
                articleId: this.articleId
            }
            const { isOk } = await this.$axios.post('/submitComment', DATA)
            setTimeout(() => {
                this.loading = false
            }, 500)
            if (isOk) {
                this.uname = ''
                this.uemail = ''
                this.textarea = ''
                
                this.$fetch()
                this.initPageHeight()
            }
        },
        initPageHeight () {
            
            setTimeout(() => {
                if (process.client) {
                    this.$nextTick(() => {
                        this.$store.commit('record/UPDATE_PAGE_SCROLLHEIGHT', document.querySelector('.scrollWrap').scrollHeight)
                    })
                }
            }, 36)
        },
        calcTimer (timerstamp) {
            timerstamp = timerstamp - 0
            const year = new Date(timerstamp).getFullYear(),
                month = (new Date(timerstamp).getMonth() + 1) - 0  < 10
                    ? '0' + (new Date(timerstamp).getMonth() + 1)
                    : new Date(timerstamp).getMonth() + 1,
                date = new Date(timerstamp).getDate() - 0 < 10
                    ? '0' + new Date(timerstamp).getDate()
                    : new Date(timerstamp).getDate()
            return `${year}/${month}/${date}`

        },
        dolike () {
            this.like = !this.like
            
        }
        
    },
    head () {
        return {
            title: this.title,
            bodyAttrs: {
                class: 'essays-id'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .article{
        background-color: #fff;
        // transition: all .4s ease-in-out;

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
        .tools{
            position: absolute;
            left: 5vw;
            top: 80px;
            .icon--heart{
                width: 30px;
                height: 30px;
                cursor: pointer;
                &.bounce{
                    animation: bounce .3s ease-in-out;
                }
            }
        }
    }
    @keyframes bounce {
        10% {
            transform: translateY(-3px) scale(0.8);
        }
        40%{
            transform: translateY(-10px) scale(1.2);
        }
        80%{
            transform: translateY(3px) scale(1.1);
        }
        100%{
            transform: translateY(0px) scale(1);
        }
    }
</style>