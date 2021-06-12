module.exports = (Schema, model) => {

	const userSchema = new Schema({
		account: {
			type: String,
			required: [ true, '用户名不能为空!'],
			validate: {
				validator: username => {
					return username.length >= 1
				},
				message: `用户名最少1位!`
			}
		},
		password: {
			type: String,
			required: true,
			validate: {
				validator: pwd => {
					return pwd.length > 5
				},
				message: '密码不少于6位!'
			}
		},
		avatar: {
			type: String,
		},
		username: {
			type: String,
			default: '一片云'
		},
		admin: {
			type: Boolean,
			default: false,
		}
	})

	return model('user', userSchema)
}