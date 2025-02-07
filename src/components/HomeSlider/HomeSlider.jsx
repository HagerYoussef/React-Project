import React from 'react'
import Slider from "react-slick";
import imgSlider1 from '../../assets/grocery-banner-2.jpeg';
import imgSlider2 from '../../assets/grocery-banner.png';
 
import imgSlider3 from '../../assets/slider-image-1.jpeg';
import imgSlider4 from '../../assets/slider-image-2.jpeg';
import imgSlider5 from '../../assets/slider-image-3.jpeg';
 
export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className='row d-flex justify-content-center g-0'>
      <div className="col-md-8">
        
        <Slider {...settings}> 
      <img src={imgSlider3} className='w-100' height={500}/>
      <img src={imgSlider4} className='w-100' height={500}/>
      <img src={imgSlider5} alt="" className='w-100' height={500}/>
       
      </Slider> 
      </div>
      <div className="col-md-4">
        <img src={imgSlider1} className='w-100' height={250}/> 
        <img src={imgSlider2} className='w-100' height={250}/> 
      </div>
       
      
    </div>
  )
}
