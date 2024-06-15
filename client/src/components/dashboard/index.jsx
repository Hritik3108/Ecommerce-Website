import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import './dashboard.css';
import Loading from '../loading'

const Dashboard = () => {
    const token = useSelector((store)=>store.user.token);

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { 
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json' 
                },
                withCredentials: true
            };

            try {
                const usersResponse = await axios.get("/ecom/users",config);
                const ordersResponse = await axios.get("/ecom/orders",config);
                const productsResponse = await axios.get("/ecom/products",config);
                setUsers(usersResponse.data);
                setOrders(ordersResponse.data);
                setProducts(productsResponse.data);
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

    return (
        <div className="dashboard container mt-5">
            <h1 className="text-center mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-primary">
                        <div className="card-header">Users</div>
                        <div className="card-body">
                            <h5 className="card-title">{users.length}</h5>
                            <p className="card-text">Total registered users</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-success">
                        <div className="card-header">Orders</div>
                        <div className="card-body">
                            <h5 className="card-title">{orders.length}</h5>
                            <p className="card-text">Total orders placed</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card text-white bg-warning">
                        <div className="card-header">Products</div>
                        <div className="card-body">
                            <h5 className="card-title">{products.length}</h5>
                            <p className="card-text">Total products available</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">User List</div>
                        <ul className="list-group list-group-flush">
                            {users.slice().reverse().map(user => (
                                <li key={user._id} className="list-group-item">{user.name} - {user.email}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="card">
                        <div className="card-header bg-success text-white">Order List</div>
                        <ul className="list-group list-group-flush">
                            {orders.slice().reverse().map(order => (
                                <li key={order._id} className="list-group-item">Order ID: {order._id} - Status: {order.status?'Payment Successful':'Payment Failed'}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-header bg-warning text-white">Product List</div>
                        <ul className="list-group list-group-flush">
                            {products.slice().reverse().map(product => (
                                <li key={product._id} className="list-group-item">{product.title} - ${product.price}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
