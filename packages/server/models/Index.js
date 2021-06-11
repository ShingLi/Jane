module.exports = (Schema, model) => {
    
    const indexSchema = new Schema({
        recordNumber: String,
        ICPwebsit: String,
        indexDesc: String,
    })

    return model('Index', indexSchema)
}