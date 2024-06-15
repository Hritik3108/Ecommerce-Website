import React from 'react';
import { useSelector } from 'react-redux';
import SliderCard from '../sliderCard';

const Slider = () => {
  const products = useSelector((store) => store.products.product);

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  function carouselList() {
    const productChunks = chunkArray(products, 5);
    return productChunks.map((chunk, index) => (
      <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <div className="cards-wrapper row row-cols-1 row-cols-md-2">
          {chunk.map((product) => (
            <SliderCard key={product._id} {...product} />
          ))}
        </div>
      </div>
    ));
  }

  return (
    <div id="homeCarousel">
      <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <h2 className="carousel-heading">Featured Products</h2>
        <div className="carousel-inner">
          {carouselList()}
        </div>
        <button className="carousel-control-prev carousel-btn" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden carousel-next">Previous</span>
        </button>
        <button className="carousel-control-next carousel-btn" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
