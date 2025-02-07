import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
  
export default function ResetPassword() {
  let navigate=useNavigate() 
 async function resetPassword(values){
    let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
    console.log(data);   
    console.log(data.token);   
    if (data.token){
          navigate('/signin')
    }
  }
 let formik= useFormik({
      initialValues:{
        email:'',
        newPassword:''
      },
      onSubmit:resetPassword,
  })
 
  return (
    <div>
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        <h2>Reset Password</h2>
        
           <label htmlFor="email">Enter Your Email :</label>
           <input type="email" id='email' name='email' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}  />
           <label htmlFor="newPassword">Enter Your new Password :</label>
           <input type="password" name='newPassword' id='newPassword' className='form-control'  onChange={formik.handleChange} onBlur={formik.handleBlur} />
           <button type="submit" className='btn bg-success text-light my-3 text-end'>Reset Password</button>
        
        
      </form>
    </div>
  )
}
