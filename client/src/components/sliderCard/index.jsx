import { useEffect, useState } from "react";
import { addItem } from "../../util/cartSlice";
import { useDispatch,useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

const SliderCard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productsInCart = useSelector((store)=>store.cart.items);
    const [disabled,setDisabled] = useState(false);

    var q;
    const item = productsInCart.find((item)=>item._id==props._id);
    if(item){
        if(item.quantity){
            q=item.quantity;
        }
    }

    function handleAddProductToCart(product){
        if(props.stock<=q || disabled==true){
            setDisabled(true);
        }else {
            dispatch(addItem(product));
        }
    }

    async function handleOnClick(){
        navigate(`/product?productId=${props._id}`);
    }

    const cardStyle={width:'13rem',};

    useEffect(()=>{
        if(props.stock===0)setDisabled(true)
        if(q!=undefined){
            if(props.stock<=q){
                setDisabled(true);
            }
        }
    },[])

    function handleImageSource(source){
        if((source.slice(0,4))==="http"){
            return source;
        }
        else return `http://localhost:5100/${source}`;
    }

    return (
        <div className="card" style={cardStyle} >
            <img src={handleImageSource(props.cardImage)}
                className="card-img-top" alt="product image" onClick={()=>handleOnClick()}/>
            <div className="card-body custom-card-bg">
            <h5 className="card-title text-center">{props.title}</h5>
            <h6 className="card-title text-center"><strong>$</strong>{props.price}</h6>
            <p className="card-text text-center">{props.description}</p>
            <button className={`${disabled?'btn-secondary ms-3 custom-disable-btn': 'btn ms-3 custom-btn'}`} onClick={()=>handleAddProductToCart(props)}>
                <i id='card-cart-icon' className="cart fa fa-shopping-cart fa-fw fa-lg"></i>
                {disabled?'Out Of Stock':'Add to cart'}
            </button>
            </div>
        </div>
    )
}

export default SliderCard;