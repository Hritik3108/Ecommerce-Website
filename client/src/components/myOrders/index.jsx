import './myOrder.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateOrders } from '../../util/userSlice';
import Loading from '../loading';
import axios from 'axios';
import OrderCard from '../orderCard';

const MyOrders = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { orders, token } = useSelector((store) => ({
        token: store.user.token,
        orders: store.user.orders,
    }));

    async function fetchOrders() {
        setLoading(true);
        const config = {
            headers: { 
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json' 
            },
            withCredentials: true
        };
        try {
            const response = await axios.get(`/ecom/user/orders`, config);
            if (response.status === 201) {
                // console.log(response.data);
                dispatch(updateOrders(response.data));
                setTimeout(() => setLoading(false), 2000);
            } else {
                console.error('Error fetching orders:', response.status);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.error('Error fetching orders:', err.message);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container my-orders-container">
            <h2>My Orders</h2>
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.slice().reverse().map((order, index) => {
                        if(order.status==1){
                            return <OrderCard key={index} order={order}/>
                        }
                        return '';
                    })}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}

export default MyOrders;
