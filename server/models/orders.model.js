const mongoose = require('mongoose')

const {Schema} = mongoose
const {ObjectId} = Schema.Types

const orderSchema = new Schema({
    orderBy:{
        type: ObjectId,
        ref: "ecomUsers",
    },
    paymentId:{
        type:String,
        required:true,
    },
    payerId:{
        type:String
    },
    time:{
        type:String,
        required:true,
    },
    products:[],
    delhivery:{
        type:String,
        required:true,
    },
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
    }
})
const orderModel = mongoose.model("order",orderSchema); 
module.exports = orderModel;