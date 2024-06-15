const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config({path:'./process.env'});

const app = express()

app.use(express.json())
app.use(cors())
app.use(cors({
    origin:'http://localhost:5173'
}))

app.use(express.static('tmp'))

app.listen(5100,()=>{
    console.log('server started')
})

const route = require('./routes/users.routes') 
app.use(route)

const productRoute = require('./routes/product.routes')
app.use(productRoute)

const paymentRoute = require('./routes/payment.routes')
app.use(paymentRoute)

const orderRoute = require('./routes/orders.routes')
app.use(orderRoute)

mongoose.connect(process.env.DATABASE);

const db=mongoose.connection;
db.on('open',()=>{
    console.log('Connection to database successful');
});
db.on('error',()=>{
    console.log('Connection with database failed');
});