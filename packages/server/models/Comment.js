module.exports = (Schema, model) => {

	const commentSchema = new Schema({
		id: String,
		createTime: String,
        uname: String,
        avatar: String,
        content: String,
	})

	return model('comment', commentSchema)
}