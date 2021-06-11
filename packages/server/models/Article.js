module.exports = (Schema, model) => {
    const aritcleSchema = new Schema ({
        // 文章标题
        title: {
            type: String,
            required: true,
            default: ''
        },
        // 文章seo关键字
        seo: {
            type: String,
            default: ''
        },
        // 文章内容
        content: {
            type: String,
            required: true,
            default: ''
        },
        // 文章背景音乐地址
        musicUrl: {
            type: String,
            default: ''
        },
        // 文章封面图片
        picUrl: {
            type: String,
            default: ''
        },
        // 文章创建时间
        createTime: {
            type: String,
            default: '',
            required: true,
        },
        // 文章更新时间
        updatedTime: {
            type: String,
            default: '',
        },
        // 阅读数
        readNum: {
            type: Number,
            default: 0,
        },
        // 喜欢数
        likeNum: {
            type: Number,
            default: 0,
        },
    })

    return model('Article', aritcleSchema)
}