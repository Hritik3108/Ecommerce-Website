import { useSelector } from 'react-redux';
import './wishlist.css'
import SliderCard from '../sliderCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const token = useSelector((store) => store.user.token);
    const [wishListItems, setWishListItems] = useState([]);
    const [responseReceived, setResponseReceived] = useState(false);

    async function fetchWishList() {
        const config = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        try {
            const response = await axios.get(`/ecom/wishlist`, config);
            if (response.status === 200) {
                setWishListItems(response.data);
                setResponseReceived(true);
            } else {
                console.error('Error updating wishlist:', response.status);
            }
        } catch (error) {
            console.error('Error updating wishlist:', error.message);
        }
    }

    useEffect(() => {
        fetchWishList();
    }, []);

    const uniqueWishListItems = wishListItems.reduce((acc, item) => {
        if (!acc.some(product => product._id === item._id)) {
            acc.push(item);
        }
        return acc;
    }, []);

    return (
        <>
            <h2 className="carousel-heading">My Wishlist</h2>
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    {
                        responseReceived && wishListItems.length !== 0 ?
                            uniqueWishListItems.map((product) => (
                                <SliderCard key={product._id} {...product} />
                            ))
                            :
                            <div className='text-center p-5'>No Item In Wishlist</div>
                    }
                </div>
            </div>
        </>
    )
}

export default Wishlist;
