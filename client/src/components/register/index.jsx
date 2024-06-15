import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../util/userSlice";
import {useNavigate} from 'react-router-dom'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[registerForm,setRegisterForm] = useState({
        fullName:'',
        phoneNumber:'',
        email:'',
        password:''
    })

    async function handleSubmit(e){
        e.preventDefault();
        const body={
            fullName:registerForm.fullName,
            phoneNumber:registerForm.phoneNumber,
            email:registerForm.email,
            password:registerForm.password
          }
        await axios.post('/ecom/register',body,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((response) => {
            if(response.status===200){
                sessionStorage.setItem('token',response.data.accessToken)
                dispatch(addUser(response.data));
                navigate('/')
            } 
          }).catch(function (error){
              console.log(error);  
          })
    }

    function handleChange(event){
        const {name,value}=event.target
        setRegisterForm(prev => ({
            ...prev,
            [name]:value
        }));
    }

    return (
        <>
        <div className="container-fluid loggin-container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex flex-column justify-content-md-center align-items-center">
                            
                            <div className="col-md-4">
                                <label htmlFor="fullName" className="form-label fw-bold">Full Name:</label>
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    className="form-control" 
                                    placeholder="Your Name"
                                    name="fullName"
                                    value={registerForm.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="col-md-4">
                                <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number:</label>
                                <input 
                                    type="number" 
                                    id="phoneNumber" 
                                    className="form-control" 
                                    placeholder="+91 XXXXX XXXXX"
                                    name="phoneNumber"
                                    value={registerForm.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="e-mail" className="form-label fw-bold">E-mail:</label>
                                <input 
                                    type="email" 
                                    id="e-mail" 
                                    className="form-control" 
                                    placeholder="Enter your E-mail"
                                    name="email"
                                    value={registerForm.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="password" className="form-label fw-bold">Password:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control" 
                                    placeholder="Enter your Password" 
                                    name="password"
                                    value={registerForm.password}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className="col-md-4 d-grid gap-2 sub-btn">
                                <button type="submit" className="btn custom-btn btn-block">Register</button>
                            </div>
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;