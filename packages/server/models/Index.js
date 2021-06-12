module.exports = (Schema, model) => {
    
    const indexSchema = new Schema({
        id: {
            type: Number,
            default: 1
        },
        ICPNumber: String,
        ICPwebsit: String,
        IndexDesc: String,
        CreateTime: String,
    })

    return model('home', indexSchema)
}