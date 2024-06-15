import './pagination.css'
import { useDispatch, useSelector } from "react-redux";
import SliderCard from "../sliderCard";
// import { 
//     onChangeProductsPerPage, 
//     onClickCurrentPage, 
//     onNavigateNext, 
//     onNavigatePrev, 
//     setProductsPerPage 
// } from "../../util/productsSlice";
import { useEffect,useState } from "react";


const Pagination = (props) => {
    const dispatch = useDispatch();
    const [filt,setfilt]=useState(props.filter)
    const [perPage,setPerPage]=useState(props.productsperpage)
    
    const [currentPage,setCurrentPage]=useState(1)

    
    // useEffect(()=>{
    //     dispatch(setProductsPerPage(perPage));
    // },[])

    const products = useSelector((state)=>state.products.product);
    
    const arr = products.filter((product)=>product.category.some((category) => category.includes(filt)));
    
    // const productsPerPage = useSelector((state)=>state.products.productsPerPage);
    // const currentPage = useSelector((state)=>state.products.currentPage);

    // const totalPages = Math.ceil(arr.length/productsPerPage);
    const totalPages = Math.ceil(arr.length/perPage);
    const pages = [...Array(totalPages+1).keys()].slice(1);
    // const indexOfLastPage = currentPage*productsPerPage;
    const indexOfLastPage = currentPage*perPage;
    // const indexOfFirstPage = indexOfLastPage - productsPerPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const renderProducts = arr.slice(indexOfFirstPage,indexOfLastPage);

    const navigateNext= () => {
        if(currentPage<totalPages){
            // dispatch(onNavigateNext());
            setCurrentPage(currentPage+1);
        }
    }

    const navigatePrev = () => {
        if(currentPage>0){
            // dispatch(onNavigatePrev());
            setCurrentPage(currentPage-1)
        }
    }

    const handleClickOnPage = (index) => {
        setCurrentPage(index);
    }

    return (
        <>
            {renderProducts.map((product, index) => (
                <SliderCard key={product._id} {...product} />
            ))}
            <p className="pagination-container text-center">
                <span className="page-btn" onClick={navigatePrev}>Prev</span>
                {pages.map((_p)=>(
                    <span key={_p} className="page-btn" onClick={()=>handleClickOnPage(_p)}> {_p} </span>
                ))}
                <span className="page-btn" onClick={navigateNext}>Next</span>
            </p>
        </>
    )
}

export default Pagination;