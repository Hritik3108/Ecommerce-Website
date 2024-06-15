import './manage.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const token = useSelector((store)=>store.user.token);
    const id = useSelector((store)=>store.user.user._id);

    const [users, setUsers] = useState([]);
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
            const config = {
                headers: { 
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json' 
                },
                withCredentials: true
            };

            try {
                const usersResponse = await axios.get("/ecom/users", config);
                setUsers(usersResponse.data.reverse()); // Reverse order of users
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

    function handleEdit(userId) {
        console.log('edit', userId);
        navigate(`/edituser?userId=${userId}`);
    }

    async function handleDelete(userId){
        setLoading(true);
        try {
            const userResponse = await axios.delete(`/ecom/deleteuser/${userId}`, config);
            setUsers(userResponse.data); 
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
                    <h2 className='text-center my-4'>Manage Users</h2>
                    <div className="table-responsive">
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr className="table-heading">
                                    <th>Profile</th>
                                    <th>UserId</th>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Shipping Address</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead> 
                            <tbody> 
                                {users.slice().reverse().map(user => {
                                    if(user._id===id){return ''}
                                    else return <tr key={user._id}>
                                        <td>{user.role}</td>
                                        <td>{user._id}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.shippingAddress}</td>
                                        <td><button className="btn btn-warning btn-sm" onClick={()=>handleEdit(user._id)}>Edit</button></td>
                                        <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(user._id)}>Delete</button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;
