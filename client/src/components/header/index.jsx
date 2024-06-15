import logo from '../../img/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../util/userSlice';

import axios from 'axios'
import {loadProducts, setSearch} from '../../util/productsSlice'
import { useEffect, useState } from 'react';
import Loading from '../loading';
import Message from '../message';

const Header = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const[activePath,setActivePath]=useState('home')
    const { productsInCart, activeSession, userName, role, searchValue } = useSelector((store) => ({
        productsInCart: store.cart.items.length,
        activeSession: store.user.sessionActive,
        userName: store.user.sessionActive ? store.user.user.fullName : '',
        role: store.user.sessionActive ? store.user.user.role: '',
        searchValue: store.products.searchValue,
    }));

    function handleOnClickLogout(){
        // console.log('logout')
        dispatch(logoutUser());
        navigate('/login')
    }

    function handleNavigate(path){
        navigate(path)
    }

    function handleSectionNavigate(sectionId) {
        navigate('/allProduct', { state: { sectionId } });
    }

    function handleActiveNav(path){
        setActivePath(path)
    }

    // ==========================================================================================================
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    async function fetchProducts(){
        const config={
        headers: { 
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };
    await axios.get('/ecom/products',config)
        .then(response=>{
            dispatch(loadProducts(response.data));
            setLoading(false);
    }).catch(function(err){
        setLoading(false);
        setError('No products available');
        console.log(err)})
    }

    useEffect(()=>{
        fetchProducts();
        setLoading(true)
    },[])

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Message message={error} type="error" />;
    }

    
    // ==========================================================================================================

    function handleSearch(e){
        e.preventDefault();
        console.log('header',searchValue)
        navigate(`/search?search=${searchValue}`);
    }

    const handleChangeInSearchValue = (value) => {
        dispatch(setSearch(value));
    }

    return (
        <>
            <div id="header">
            <div id="container-header" className="container-fluid">
                <div id="header-top" className="row justify-content-md-center">
                <div className="col">
                    <img src={logo} alt="logo-img" className="logo" onClick={()=>navigate('/')}/>
                </div>

                <div className="col">
                    <form className="d-flex" onSubmit={handleSearch}>
                    <input 
                        className="search-input" 
                        type="search" 
                        placeholder="Product name, Category name, etc" 
                        aria-label="Search" 
                        value={searchValue}
                        onChange={(e)=>handleChangeInSearchValue(e.target.value)}
                    />
                    <button className="search-btn" type="submit">Search</button>
                    </form>
                </div>

                <div id="header-top-col-3" className="col">
                    {activeSession?<span className='header-userName'>Hi! {userName}</span>:''}
                        {
                        activeSession?
                        <div className="profileIcon-div dropdown">
                            <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon id='profile-icon' className='user-icon  fa-fw' icon={faUser}/> 
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                role!=="USER"?
                                <li className='nav-li' onClick={()=>handleNavigate('/dashboard')}>
                                    <div className="dropdown-item">Dashboard</div>
                                </li>
                                :
                                ''
                                }
                                {
                                role!=="USER"?
                                <li className='nav-li' onClick={()=>handleNavigate('/manageproducts')}>
                                    <div className="dropdown-item">Manage Products</div>
                                </li>
                                :
                                ''
                                }
                                {
                                role!=="USER"?
                                <li className='nav-li' onClick={()=>handleNavigate('/manageusers')}>
                                    <div className="dropdown-item">Manage Users</div>
                                </li>
                                :
                                ''
                                }
                                {
                                role!=="USER"?
                                <li className='nav-li' onClick={()=>handleNavigate('/manageorders')}>
                                    <div className="dropdown-item">Manage Orders</div>
                                </li>
                                :
                                ''
                                }
                                <li className='nav-li' onClick={()=>handleNavigate('/myprofile')}>
                                    <div className="dropdown-item">My Profile</div>
                                </li>
                                <li className='nav-li' onClick={()=>handleNavigate('/myorders')}>
                                    <div className="dropdown-item">My Order</div>
                                </li>
                                <li className='nav-li' onClick={()=>handleNavigate('/wishlist')}>
                                    <div className="dropdown-item">Wishlist</div>
                                </li>
                                {
                                activeSession?
                                <li className='nav-li' onClick={handleOnClickLogout}>
                                    <div className="dropdown-item">Logout</div>
                                </li>
                                :
                                <li className='nav-li' onClick={()=>navigate('/login')}>
                                    <div className="dropdown-item">Login</div>
                                </li>
                                }
                            </ul>
                        </div>
                        :
                        <button id="login-btn" className="btn custom-btn" onClick={()=>navigate('/login')}>
                        login
                        </button>    
                        }

                    

                        <div className="nav-link" onClick={()=>navigate('/cart')}> 
                        <FontAwesomeIcon id='cart-icon' className="cart fa fa-shopping-cart fa-fw fa-lg" icon={faCartShopping} />
                            <span className='cart-item-number text-center'>
                                <sup>{productsInCart}</sup>
                            </span>
                        </div> 
                </div>
            </div>
                <div className="row justify-content-md-center">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid justify-content-center">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                                <div id="navbarSupportedContent" className="collapse navbar-collapse flex-grow-0">
                                <ul className="navbar-nav text-center">
                                <li className="nav-item">
                                    <div className={`nav-link ${activePath=='home'?'active':''}`} aria-current="page" onClick={()=>{setActivePath('home');handleNavigate('/')}}>Home</div>
                                </li>
                                
                                
                                <li className="nav-item">
                                    <div className={`nav-link ${activePath=='allproduct'?'active':''}`} onClick={()=>{setActivePath('allproduct');handleNavigate('/allProduct')}}> All Products</div>
                                </li>
                                
                                
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Women
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className='nav-li' onClick={()=>handleNavigate('/allProduct')}><div className="dropdown-item" href="/allProduct">All products</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('dress-section')}><div className="dropdown-item">Dresses</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('pants-section')}><div className="dropdown-item">Pants</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('skirt-section')}><div className="dropdown-item">Skirts</div></li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Men
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className='nav-li' onClick={()=>handleNavigate('/allProduct')}><div className="dropdown-item" href="/allProduct">All products</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('shirt-section')}><div className="dropdown-item" >Shirts</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('pants-section')}><div className="dropdown-item" >Pants</div></li>
                                    <li className='nav-li' onClick={()=>handleSectionNavigate('hoodie-section')}><div className="dropdown-item" >Hoodies</div></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a className={`nav-link ${activePath=='kids'?'active':''}`} onClick={()=>{setActivePath('kids');handleSectionNavigate('kids-section')}}> Kids</a>
                                </li>

                                <li className="nav-item">
                                    <a className={`nav-link ${activePath=='contact'?'active':''}`} onClick={()=>{setActivePath('contact');handleNavigate('/contact')}}> Contact</a>
                                </li>
                                
                                </ul>
                                
                            </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Header;