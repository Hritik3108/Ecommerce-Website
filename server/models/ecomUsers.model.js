const mongoose = require('mongoose')

const {Schema} = mongoose
const {ObjectId} = Schema.Types

const userSchema = new Schema({
    fullName:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    shippingAddress:{
        type: String,
        default:null
    },
    orders:[
        {
            type: ObjectId,
            ref: "order"
        }
    ],
    wishlist:[
        {
            type: ObjectId,
            ref: "products",
            default: [],
        }
    ],
    role:{
        type: String,
        default:"USER",
    },
})
const userModel = mongoose.model("ecomUsers",userSchema); 
module.exports = userModel;