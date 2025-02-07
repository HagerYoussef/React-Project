import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';
export default function SignIn() {
  let navigate=useNavigate();
  let [isLoading,setLoading]=useState(false);
  let [errMsg,setMSG]=useState(null);
  let {userToken,setToken}=useContext(userContext)
  // function validate(values){
  //   let errors={};
  //   if(!values.name){
  //     errors.name='name is required';
  //   }
  //   else if(values.name.length<3){
  //     errors.name='lenght must be >3';
  //   }
  //   else if(values.name.length>10){
  //     errors.name='max length is 10';
  //   }
  //    if(!values.phone){
  //     errors.phone='phone is required';
  //    }
  //    else if(!/^01[1250][0-9]{8}$/.test(values.phone)){
  //     errors.phone='enter valid phone number';
  //    }
  //     if(!values.email){
  //       errors.email='email is required';
  //     }
  //     else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //       errors.email='enter valid email';
  //     }
  //     if(!values.password){
  //       errors.password='password is required';
  //     }
  //     else if(!/^[A-Z][a-z0-9]{6,10}$/.test(values.password)){
  //       errors.password='enter valid password';
  //     }

  //     if(!values.rePassword){
  //       errors.rePassword='confirm password';
  //     }
  //     else if(values.password!==values.rePassword){
  //       errors.rePassword='password not matched';
  //     }

  //   return errors;
  // } 
 let validationSchema= Yup.object({
     
    email:Yup.string().required('email is required').email('enter vaild email'),
     
    password:Yup.string().required('password is required'),
 
  })
  async function signIN(val){
    setLoading(true)
    let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((err)=>{
     console.log(err.response.data.message);
     setMSG(err.response.data.message);
     setLoading(false)
    });
     console.log(data);
      
    if(data.message=='success'){
      navigate('/home');
      localStorage.setItem('userToken',data.token);
      setToken(data.token);
      console.log(userToken);
      setLoading(false);
    }
  }
  let formik=useFormik({
    initialValues:{
       
      email:'',
       
      password:'',
       
    },
    validationSchema:validationSchema,
    onSubmit:signIN,
  })
  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>Login form</h1>
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="row m-auto w-75 shadow gy-4 p-5">
         
        <div className="col-md-12">
          <label htmlFor="uEmail">Email : </label>
          <input type="email" onBlur={formik.handleBlur} name="email" value={formik.values.email} id="uEmail" onChange={formik.handleChange}  className='form-control'/>
         {formik.errors.email&&formik.touched.email?<p className='text-danger'>{formik.errors.email}</p>:''}
        
        </div>
         
        <div className="col-md-12">
          <label htmlFor="uPassword">Password : </label>
          <input type="password" onBlur={formik.handleBlur} name="password" value={formik.values.password} onChange={formik.handleChange}  id="uPassword" className='form-control'/>
        
        {formik.errors.password&&formik.touched.password?<p className='text-danger'>{formik.errors.password}</p>:''}
        </div>
         
        {errMsg!==null?<p className='text-danger'>{errMsg}</p>:''}
        <div className="col-md-12 text-end my-2">
          <button type="submit" disabled={!(formik.dirty&&formik.isValid)} className='btn btn-success text-light'>Login
           {isLoading?<span>
           <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
          </span>:''}
          
          </button>
           
        </div>
        <p className='text-muted'>Don't have account ?<Link to='/signup' className='text-main fw-bold'>Register</Link></p>
        <p className='text-muted'>Forget Password ?<Link to='/forgetPassword' className='text-main fw-bold'>Click here</Link></p>
      </div>
      </form>
       
    </div>
  )
}

