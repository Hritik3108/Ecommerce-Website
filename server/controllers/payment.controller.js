const userModel = require('../models/ecomUsers.model');
const orderModel = require('../models/orders.model');
const productModel = require('../models/product.model')
const express = require('express');
const paypal = require('paypal-rest-sdk');
const querystring = require('querystring');
const mongoose = require('mongoose');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

exports.processPayment= async(req,res) => {
    const userId=req.user._id;
    let delhivery='';
    await userModel.findById(userId).then(data=>{
        if(!data){
            res.status(401).send({message:'Something went wrong!'})
        }
        if(data.shippingAddress==null){
            res.status(400).json({message:'Add Shipping Details'})
        }
        delhivery=data.shippingAddress;
    }).catch(function(error){res.status(500).send({message:error.message})})

    const checkoutProduct = req.body;

    if (!checkoutProduct || !Array.isArray(checkoutProduct)) {
        return res.status(400).json({ error: 'Invalid product IDs' });
    }
        
    let products = [];
    
    products = await Promise.all(checkoutProduct.map(async (productInCart) => {
        try {
            const product = await productModel.findById(productInCart.productsId);
            if (product) {
                return {
                    name: product.title,
                    sku: product._id,
                    price: product.price,
                    currency: "USD",
                    quantity: productInCart.quantity,
                };
            } else {
                console.error(`Product with id ${productInCart.productsId} not found`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching product with id ${id}: ${error.message}`);
            return null;
        }
    }));

    const total = (products.reduce((acc, product) => acc + (parseFloat(product.price)*product.quantity), 0).toFixed(2));
    
    // console.log(total);
    // console.log(userId)

    let data
    try {

        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "https://ecommerce-website-anru.onrender.com/ecom/payment/success",
                "cancel_url": "https://ecommerce-website-anru.onrender.com/ecom/payment/failed"
            },
            "transactions": [{
                "item_list": {
                    "items": products 
                },
                "amount": {
                    "currency": "USD",
                    "total": total
                },
                "description": "This is the payment description."
            }]
        };


        await paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                // console.log("Create Payment Response");
 
                const newOrder = new orderModel({
                    orderBy:userId,
                    paymentId:payment.id,
                    time:payment.create_time,
                    products:[...payment.transactions[0].item_list.items],
                    delhivery:delhivery,
                    totalAmount:payment.transactions[0].amount.total,
                    status:0
                })
               
                newOrder.save().then(order=>{
                    if(!order)res.status(400);
                }).catch(function(error){console.log({message:error.message})});

                data = payment;
                res.json(data);
            }
        });


    } catch (error) {
        console.log(error);
    }
}

exports.paymentSuccess= async(req,res) => {

    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        let order={};
        
        await orderModel.find({paymentId:paymentId})
        .then(data=>{
            order={...data[0]._doc}
        }).catch(function(error){console.log(error)})
        
        const total=order.totalAmount.toFixed(2);
        
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total
                }
            }]
        }


        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error)
                orderModel.findById(order._id).then(data=>{
                    if(!data){
                        console.log('Error occured');
                    }
                    const dataId=new mongoose.Types.ObjectId(data._id)
                    const stringId=dataId.toString();
                    const params = querystring.stringify({
                        orderId: stringId,
                        status: 'failed'
                    });
                    return res.redirect(`https://ecommerce-website-anru.onrender.com/ecom/orderfailed?${params}`);
                }).catch(function(err){console.log({message:err.message})});

                // return res.redirect("http://localhost:5173/failed");
            } else {
                const response = JSON.stringify(payment);
                const parsedResponse = JSON.parse(response);
                const transactions = parsedResponse.transactions[0];
                
                if(transactions.amount.total===total){
                    // console.log('payment successful');
                    orderModel.findByIdAndUpdate(order._id,{status:1,payerId:payerId}).then(data=>{
                        if(!data){
                            console.log('Error occured');
                        }
                        const dataId=new mongoose.Types.ObjectId(data._id)
                        const stringId=dataId.toString();
                        const params = querystring.stringify({
                            orderId: stringId,
                            status: 'success'
                        });
                        return res.redirect(`https://ecommerce-website-anru.onrender.com/ecom/orderplaced?${params}`);
                    }).catch(function(err){console.log({message:err.message})});

                    // return res.redirect("http://localhost:5173/success");
                }else{
                    return res.redirect("http://localhost:5173/failed");
                }
            }
        })


    } catch (error) {
        console.log(error);
    }
}

exports.paymentFailed= async(req,res) => {
    // console.log('failed')
    return res.redirect("http://localhost:5173/cart");
}
