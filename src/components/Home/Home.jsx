import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import HomeSlider from '../HomeSlider/HomeSlider';
import Slider from 'react-slick';
import axios from 'axios';

export default function Home() {
  let [categoryList, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div>
      <HomeSlider />

      <div className="my-5 container">
        <h2 className="text-center mb-4 text-main">Categories</h2>
        <Slider {...settings}>
          {categoryList.map((category) => (
            <div key={category._id} className="category-item text-center">
              <img src={category.image} className="w-100 rounded" height={200} alt={category.name} />
              <h5 className="mt-2">{category.name}</h5>
            </div>
          ))}
        </Slider>
      </div>

      <Products />
    </div>
  );
}
