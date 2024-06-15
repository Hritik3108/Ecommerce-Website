import { useState } from "react";
import Login from "../login";
import './auth.css';
import Register from "../register";

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <div className="tabs-container">
            <div className="tab-buttons">
                <button className={activeTab === 'login' ? 'active' : ''} onClick={() => handleTabClick('login')}>Login</button>
                <button className={activeTab === 'register' ? 'active' : ''} onClick={() => handleTabClick('register')}>Register</button>
            </div>
            <div className="tab-content">

            {
            activeTab === 'login' && 
                <div className='tab-1-div'>
                    <Login />
                </div>
            }
            {
            activeTab === 'register' && 
                <div className='tab-2-div'>
                    <Register/>
                </div>
            }

            </div>
        </div>
    )
}

export default Auth;