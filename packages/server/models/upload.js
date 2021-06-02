module.exports = (Schema, model) => {
    
    const uploadSchema = new Schema({
        fieldname: String,
        originalname: String,
        mimetype: String,
        filename: String,
        path: String,
        date: {
            type: String,
            default: new Date().toLocaleString()
        }
    })

    return model('Upload', uploadSchema)
}