import './manage.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const token = useSelector((store) => store.user.token);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'application/json' 
        },
        withCredentials: true
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get("/ecom/products", config);
                setProducts(productsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    function handleEdit(productId) {
        console.log('edit', productId);
        navigate(`/editproduct?productId=${productId}`);
    }

    async function handleDelete(productId) {
        setLoading(true);
        try {
            const productsResponse = await axios.delete(`/ecom/deleteproduct/${productId}`, config);
            setProducts(productsResponse.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error deleting product:", error.message);
            setLoading(false);
        }
    }

    function handleOnClick(productId) {
        navigate(`/product?productId=${productId}`);
    }

    function handleImageSource(source){
        if((source.slice(0,4))==="http"){
            return source;
        }
        else return `http://localhost:5100/${source}`;
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
    };


    return (
        <div className='container-fluid table-container'>
            <div className='row'>
                <div className='col-12'>
                <button className='btn btn-primary' onClick={()=>navigate('/createproduct')}>Create Product</button>
                    <h2 className='text-center my-4'>Manage Products</h2>
                    <div className="table-responsive">
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr className="table-heading bg-warning">
                                    <th>Image</th>
                                    <th>Order Id</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Rating</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Color</th>
                                    <th>Edit^</th>
                                    <th>Delete^</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice().reverse().map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img 
                                                src={handleImageSource(product.cardImage)} 
                                                // src={`http://localhost:5100/${product.cardImage}`} 
                                                alt='product image' 
                                                className='table-image' 
                                                onClick={() => handleOnClick(product._id)} 
                                            />
                                        </td>
                                        <td>{product._id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price}</td>
                                        <td>{product.description}</td>
                                        <td className="product-rating">{renderStars(product.rating)}</td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.color}</td>
                                        <td>
                                            <button 
                                                className="btn btn-warning btn-sm" 
                                                onClick={() => handleEdit(product._id)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
