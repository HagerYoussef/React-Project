import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
 
import { cartContext } from '../../Context/CartContext';
export default function Checkout() {

  let {checkoutPayment,getCart}=useContext(cartContext)
   let [cartId,setCartId]=useState('');
    
   useEffect(()=>{
    (async ()=>{
      let data=await getCart();
      console.log(data.data._id);
       setCartId(data.data._id);
    })()
  },[])


  async function payment(val){
     let data=await checkoutPayment(cartId,val);
     console.log(data); 
     console.log(data.data.status);
     if(data.data.status=='success'){
      window.location=data.data.session.url
     }   
  }
   
  let formik=useFormik({
    initialValues:{
       
      phone:'',
       
      city:'',
      details:'',
       
    },
     
    onSubmit:payment,
  })
  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>Payment form</h1>
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="row m-auto w-75 shadow gy-4 p-5">
         
        <div className="col-md-12">
          <label htmlFor="uCity">City : </label>
          <input type="text"   name="city" value={formik.values.city} id="uCity" onChange={formik.handleChange}  className='form-control'/> 
        </div>
         
        <div className="col-md-12">
          <label htmlFor="uPhone">Phone : </label>
          <input type="tel"   name="phone" value={formik.values.phone} onChange={formik.handleChange}  id="uPhone" className='form-control'/>
        </div>
         
        <div className="col-md-12">
          <label htmlFor="uDetails">Details : </label>
          <input type="text"   name="details" value={formik.values.details} onChange={formik.handleChange}  id="uDetails" className='form-control'/>
        </div>
      
        <div className="col-md-12 text-end my-2">
          <button type="submit" className='btn btn-success text-light'>Pay
          
          </button>
           
        </div>
 
      </div>
      </form>
       
    </div>
  )
}
