const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    tourname: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    user: { 
        type: mongoose.ObjectId, 
        ref: 'Usuario'
    }

});
const Image = mongoose.model('Image', ImageSchema)
module.exports= Image;