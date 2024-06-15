import { useSelector,useDispatch } from "react-redux";
import CartItem from "../cartItem";
import { clearCart } from '../../util/cartSlice';
import Shipping from "../shipping";
import Summary from "../summary";
import { useRef } from "react";


const Cart = () => {
  
  const shippingRef = useRef(null);

  const productsInCart = useSelector((store)=>store.cart.items);
  
  const dispatch = useDispatch();

  function fetchCartItems(){
    return productsInCart.map((product,index) => (
        <div key={product._id} className="cart-item"> <CartItem {...product}/> </div>
    ));
  }

  function handleClearCart(){
    dispatch(clearCart());
  }

    return (
        <>
        <div className="container ">
        <h2 className="carousel-heading ">CART</h2>
          
          <div className="row">
            
            <div className="col col-lg-8">
              <div className="card text-center">
                <div className="card-header d-flex justify-content-between">
                  <span>Items in cart</span> <span className="btn" onClick={()=>handleClearCart()}>Clear Cart</span> 
                </div>
                <div className="card-body"> 
                  {
                  productsInCart.length===0?
                  <div className="empty-cart-title">
                    No Item In Cart
                  </div>
                  :
                  fetchCartItems()
                  }
                </div>
              </div>
            </div>

            <div className="col col-lg-4">
            <Summary shippingRef={shippingRef}/>
            </div>
          </div>
          
          <div className="row">
            
          <section id="shipping-section" className="col" ref={shippingRef}>  
              <Shipping />
            </section>
            
          </div>

        </div>
        </>
    )
}

export default Cart;