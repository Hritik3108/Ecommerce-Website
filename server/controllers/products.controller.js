const userModel = require('../models/ecomUsers.model');
const productModel = require('../models/product.model')
const express = require('express');

// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'tmp')
//     },
//     filename: (req,file,cb) => {
//         cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname))
//     }
// })

// const uploadImage = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000,
//     },
// })

exports.getWishlistItems = async(req,res) => {
    const userId=req.user._id
    let wishlist;
    await userModel.findById(userId).then(user=>{
        if(!user){
            res.status(400).send({message:'Something went wrong!!'})
        }
        wishlist=user.wishlist; 
    }).catch(function(error){res.status(500).json(error.message)});

    // console.log('wishlist',wishlist);

    let products = [];
    products = await Promise.all(wishlist.map(async (productId) => {
        try {
            const product = await productModel.findById(productId);
            if (product) {
                return product;
            } else {
                console.error(`Product with id ${productId} not found`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching product with id ${id}: ${error.message}`);
            return null;
        }
    }));

    // console.log(products)
    res.status(200).send(products);
}

exports.addToWishList = async(req,res) => {
    const productId=req.params.productId
    const userId=req.user._id
    userModel.findByIdAndUpdate(userId,{
        $push: {wishlist: productId}
    },{
        new: true //returns updated record
    })
    .then((user) => {
        if(!user) {
            console.log({message: "User Not Found"});
        }
        res.send(user);
    }).catch(err =>console.log({message: err.message}));
}

exports.removefromWishList = async(req,res) => {
    const productId=req.params.productId
    const userId=req.user._id
    userModel.findByIdAndUpdate(userId,{
        $pull: {wishlist: productId}
    },{
        new: true //returns updated record
    })
    .then((user) => {
        if(!user) {
            console.log({message: "User Not Found"});
        }
        res.send(user);
    }).catch(err =>console.log({message: err.message}));
}

exports.getOneProduct= (req,res) => {
    const id=req.params.id;
    // console.log(id);
    productModel.findById(id).then(data=>{
        if(!data){
            res.status(401).send({message:'No product found'});
        }
        res.status(200).send(data);
    }).catch(function(err){console.log(err.message)});
}

exports.saveShippingAddress = (req,res) => {
    const {firstName,lastName,phoneNumber,email,fullAddress,city,state,zipCode} = req.body;
    const newaddress = firstName+' '+lastName+' '+fullAddress+' '+city+' '+state+' '+zipCode+'. Contact No.-'+phoneNumber;
    // console.log(newaddress);
    
    userModel.findByIdAndUpdate(req.user._id,{shippingAddress:newaddress}).then(data=>{
        if(!data){
            res.state(401).send({message:"Something Went Wrong!"});
            }
            data.password=undefined;
            data.shippingAddress=newaddress;
            // console.log('data',data)
            res.send(data);
    }).catch(function(err){res.status(500).send({message:err.message})});
}

exports.getProducts = (req,res) => {
    productModel.find().then(data=>{
        if(!data){
            res.status(400).send({message:'Something went wrong!'})
        }
        res.status(200).send(data);
    }).catch(function(err){res.status(500).send({message:err.message})})
}

exports.addProduct = async(req,res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    const newData = {
        cardImage: req.file.filename,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating,
        category: req.body.category.split(', '),
        color: req.body.color,
        stock: req.body.stock,
    };

    const newProduct = new productModel(newData)
    newProduct.save().then(data=>{
        if(!data){
            res.status(400).send({message:'Something went wrong!'});
        }
        res.status(200).send(data);
    }).catch(function(err){res.status(500).send({message:err.message})});
}

exports.updateProduct = async (req, res) => {
    const productId = req.params.productId; 
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }
    try {
        const updateData = {
            cardImage: req.file.filename,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            rating: req.body.rating,
            category: req.body.category.split(', '),
            color: req.body.color,
            stock: req.body.stock,
        };

        const updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}


exports.removeProduct = async(req,res) => {
    const productId = req.params.productId; 
    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }
        const products = await productModel.find();
        res.status(200).send(products);
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}