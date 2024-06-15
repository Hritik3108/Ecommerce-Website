const orderModel = require('../models/orders.model');
const userModel = require('../models/ecomUsers.model');

exports.orderPlaced = async(req,res) => {
    const params = req.query;
    let order={};
    await orderModel.findById(params.orderId).then(data=>{
        if(!data){
            res.status(400).send({message:'Something went wrong!'});
        }
        order={...data};
    }).catch(function(error){res.status(500).send({ message: 'Internal Server Error' })});
    
    const {_id,orderBy,paymentId,time,products,delhivery,totalAmount,status,payerId} = order._doc;

    userModel.findByIdAndUpdate(orderBy,{
        $push: {orders: _id}
    },{
        new: true //returns updated record
    }).populate("orders",'_id fullName')
    .then((data) => {
        if(!data) {
            console.log({message: "User Not Found"});
        }
    }).catch(err =>console.log({message: err.message}));

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Placed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    width: 80%;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #4CAF50;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 10px 0;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Thank you for your purchase!</h1>
                <p>Your payment was successful. Here are your payment details:</p>
                <ul>
                    <li>Order ID: ${_id}</li>
                    <li>Order By: ${orderBy}</li>
                    <li>Payment ID: ${paymentId}</li>
                    <li>Payment Time: ${time}</li>
                    <li>Products:</li>
                    <ul>
                        ${products.map((product,index) => `<li> ${index+1}. ${product.name} (Quantity: ${product.quantity}, Price: ${product.price})</li><br/>`).join('')}
                    </ul>
                    <li>Delhivery: ${delhivery}</li>
                    <li>Total Amount: ${totalAmount}</li>
                    <li>Status: ${status?'Payment Successful':'Payment Pending'}</li>
                    <li>Payer ID: ${payerId}</li>
                </ul>
                <p><a href="http://localhost:5173/">Continue Shopping</a></p>
            </div>
        </body>
        </html>
    `);
};

exports.orderFailed = async (req, res) => {
    const params = req.query;
    let order = {};

    try {
        const data = await orderModel.findById(params.orderId);
        if (!data) {
            return res.status(400).send({ message: 'Something went wrong!' });
        }
        order = { ...data };
    } catch (error) {
        console.log({ message: error.message });
        return res.status(500).send({ message: 'Internal Server Error' });
    }

    const { _id, orderBy, paymentId, time, products, delhivery, totalAmount, status, payerId } = order._doc;

    userModel.findByIdAndUpdate(orderBy,{
        $push: {orders: _id}
    },{
        new: true //returns updated record
    }).populate("orders",'_id fullName')
    .then((data) => {
        if(!data) {
            console.log({message: "User Not Found"});
        }
    }).catch(err =>console.log({message: err.message}));

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Failed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .container {
                    width: 80%;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #f44336;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 10px 0;
                }
                a {
                    color: #4CAF50;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Order Failed to Place</h1>
                <p>We encountered an issue while processing your order. Here are the details:</p>
                <ul>
                    <li>Order ID: ${_id}</li>
                    <li>Order By: ${orderBy}</li>
                    <li>Payment ID: ${paymentId}</li>
                    <li>Payment Time: ${time}</li>
                    <li>Products:</li>
                    <ul>
                        ${products.map(product => `<li>${product.name} (Quantity: ${product.quantity}, Price: ${product.price})</li>`).join('')}
                    </ul>
                    <li>Delhivery: ${delhivery}</li>
                    <li>Total Amount: ${totalAmount}</li>
                    <li>Status: ${status?'Payment Successful':'Payment Failed'}</li>
                    <li>Payer ID: ${payerId}</li>
                </ul>
                <p><a href="http://localhost:5173/">Return to Shop</a></p>
            </div>
        </body>
        </html>
    `);
};

exports.getAllOrders = async(req,res) => {
    orderModel.find().then(orders=>{
        if(!orders){
            res.status(400).json({message:'Something went wrong'});
        }
        res.send(orders);
    }).catch(function(error){res.status(500).json({message:error.message})});
};

exports.getAllOrderOfUser = async (req,res) => {
    const userId = req.user._id
    console.log('user',userId);
    orderModel.find({orderBy:userId}).then(data=>{
        if(!data){
            res.status(400).send({message:"Something went wrong"});
        }
        // console.log(data);
        res.status(201).send(data);
    }).catch(function(error){res.status(500).send({message:error.message})});
};

exports.getOrder = async (req, res) => {
    const orderId = req.params.orderId; 
    const userId = req.user._id; 
    try {
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).send({ message: 'Something went wrong' });
        }

        if (order.orderBy.equals(userId)) {
            return res.status(201).send(order);
        }

        return res.status(404).json({ message: 'Order not found' });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId; 
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }
        const orders = await orderModel.find();
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId,req.body,{new:true});
        if (!updatedOrder) {
            return res.status(404).send({ message: 'Order not found' });
        }
        const orders = await orderModel.find();
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

exports.getOrderManage = async (req, res) => {
    const orderId = req.params.orderId;
    console.log('param', orderId);
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}