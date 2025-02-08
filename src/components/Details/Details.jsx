import axios  from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
 
export default function Details() {
  let x=useParams();
  let productId=x.id;
  console.log(productId);
  let [productDetails,setProductDetails]=useState(null);
  let{addCart,setCartNumber}= useContext(cartContext);
  async function getDetails(){
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    console.log(data.data);
    setProductDetails(data?.data);
    console.log(productDetails);
  }
  async function addToMyCart(id){
    let {data}=await addCart(id);
    console.log(data);
    if(data.status=='success'){
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    }
   }
  
  useEffect(()=>{
    getDetails()},[])
  return (
    <div className='container my-5'>
      {productDetails!==null?
      <>
       <div className="row">
      <div className="col-md-3">
       <img src={productDetails?.imageCover} className='w-100'/>

      </div>
      <div className="col-md-9 d-flex flex-column justify-content-around">
        <div>
          <h2>{productDetails?.title}</h2>
          <p>{productDetails?.description}</p>
        </div>
         <div>
           <p className='fs-3 fw-bold'>{productDetails?.category.name}</p>
            <div className='d-flex justify-content-between'>
            <p><span className='text-main fw-bold'>Price : </span>{productDetails?.price}</p>
           <p><span className='text-main fw-bold'></span>{productDetails?.ratingsAverage} <i className='fa-solid fa-star text-warning'></i></p>
            </div>
            
            <button onClick={()=>{addToMyCart(productDetails._id)}} className='btn bg-success text-light w-100'>Add To Cart</button>
         </div>

      </div>
    </div>
      </>
      :
       <>
       <div className='vh-100 d-flex justify-content-center align-items-center'>
          <BallTriangle
         height={100}
         width={100}
         radius={5}
         color="#4fa94d"
         ariaLabel="ball-triangle-loading"
         wrapperStyle={{}}
         wrapperClass=""
         visible={true}
         /> 
       </div>
       </>
       
}
    </div>
  )
}
