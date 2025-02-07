import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
 
export default function ForgetPassword() {
  let validationSchema=Yup.object({
    email:Yup.string().required('email is required').email('enter valid email')
  })
 async function forgetPassword(values){
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
    console.log(data);
    if (data.statusMsg=='success'){
      document.querySelector('.forgetPassword').classList.add('d-none');
      document.querySelector('.resetCode').classList.remove('d-none');
    }
  }
 let formik= useFormik({
      initialValues:{
        email:''
      },
      onSubmit:forgetPassword,
      validationSchema:validationSchema,

  })
let navigate= useNavigate();
 async function resetCode(values){
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    console.log(data);
    if(data.status=="Success"){
      navigate('/resetPassword');
    }
  }
 let formik2= useFormik({
      initialValues:{
        resetCode:''
      },
      onSubmit:resetCode,
  })
  return (
     
     <>
      <>
     <div className='w-75 mx-auto my-5 forgetPassword'>
      <h3>Forget Password</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email" className='my-3'>Enter Your Email : </label>
       <input type='email' className='form-control' id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.email&&formik.errors.email?<p className='text-danger'>{formik.errors.email}</p>:''}
        <button type="submit" className='btn my-3 bg-success text-light text-end'>Send Code</button>
      </form>
    </div>
    </>
     <>
     <div className='w-75 mx-auto my-5 resetCode d-none'>
      <h3>Verify Code</h3>
      <form onSubmit={formik2.handleSubmit}>
        <label htmlFor="resetCode" className='my-3'>Enter Your resetCode : </label>
       <input type='resetCode' className='form-control' id='resetCode' name='resetCode' onChange={formik2.handleChange} onBlur={formik2.handleBlur}/>
    
        <button type="submit" className='btn my-3 bg-success text-light text-end'>Send Code</button>
      </form>
    </div>
    </>
     
     </>

  )
}
