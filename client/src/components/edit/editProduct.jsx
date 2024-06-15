import './editProduct.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Loading from "../loading";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProduct = () => {
    const navigate = useNavigate();
    const token = useSelector((store) => store.user.token);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [cardImage, setCardImage] = useState();
    const [error, setError] = useState('');
    const [product, setProduct] = useState({
        cardImage: '',
        title: '',
        price: '',
        description: '',
        rating: '',
        category: [],
        color: '',
        stock: ''
    });

    const params = new URLSearchParams(location.search);
    const productId = params.get('productId');

    const config = {
        headers: { 
            'Authorization': `JWT ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const productResponse = await axios.get(`/ecom/product/${productId}`, config);
                setProduct({ ...productResponse.data });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setError('Error fetching product data.');
                setLoading(false);
            }
        };

        fetchData();
    }, [token, productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    async function handleUpdate() {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', cardImage);
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('rating', product.rating);
        formData.append('category', product.category.join(', '));
        formData.append('color', product.color);
        formData.append('stock', product.stock);

        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
        try {
            const uploadResponse = await axios.put(`/ecom/updateproduct/${productId}`, formData, config);
            setLoading(false);
            console.log(uploadResponse.data);
            navigate('/manageproducts');
        } catch (error) {
            console.error("Error updating data:", error.message);
            setError('Failed to update product details.');
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    function handleImageSource(source){
        if((source.slice(0,4))==="http"){
            return source;
        }
        else return `http://localhost:5100/${source}`;
    }

    return (
        <div className="edit-product-container">
            <h2 className="text-center my-4">Edit Product</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="edit-product-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="form-group">
                    <div className='text-center'>
                        <img src={handleImageSource(product.cardImage)}  alt={product.title} className='product-image-edit' />
                    </div>
                    <label>Card Image URL</label>
                    <input
                        type="file"
                        name="cardImage"
                        onChange={e => setCardImage(e.target.files[0])}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category.join(', ')}
                        onChange={(e) => handleChange({
                            target: {
                                name: 'category',
                                value: e.target.value.split(', ').map((cat) => cat.trim()),
                            }
                        })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Color</label>
                    <input
                        type="text"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
