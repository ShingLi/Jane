module.exports = (Schema, model) => {
    
    const uploadSchema = new Schema({
        upload_field_name: String,
        upload_original_name: String,
        upload_mimetype: String,
        upload_filename: String,
        upload_path: String,
        upload_date: {
            type: String,
            default: new Date().toLocaleString()
        }
    })

    return model('upload', uploadSchema)
}