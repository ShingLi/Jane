const mongoose = require('mongoose')
module.exports = (Schema, model) => {
	const commentSchema = new Schema({
		comment_blog_id: {
			type: ObjectId,
			required: true,
			default: '',
			validate: {
				validator: val => mongoose.isValidObjectId(val),
				message: '文章id不能为空！'
			}
		},
		comment_create_time: {
			type: String,
			default: + new Date()
		},
		comment_user_name: {
			type: String,
			default: '',
			required: true,
			validate: {
				validator: val => val.length != '' 
			},
			message: '用户名不能为空!'
		},
		comment_user_email: {
			type: String,
			default: ''
		},
		comment_user_id: String,
		comment_user_avatar: String,
		comment_user_name: String,
		comment_user_ip: String,
		comment_user_content: {
			type: String,
			required: true,
			validate: {
				validator: val => val.length != '' 
			},
			message: '评论内容不能为空！'
		},
		comment_responses: Array,
	})

	return model('comment', commentSchema)
}