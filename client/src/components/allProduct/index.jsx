// import { useSelector } from 'react-redux';
// import SliderCard from '../sliderCard';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../pagination';
// import {useNavigate} from 'react-router-dom'

const AllProduct = () => {

    // const products = useSelector((store) => store.products.product);

    const location = useLocation();
    const dressRef = useRef(null);
    const pantsRef = useRef(null);
    const shirtRef = useRef(null);
    const skirtRef = useRef(null);
    const hoodieRef = useRef(null);
    const kidsRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.sectionId) {
            const sectionId = location.state.sectionId;
            if (sectionId === 'dress-section') {
                dressRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (sectionId === 'pants-section') {
                pantsRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (sectionId === 'shirt-section') {
                shirtRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (sectionId === 'hoodie-section') {
                hoodieRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (sectionId === 'skirt-section') {
                kidsRef.current.scrollIntoView({ behavior: 'smooth' });
            }else if (sectionId === 'kids-section') {
              kidsRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
    }, [location.state]); 


    return (
        <>
        <h2 className="carousel-heading">All Products</h2>
          
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
                {/* {allItemInList()} */}
                <Pagination filter='' productsperpage='12'/>
            </div>

        <section id="dress-section" ref={dressRef}>
            <div className="row align-items-center justify-content-center">
                <h3 className="carousel-heading">Dress</h3>
                    {/* {allDressInList()} */}
                    <Pagination filter='dress' productsperpage='6'/>
            </div>
        </section>

        <section id="pants-section" ref={pantsRef}>
            <div className="row align-items-center justify-content-center">
              <h3 className="carousel-heading">Pants</h3>
              {/* {allPantInList()} */}
              <Pagination filter='pant' productsperpage='6'/>
            </div>
        </section>

        <section id="shirt-section" ref={shirtRef}>
            <h3 className="carousel-heading">Shirts</h3>
            <div  className="row align-items-center justify-content-center">
            {/* {allShirtInList()} */}
            <Pagination filter='shirt' productsperpage='6'/>
            </div>
        </section>

        <section id="hoodie-section" ref={hoodieRef}>
          <h3 className="carousel-heading">Hoodies</h3>
          <div className="row align-items-center justify-content-center">
              {/* {allHoodieInList()} */}
              <Pagination filter='hoodie' productsperpage='6'/>
          </div>
        </section>

        <section id="skirt-section" ref={skirtRef}>
          <h3 className="carousel-heading">Skirts</h3>
          <div className="row align-items-center justify-content-center">
              {/* {allSkirtInList()} */}
              <Pagination filter='skirt'productsperpage='6'/>
          </div>
        </section>

        <section id="kids-section" ref={kidsRef}>
            <h3 className="carousel-heading">Kids</h3>
            <div  className="row align-items-center justify-content-center">
            <Pagination filter='kids' productsperpage='6'/>
            </div>
        </section>


        </div>   
        </>
    )
}

export default AllProduct;