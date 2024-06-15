import './manage.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from '../loading'
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const token = useSelector((store)=>store.user.token);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await axios.get("/ecom/orders",config);
                setOrders(ordersResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    function handleEdit(orderId) {
        console.log('edit', orderId);
        navigate(`/editOrder?orderId=${orderId}`);
    }

    async function handleDelete(orderId){
        // console.log('delete orderId:', orderId);
        setLoading(true);
        try {
            const ordersResponse = await axios.delete(`/ecom/deleteorder/${orderId}`, config);
            setOrders(ordersResponse.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error deleting order:", error.message);
            setLoading(false);
        }
    }

    

    return (
        <div className='container-fluid table-container'>
        <div className='row'>
            <div className='col-12'>
                <h2 className='text-center my-4'>Manage Orders</h2>
                <div className="table-responsive">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr className="table-heading">
                                <th>Index</th>
                                <th>Order Id</th>
                                <th>Customer Id</th>
                                <th>PayerId</th>
                                <th>PaymentId</th>
                                <th>Time</th>
                                <th>Total Amount</th>
                                <th>Delhivery</th>
                                <th>Status</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead> 
                        <tbody> 
                            {orders.slice().reverse().map((order,index) => (
                                <tr key={order._id}>
                                    <td>{index+1}</td>
                                    <td>{order._id}</td>
                                    <td>{order.orderBy}</td>
                                    <td>{order.payerId}</td>
                                    <td>{order.paymentId}</td>
                                    <td>{order.time}</td>
                                    <td>$ {order.totalAmount}</td>
                                    <td>{order.delhivery}</td>
                                    <td className={`${order.status==0?'failed-text':'success-text'}`}>{order.status==0?'Failed':'Success'}</td>
                                    <td><button className="btn btn-warning btn-sm" onClick={()=>handleEdit(order._id)}>Edit</button></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(order._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Orders;