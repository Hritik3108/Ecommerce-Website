import { useSelector } from "react-redux";
import SliderCard from "../sliderCard";
import { useState,useEffect } from "react";

const SearchPagination = (props) => {
    const [filt, setFilt] = useState(props.filter.toLowerCase());
    const [perPage, setPerPage] = useState(props.productsperpage);    
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setFilt(props.filter.toLowerCase());
        setCurrentPage(1);
    }, [props.filter]);

    const products = useSelector((state) => state.products.product);

    const filteredProducts = Array.from(new Set(
        products.filter((product) => 
            product.category.some((category) => category.toLowerCase().includes(filt)) ||
            product.color.toLowerCase().includes(filt) ||
            product.title.toLowerCase().includes(filt)
        )
    ));

    const totalPages = Math.ceil(filteredProducts.length / perPage);
    const pages = [...Array(totalPages + 1).keys()].slice(1);
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const renderProducts = filteredProducts.slice(indexOfFirstPage, indexOfLastPage);

    const navigateNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const navigatePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleClickOnPage = (index) => {
        setCurrentPage(index);
    };


    return (
        <div className='container-fluid search-container'>
            <div className="row product-list">
                {renderProducts.map((product) => (
                    <SliderCard key={product._id} {...product} />
                ))}
            </div>
            <p className="pagination-container text-center">
                <span className="page-btn" onClick={navigatePrev}>Prev</span>
                {pages.map((_p) => (
                    <span 
                        key={_p} 
                        className={`page-btn ${currentPage === _p ? 'active' : ''}`} 
                        onClick={() => handleClickOnPage(_p)}
                    > 
                        {_p} 
                    </span>
                ))}
                <span className="page-btn" onClick={navigateNext}>Next</span>
            </p>
        </div>
    )
}

export default SearchPagination;