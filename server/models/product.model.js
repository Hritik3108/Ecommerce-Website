const mongoose = require('mongoose')

const {Schema} = mongoose

const productSchema = new Schema({
    cardImage:{
        type: String,
        require: true
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    category:[{
        type: String,
        required: true
    }],
    color:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }
})
const productModel = mongoose.model("products",productSchema); 
module.exports = productModel;