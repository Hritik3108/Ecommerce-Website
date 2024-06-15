import './editUser.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loading from "../loading";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditUser = () => {
    const token = useSelector((store) => store.user.token);
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        shippingAddress: '',
    });
    const [error, setError] = useState('');

    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

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
                const userResponse = await axios.get(`/ecom/getuser/${userId}`, config);
                setUser({ ...userResponse.data });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    async function handleUpdate() {
        setLoading(true);
        try {
            await axios.put(`/ecom/updateUser/${userId}`, user, config);
            setLoading(false);
            navigate('/manageusers');
        } catch (error) {
            console.error("Error updating data:", error.message);
            setError('Failed to update user details.');
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="edit-user-container">
            <h2 className="text-center my-4">Edit User</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="edit-user-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Shipping Address</label>
                    <input
                        type="text"
                        name="shippingAddress"
                        value={user.shippingAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
