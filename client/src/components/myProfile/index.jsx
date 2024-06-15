import { useEffect, useState } from 'react';
import './myProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../loading';
import { updateUser } from '../../util/userSlice';

const MyProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);  
    const activeSession = useSelector((store) => store.user.sessionActive);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        shippingAddress: user.shippingAddress,
    });
    const [update,setUpdate] = useState(false);

    const token = useSelector((store) => store.user.token);

    async function handleUpdateUser(e) {
        e.preventDefault();
        setLoading(true);
        const config = {
            headers: { 
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json' 
            },
            withCredentials: true
        };
        try {
            const response = await axios.put('/ecom/user/update', formData, config);
            if (response.status === 200) {
                dispatch(updateUser(response.data));
                setTimeout(() => setLoading(false), 2000);
            } else {
                console.error('Error updating user:', response.status);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating user:', error.message);
        }
    }

    useEffect(() => {
        if (!activeSession) {
            navigate('/');
        }
    }, [activeSession, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="profile-container">
            {!activeSession ? (
                <div className="login-message">Login to see profile</div>
            ) : (
                <div className="profile-card">
                    <div className="profile-card-header">
                        <h2>My Profile</h2>
                    </div>
                    <div className="profile-card-body">
                        <form onSubmit={handleUpdateUser}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="fullName" 
                                    value={formData.fullName} 
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                                    disabled={!update}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="phoneNumber" 
                                    value={formData.phoneNumber} 
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} 
                                    disabled={!update}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                    disabled={!update}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="shippingAddress">Shipping Address</label>
                                <textarea 
                                    className="form-control" 
                                    id="shippingAddress" 
                                    value={formData.shippingAddress} 
                                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })} 
                                    disabled={!update}
                                />
                            </div>
                            <div className={`btn btn-save-update mt-3 me-2 ${update?'invisible':'visible'}`} onClick={()=>setUpdate(!update)}>Update Profile</div>
                            <button type="submit" className={`btn btn-update ms-5 ${update?'visible':'invisible'}`} onClick={()=>setUpdate(!update)}>Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProfile;
