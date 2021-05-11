const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
	fieldname: String,
    originalname: String,
    mimetype: String,
    filename: String,
    path: String,
    date: {
        type: Date,
        default: new Date().toLocaleString()
    }
})

module.exports = mongoose.model('upload', uploadSchema)