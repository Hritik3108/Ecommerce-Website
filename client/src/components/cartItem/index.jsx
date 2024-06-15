import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { addItem,removeItem,removeallItem,quantityOfItem } from "../../util/cartSlice";
import { useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

const CartItem = (props) => {
    const navigate = useNavigate();

    const {cardImage,title,price,quantity} = props;
    const [quantityInput, setQuantityInput] = useState(quantity);

    const dispatch = useDispatch();

    function handleAddProductToCart(product){
        console.log(product.stock)
        if(product.stock<=product.quantity){
            console.log("Out Of Stock");
            // Here the error will go
        }else{
            dispatch(addItem(product));
        }
    }

    function handleRemoveFromCart(product){
        dispatch(removeItem(product));
    }

    function handleDeleteAll(product){
        dispatch(removeallItem(product));
    }

    function handleQuantityChange(props,val){
        const newQuantity = parseInt(val);
        if(props.stock<newQuantity){
            setQuantityInput(props.quantity);
        }else if (!isNaN(newQuantity) && newQuantity > 0) {
            dispatch(quantityOfItem({ ...props, quantity: newQuantity }));
        }
    }

    useEffect(()=>{
        setQuantityInput(quantity);
    },[quantity])

    async function handleOnClick(){
        navigate(`/product?productId=${props._id}`);
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                <img src={cardImage}
                alt="Product-Image" className="cart-img" onClick={()=>handleOnClick()}/>
                </div>
                <div className="col-md-4">
                <div><strong>{title}</strong></div><br/>
                <div>${price}</div><br/>
                <a href="#" className="btn custom-btn">
                    <FontAwesomeIcon 
                        id='card-cart-icon' 
                        className="cart fa fa-trash fa-fw fa-lg" 
                        icon={faTrash} 
                        onClick={()=>handleDeleteAll(props)}
                        />
                </a>
                </div>
                <div className="col-md-3">
                    <div className="container">
                    <div className="row">
                        <div className="col d-flex flex-row">
                        <button className="btn ms-0 custom-btn-cart" onClick={()=>handleRemoveFromCart(props)}>-</button>
                        <input 
                            className="form-control text-center" 
                            name='quantityInput' 
                            value={quantityInput} 
                            onChange={(e) => {var val=e.target.value;setQuantityInput(val);handleQuantityChange(props,val)}}
                        />
                        <button className="btn ms-0 custom-btn-cart" onClick={()=>handleAddProductToCart(props)}>+</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CartItem;