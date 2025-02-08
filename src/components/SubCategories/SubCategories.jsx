import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
 
export default function SubCategories() {
  let x=useParams();
  let productId=x.id;
  console.log(productId);
  let [categoryList,setCategory]=useState(null);
  async function getAllsubcategories(){
    let {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${productId}/subcategories`)
    console.log(data.data);
    setCategory(data?.data);
    console.log(categoryList);
  }
  useEffect(()=>{
    getAllsubcategories()},[])
  return (
       
    <div className='container my-5'>
      <h1 className='text-success text-center pb-5'>Sub Categories</h1>
      {categoryList!==null?
      <>
       <div className="row g-5"> 
       {categoryList.map((ele)=>{
        return  <div className="col-md-4">
            <div className='p-3 border rounded-3'>
               <h2>{ele?.name}</h2>
            </div>
          </div>
       })}
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
