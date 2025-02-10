import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';

export default function SignIn() {
  let navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  let [errMsg, setMSG] = useState(null);
  let { setToken } = useContext(userContext);

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required'),
  });

  async function signIN(values) {
    setLoading(true);
    setMSG(null); // Reset error message

    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        
        // ✅ Check if email matches admin credentials
        if (values.email.trim().toLowerCase() === 'adminn15@gmail.com' && values.password === 'Admin123') {
          localStorage.setItem('userRole', 'admin');
          navigate('/admin');  // Navigate to admin dashboard
        } else {
          localStorage.setItem('userRole', 'user');
          navigate('/home');  // Navigate to user dashboard
        }

        setToken(data.token);
      } else {
        setMSG('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error Response:', err.response);
      setMSG(err.response?.data?.message || 'Incorrect email or password');
    }

    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: signIN,
  });

  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>Login Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row m-auto w-75 shadow gy-4 p-5">
          <div className="col-md-12">
            <label htmlFor="uEmail">Email:</label>
            <input 
              type="email" 
              onBlur={formik.handleBlur} 
              name="email" 
              value={formik.values.email} 
              id="uEmail" 
              onChange={formik.handleChange}  
              className='form-control'
            />
            {formik.errors.email && formik.touched.email && (
              <p className='text-danger'>{formik.errors.email}</p>
            )}
          </div>
          
          <div className="col-md-12">
            <label htmlFor="uPassword">Password:</label>
            <input 
              type="password" 
              onBlur={formik.handleBlur} 
              name="password" 
              value={formik.values.password} 
              onChange={formik.handleChange}  
              id="uPassword" 
              className='form-control'
            />
            {formik.errors.password && formik.touched.password && (
              <p className='text-danger'>{formik.errors.password}</p>
            )}
          </div>
          
          {errMsg && <p className='text-danger'>{errMsg}</p>}
          
          <div className="col-md-12 text-end my-2">
            <button type="submit" disabled={!(formik.dirty && formik.isValid)} className='btn btn-success text-light'>
              Login {isLoading && <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>}
            </button>
          </div>

          <p className='text-muted'>
            Don't have an account? <Link to='/signup' className='text-main fw-bold'>Register</Link>
          </p>
          <p className='text-muted'>
            Forgot Password? <Link to='/forgetPassword' className='text-main fw-bold'>Click here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
