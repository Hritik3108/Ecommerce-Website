import { useEffect, useState } from 'react';
import './viewProduct.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from "../loading";
import { useLocation } from 'react-router-dom';
import { addItem } from '../../util/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { updateUser } from '../../util/userSlice';

const ViewProduct = () => {

    const productsInCart = useSelector((store)=>store.cart.items);
    const token = useSelector((store)=>store.user.token);
    const activeSession = useSelector((store)=>store.user.sessionActive);
    
    
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(false);    
    const [product,setProduct] = useState({
        cardImage: "",
        category: [],
        color: '',
        description: "",
        price: '',
        rating: '',
        stock:'',
        title:''
    });
    const [disabled,setDisabled] = useState(false);

    const params = new URLSearchParams(location.search);
    const productId = params.get('productId');
    // let imgURL='';

    useEffect(()=>{
        window.scrollTo(0, 0);
        async function fetchProduct(){
            setLoading(true)
            const config = {
                headers: { 
                    'Content-Type': 'application/json' 
                    },
                    withCredentials: true
                    };
            await axios.get(`/ecom/product/${productId}`,config).then((response)=>{
            if(response.status===200){
                setProduct({...response.data});
                // console.log(response.data);
                // imgURL=product.cardImage;
                setLoading(false)
                }else{
                    // error msg
                }
            }).catch(function(err){setLoading(false);console.log(err.message)})
        }

        fetchProduct();
    },[productId])
    
                            
const wishlist = useSelector((store)=>store.user.user.wishlist);
const [inWishlist,setInWishlist] = useState(false);

function wishlistStatus(productId){
    setInWishlist(wishlist.includes(productId));
}
    
async function handleWishlist(){
    // console.log(inWishlist)
    // setInWishlist(!inWishlist)

    setInWishlist((prevState) => {
        const newState = !prevState;
        if (newState) {
            add();
        } else {
            remove();
        }
        return newState;
    });
}


async function add(){
    const params = new URLSearchParams(location.search);
    const productId = params.get('productId');
    
    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    try {
        const response = await axios.put(`/ecom/addtowishlist/${productId}`, {}, config);
        if (response.status === 200) {
            dispatch(updateUser(response.data));
            // setTimeout(() => setLoading(false), 2000);
        } else {
            console.error('Error updating user:', response.status);
            // setLoading(false);
        }
    } catch (error) {
        // setLoading(false);
        console.error('Error updating user:', error.message);
    }
}

async function remove(){
const params = new URLSearchParams(location.search);
const productId = params.get('productId');

const config = {
    headers: { 
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json' 
    },
    withCredentials: true
};

try {
    const response = await axios.put(`/ecom/removefromwishlist/${productId}`, {}, config);
    if (response.status === 200) {
        dispatch(updateUser(response.data));
        // setTimeout(() => setLoading(false), 2000);
    } else {
        console.error('Error updating user:', response.status);
        // setLoading(false);
    }
} catch (error) {
    // setLoading(false);
    console.error('Error updating user:', error.message);
}
}



    const {_id,cardImage,title,price,description,stock,rating,color,category} = product;

    var q;
    const item = productsInCart.find((item)=>item._id==_id);
    if(item){
        if(item.quantity){
            q=item.quantity;
        }
    }

    function handleAddProductToCart(product){
        if(stock<=q || disabled==true){
            setDisabled(true);
        }else {
            dispatch(addItem(product));
        }
    }

    useEffect(()=>{
        // fetchProduct(productId);
        if(activeSession)wishlistStatus(productId);
    },[])
    
    useEffect(()=>{
        if(stock===0)setDisabled(true)
        if(q!=undefined){
            if(stock<=q){
                setDisabled(true);
            }
        }
    },[])

    if (loading) {
        return <Loading />;
      }

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    &#9733;
                </span>
            );
        }
        return stars;
    }  

    function handleImageSource(source){
        // console.log('source',source)
        if((source.slice(0,4))==="http"){
            return source;
        }
        else return `http://localhost:5100/${source}`;
    }

    return (
        <div className='card-full-view-container container'>
            <div className="row">
                <div className="col-md-6 text-center">
                    <img src={handleImageSource(cardImage)} alt={title} className='product-image img-fluid'/>
                </div>
                <div className="col-md-6">
                    <h1 className="product-title">{title}</h1>
                    <p className="product-price">Price: ${price}</p>
                    <p className="product-description">{description}</p>
                    <p className="product-stock">Stock: {stock}</p>
                    <p className="product-rating">Rating: {renderStars(rating)}</p>
                    <p className="product-color">Color: {color}</p>
                    {/* <p className="product-category">Category: {category}</p> */}
                    <p className="product-category">Category: {category?.join(', ')}</p>

                    <span className='wishlist-btn'>
                        <FontAwesomeIcon icon={inWishlist?faHeartSolid:faHeartRegular} className={`p-2  mt-3 ${inWishlist?'card-unlike-icon':'card-like-icon'}`} onClick={()=>handleWishlist()}/>
                        {/* <span className='wishlist-btn-text'>Add to wishlist</span> */}
                    </span>

                    <p>
                    <button className={`${disabled?'btn-secondary custom-disable-btn': 'btn btn-primary btn-add-to-cart'}`} onClick={()=>handleAddProductToCart(product)}>
                        {disabled?'Out Of Stock':'Add to cart'}
                    </button>
                    
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;