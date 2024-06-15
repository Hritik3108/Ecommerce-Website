import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Loading from "../loading";
import { clearCart } from '../../util/cartSlice';

const Summary = (props) => {
  const {shippingRef} = props
  const dispatch = useDispatch();

  const productsInCart = useSelector((store)=>store.cart.items);
  const token = useSelector((store)=>store.user.token);  
  const sessionActive = useSelector((store)=>store.user.sessionActive);

  const [loading, setLoading] = useState(false);
  const[cost,setCost]=useState(0);
  const[total,setTotal]=useState(0);
  const[shippingCharge,setShippingCharge]=useState(0);

  async function calculateCost(){
  let productTotal = 0;
  productsInCart.forEach((product)=>{
      let q=product.quantity;
      productTotal += product.price*q;
  });
  setCost(productTotal);
  }

  async function calculateTotal(){
  setTotal(cost+shippingCharge);
  }  

  function handleClearCart(){
    dispatch(clearCart());
  }

  async function handleCheckOut(e){
    setLoading(true)
      
    const bodyParameters = await productsInCart.map((product)=>{
      return {
        productsId:product._id,
        quantity:product.quantity,
      }
    })

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    await axios.post('/ecom/payment',bodyParameters,config)
    .then(response=>{
        setTimeout(setLoading(false),2000);
        window.location.href = response.data.links[1].href;
    }).catch(function(error){
      setLoading(false);
      if(error.response && error.response.status===400){
        shippingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      console.log(error)
    })
  }

    useEffect(()=>{
    const updateCartBill = async () => {
        if (productsInCart.length <= 0) {
        setShippingCharge(0);
        } else {
        setShippingCharge(0);
        }
        await calculateCost().then(()=>{
        calculateTotal();
        })
    };
    updateCartBill();
    },[productsInCart])

    useEffect (()=>{
    const updateCartBill = async () => {
        await calculateTotal();
    };
    updateCartBill();
    },[cost])

    if (loading) {
      return <Loading />;
    }

    return(
        <>
        <div className="card">
              <div className="card-header text-center">
                Summary
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between"><span>Cost:</span> <span>${cost}</span></li>
                        <li className="list-group-item d-flex justify-content-between"><span>Shipping:</span><span> ${shippingCharge}</span></li>
                        <li className="list-group-item d-flex justify-content-between"><strong><span>Total:</span></strong> <strong><span>${total}</span></strong></li>
                      </ul>
                        <div className="text-center">
                          <button type="submit" className={`btn ms-6 custom-btn-checkout btn-block ${sessionActive&&productsInCart.length!==0?'visible':'invisible'}`} onClick={()=>handleCheckOut()}>Checkout</button>
                          <p className={`required-sign ${!sessionActive?'visible':'invisible'}`}>Login to checkout!!</p>
                        </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}

export default Summary;