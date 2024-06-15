const userModel = require('../models/ecomUsers.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

exports.login = (req,res) => {
    const {email,password} = req.body;
    userModel.findOne({email}).then(data=>{
        if(!data){
            return res.status(404).json({message:"Invalid Email"});
        }

        let isValidPassword = bcrypt.compareSync(password,data.password);
        if(!isValidPassword){
            res.status(403).send({message:"Invalid Password"});
        }

        let token = jwt.sign({id:data._id},"jwtlock",{expiresIn:"1h"});
        data.password=undefined;
        res.status(200).send({user:data,accessToken:token});
    })
}

exports.register = (req,res) =>{
    console.log(req.body.fullName)
    const {fullName,phoneNumber,email,password,shippingAddress} = req.body;
    const newUser = new userModel({
        fullName,phoneNumber,email,shippingAddress,password:bcrypt.hashSync(password,10)
    })

    userModel.findOne({email}).then(data=>{
        if(!data){

            newUser.save().then(data=>{
                let token = jwt.sign({id:data._id},'jwtlock',{expiresIn:"1h"});
                data.password=undefined;
                res.status(200).json({user:data,accessToken: token});
            }).catch(function(error){res.status(400).json('Internal Server Error')});
        
        }else{
            res.status(400).send({message:'User already exists!'});
        }
    }).catch(function(error){res.status(500).json({message: error.message})});
}

exports.updateUserData = async(req,res) => {
    await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true }).then(updatedUser=>{
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }).catch(function(error){res.status(500).json({message:error.message})});
}

exports.getAllUser = async(req,res) => {
    // console.log('user')
    try {
        const data = await userModel.find();
        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        data.forEach((user) => {
            user.password = undefined;
        });

        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUser = async(req,res) => {
    const userId = req.params.userId
    console.log('param',userId);
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = undefined;
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async(req,res) => {
    const userId = req.params.userId; 
    try {
        const updateUser = await userModel.findByIdAndUpdate(userId,req.body,{new:true});
        if (!updateUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId; 
    try {
        const deleteUser = await userModel.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        const users = await userModel.find();
        users.forEach((user) => {
            user.password = undefined;
        });
        res.status(200).send(users);
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
    
};


exports.contact = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });


    let email_Info = await transporter.sendMail({
        from: req.body.email,
        to: process.env.EMAIL_TO,
        subject: process.env.EMAIL_PASSWORD,
        text: req.body.message
    });

    res.status(200).json(email_Info);
}

// exports.addAdmin = (req,res) => {
//     const id='666b1c19e3df1cd7d55e5291'
//     console.log(id)

//     // const newAdmin = new adminModel({
//     //          adminUser: req.user._id
//     // })
//     // newAdmin.save().then(data=>{
//     //     if(!data){
//     //         res.send({message:'Something went wrong'});
//     //     }
//     //     res.send(data)
//     // }).catch(function(err){res.send(err)});

//     adminModel.findByIdAndUpdate(id,{
//         adminUser: req.user._id
//     },{
//         new: true //returns updated record
//     })
//     .populate("adminUser",'_id fullName')
//     .then(data=>{
//         console.log(data);
//         if(!data) {
//             res.status(404).json({message: "Data Not Found"});
//         }
//         res.send(data);
//     }).catch(function(error){res.send({message:error})})
// }