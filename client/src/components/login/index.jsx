import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../util/userSlice";
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[loginForm,setLoginForm] = useState({
        email:'',
        password:''
    })
    

    async function handleSubmit(e){
        e.preventDefault();
        // console.log('login')
        const body={
            email:loginForm.email,
            password:loginForm.password
          }
          await axios.post('/ecom/login',body,
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
        setLoginForm(prev => ({
            ...prev,
            [name]:value
        }));
    }

    return (
        <>
        <div className="container-fluid loggin-container">
            {/* <h1 className="carousel-heading">Login</h1> */}
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex flex-column justify-content-md-center align-items-center">
                            <div className="col-md-4">
                                <label htmlFor="e-mail" className="form-label fw-bold">E-mail:</label>
                                <input 
                                    type="email" 
                                    id="e-mail" 
                                    className="form-control" 
                                    placeholder="Enter your E-mail"
                                    name="email"
                                    value={loginForm.email}
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
                                    value={loginForm.password}
                                    onChange={handleChange}
                                />
                            </div>
                        
                            <div className="col-md-4 d-grid gap-2 sub-btn">
                                <button type="submit" className="btn custom-btn btn-block">Login</button>
                            </div>
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;