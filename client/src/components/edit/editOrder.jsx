import './editOrder.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loading from "../loading";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditOrder = () => {
    const token = useSelector((store) => store.user.token);
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        totalAmount: '',
        status: '',
        delhivery: '',
    });
    const [error, setError] = useState('');

    const params = new URLSearchParams(location.search);
    const orderId = params.get('orderId');

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`/ecom/getorder/${orderId}`, config);
                setOrder({ ...orderResponse.data });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError('Error fetching order data.');
                setLoading(false);
            }
        };

        fetchData();
    }, [token, orderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    async function handleUpdate() {
        setLoading(true);
        try {
            await axios.put(`/ecom/updateorder/${orderId}`, order, config);
            setLoading(false);
            navigate('/manageorders');
        } catch (error) {
            console.error("Error updating data:", error.message);
            setError('Failed to update order details.');
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="edit-order-container">
            <h2 className="text-center my-4">Edit Order</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="edit-order-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="form-group">
                    <label>Total Amount</label>
                    <input
                        type="number"
                        name="quantity"
                        value={order.totalAmount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        name="status"
                        value={order.status==0?'Failed':'Success'}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Shipping Address</label>
                    <input
                        type="text"
                        name="shippingAddress"
                        value={order.delhivery}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Order</button>
            </form>
        </div>
    );
};

export default EditOrder;