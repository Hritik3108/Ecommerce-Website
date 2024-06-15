import './displayOrder.css'
import Loading from '../loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const DisplayOrder = () => {
    const [order,setOrder] = useState({})
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const token = useSelector((store)=>store.user.token);  

    async function fetchOrder(orderId){
        setLoading(true)
        const config = {
            headers: { 
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json' 
            },
            withCredentials: true
        };
        // console.log('orderId',orderId);
        await axios.get(`/ecom/user/order/${orderId}`,config).then((response)=>{
            if(response.status===201){
                setOrder({...response.data});
                setTimeout(() =>setLoading(false),3000);
            }else{
                console.error('Error fetching orders:', response.status);
                setLoading(false);
            }
        }).catch(function(err){setLoading(false);console.log(err.message)})
    }

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const orderId = params.get('orderId');
        // console.log(orderId)
        fetchOrder(orderId)
    },[])

    if (loading) {
        return <Loading />;
      }

    const {orderBy,paymentId,payerId,time,products,delhivery,totalAmount,status} = order  

    return(
        <div className="container order-details mt-5">
            <h2 className="mb-4 text-center">Order Details</h2>
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Order Information</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Order By:</strong> {orderBy}</p>
                            <p><strong>Payment ID:</strong> {paymentId}</p>
                            <p><strong>Payer ID:</strong> {payerId}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Order Time:</strong> {new Date(time).toLocaleString()}</p>
                            <p><strong>Delivery:</strong> {delhivery}</p>
                            <p><strong>Total Amount:</strong> ${totalAmount}</p>
                            <p><strong>Status:</strong> {status==0?'Pending Payment':'Payment Successful'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <h5 className="mb-0">Products</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <div key={index} className="col-md-6 product-item mb-3 d-flex align-items-center">
                                    {/* <img src={product.cardImage} alt={product.name} className="product-image img-thumbnail me-3" /> */}
                                    <div>
                                        <h6>{product.name}</h6>
                                        <p>Quantity: {product.quantity}</p>
                                        <p>Price: ${product.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found in this order.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayOrder;