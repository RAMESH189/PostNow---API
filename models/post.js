const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        maxlength:500
    },
    image: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);