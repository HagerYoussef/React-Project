import React, { useContext,useEffect, useState } from 'react'
import Products from '../Products/Products'
import HomeSlider from '../HomeSlider/HomeSlider'
import Slider from 'react-slick';
import axios from 'axios'

export default function Home() {
  let [catrgoryList,setCategory]=useState([]);
async function getCategory(){
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategory(data.data);
  }
  useEffect(()=>{
    getCategory()
  },[]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    
    <div>
      <HomeSlider/>
      <div className='my-5'>
      <Slider {...settings}> 
      {catrgoryList.map((category)=>{
        return  <>
        <img src={category.image} className='w-100' height={300}/>
        <h3>{category.name}</h3></>
      })}
      </Slider>
    </div>
      <Products/>
    </div>
  )
}
