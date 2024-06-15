import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../../util/userSlice";
import axios from 'axios';

const Shipping = () => {
    const user = useSelector((store)=>store.user.user);
    const token = useSelector((store)=>store.user.token);
  
    const dispatch = useDispatch();

    const [dontShowForm,setDontShowForm] = useState(true)
    const [dontShowAddress,setDontShowAddress] = useState(true)
    const [shippingAddress,setShippingAddress]=useState({
        firstName:"",
        lastName:"",
        phoneNumber:"",
        email:"",
        fullAddress:"",
        city:"",
        state:"",
        zipCode:""
      })
    
    async function saveShippingAddress(e){
    e.preventDefault();
    const bodyParameters = {
        firstName:shippingAddress.firstName,
        lastName:shippingAddress.lastName,
        phoneNumber:shippingAddress.phoneNumber,
        email:shippingAddress.email,
        fullAddress:shippingAddress.fullAddress,
        city:shippingAddress.city,
        state:shippingAddress.state,
        zipCode:shippingAddress.zipCode          
    }
    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    await axios.post('/ecom/saveaddress',bodyParameters,config)
        .then((response)=>{
        if(response.status===200){
            dispatch(updateUser(response.data));
            setDontShowAddress(!dontShowAddress);    
        }
    }).catch(function(error){console.log(error)});
    }

    function handleChange(event){
        const {name,value} = event.target;
        setShippingAddress((prev)=>({
            ...prev,
            [name]:value,
        }));
    }  
    
    useEffect (()=>{
        if(user.shippingAddress!=null)setDontShowAddress(false);
      },[])

    return (
        <>
            <div className="card">
                  <div className="card-header">
                      Shipping Address
                  </div>
                  <div className="card-body"> 
                      {/* //delivery             */}

                    {
                    user.shippingAddress==null && dontShowForm?
                    <div className="empty-cart-title text-center">
                        No Shipping Addess Saved
                        <button className="btn save-btn m-2" onClick={()=>setDontShowForm(!dontShowForm)}>+Add Address</button>
                    </div> 
                    : 
                      <div>
                        {
                        dontShowAddress?
                    <form onSubmit={saveShippingAddress}>
                      <div className="container-fluid">
                          
                          <div className="row ship-row">
                            
                            <div className='firstName-div col-12 col-lg-6'>
                              <label htmlFor="firstName" className="label-cls">
                                Firstname<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name='firstName'
                                value={shippingAddress.firstName}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="John"
                                required
                              />
                            </div>
                            <div className='lastName-div col col-lg-6'>
                              <label htmlFor="lastName" className="label-cls">
                                Lastname<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name='lastName'
                                value={shippingAddress.lastName}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                              />
                            </div>

                          </div>{/* Name Row closing div */}

                          <div className="row ship-row">

                          <div className='phoneNumber-div col-12 col-lg-6'>
                              <label htmlFor="phoneNumber" className="label-cls">
                                Phone Number<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="Number"
                                id="phoneNumber"
                                name='phoneNumber'
                                value={shippingAddress.phoneNumber}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="+91 XXXXX XXXXX"
                                required
                              />
                          </div>

                          <div className='email-div col-12 col-lg-6'>
                              <label htmlFor="email" className="label-cls">
                                 Email<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="text"
                                id="email"
                                name='email'
                                value={shippingAddress.email}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="johndoe@example.com"
                                required
                              />
                          </div>

                          </div>{/* phoneNumber email row closing div */}
                      
                          <div className="row ship-row">

                          <div className='fullAddress-div col'>
                              <label htmlFor="fullAddress" className="label-cls">
                                 Full Address<span className='required-sign'>*</span>
                              </label>
                              <textarea
                                id="fullAddress"
                                name='fullAddress'
                                value={shippingAddress.fullAddress}
                                className="form-control"
                                onChange={handleChange}
                                required
                              />
                          </div>    

                          </div>{/* Full Address row closing div */}

                          <div className="row ship-row">

                          <div className='city-div col-12'>
                              <label htmlFor="city" className="label-cls">
                                 City<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="type"
                                id="city"
                                name='city'
                                value={shippingAddress.city}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="e.g. Mumbai"
                                required
                              />
                          </div>

                          <div className='state-div col'>
                              <label htmlFor="state" className="label-cls">
                                 State<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="text"
                                id="state"
                                name='state'
                                value={shippingAddress.state}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="e.g. Maharashtra"
                                required
                              />
                          </div>

                          <div className='zipCode-div col'>
                              <label htmlFor="zipCode" className="label-cls">
                                 ZipCode<span className='required-sign'>*</span>
                              </label>
                              <input
                                type="Number"
                                id="zipCode"
                                name='zipCode'
                                value={shippingAddress.zipCode}
                                className="form-control"
                                onChange={handleChange}
                                placeholder="XXX XXX"
                                required
                              />
                          </div>      

                          </div>{/* City state zip row closing div */}

                        <div className="row ship-row">
                          <div className="col col-lg-8"></div>
                          <div className="save-div col d-flex">
                            <input type="submit" value='Save' className="btn save-btn"/>
                            <button className="btn btn-danger m-2" onClick={()=>setDontShowAddress(!dontShowAddress)}>Cancel</button>
                          </div>
                        </div>

                      </div>
                    </form>
                    :
                    <div className="empty-cart-title text-center">
                      <span>Address:{user.shippingAddress}</span><br/>
                    <button className="btn m-2" onClick={()=>setDontShowAddress(!dontShowAddress)}>Change Address</button>
                    </div> 
                    }
                    </div>
                    }
                  </div>
              </div>
        </>
    )
}

export default Shipping;