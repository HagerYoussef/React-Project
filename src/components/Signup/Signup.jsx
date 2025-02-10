import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ✅ استيراد useSelector

export default function Signup() {
  let navigate = useNavigate();
  let [isLoading, setLoading] = useState(false);
  let [errMsg, setMSG] = useState(null);

  // ✅ جلب اللغة والمحتوى المناسب من Redux
  const { lang, content } = useSelector((state) => state.languageReducer);
  const registerContent = content[lang].register; // استدعاء البيانات حسب اللغة المختارة

  let validationSchema = Yup.object({
    name: Yup.string().min(3, registerContent.name_min).max(15, registerContent.name_max).required(registerContent.name_required),
    email: Yup.string().required(registerContent.email_required).email(registerContent.invalid_email),
    phone: Yup.string().required(registerContent.phone_required).matches(/^01[1250][0-9]{8}$/, registerContent.invalid_phone),
    password: Yup.string().required(registerContent.password_required),
    rePassword: Yup.string().required(registerContent.confirm_password).oneOf([Yup.ref('password')], registerContent.not_matched),
  });

  async function signUP(val) {
    setLoading(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).catch((err) => {
      console.log(err.response.data.message);
      setMSG(err.response.data.message);
      setLoading(false);
    });
    console.log(data);

    if (data.message === 'success') {
      navigate('/signin');
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: signUP,
  });

  return (
    <div className='my-5'>
      <h1 className='text-main text-center'>{registerContent.title}</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="row m-auto w-75 shadow gy-4 p-5">
          <div className="col-md-12">
            <label htmlFor="uName">{registerContent.name} :</label>
            <input
              type="text"
              onBlur={formik.handleBlur}
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              id="uName"
              className="form-control"
            />
            {formik.errors.name && formik.touched.name ? <p className="text-danger">{formik.errors.name}</p> : ''}
          </div>

          <div className="col-md-12">
            <label htmlFor="uEmail">{registerContent.email} :</label>
            <input
              type="email"
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
              id="uEmail"
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.email && formik.touched.email ? <p className="text-danger">{formik.errors.email}</p> : ''}
          </div>

          <div className="col-md-12">
            <label htmlFor="uPhone">{registerContent.phone} :</label>
            <input
              type="tel"
              onBlur={formik.handleBlur}
              name="phone"
              id="uPhone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.phone && formik.touched.phone ? <p className="text-danger">{formik.errors.phone}</p> : ''}
          </div>

          <div className="col-md-12">
            <label htmlFor="uPassword">{registerContent.password} :</label>
            <input
              type="password"
              onBlur={formik.handleBlur}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              id="uPassword"
              className="form-control"
            />
            {formik.errors.password && formik.touched.password ? <p className="text-danger">{formik.errors.password}</p> : ''}
          </div>

          <div className="col-md-12">
            <label htmlFor="uConfirm">{registerContent.rePassword} :</label>
            <input
              type="password"
              onBlur={formik.handleBlur}
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              id="uConfirm"
              className="form-control"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? <p className="text-danger">{formik.errors.rePassword}</p> : ''}
          </div>

          {errMsg !== null ? <p className="text-danger">{errMsg}</p> : ''}
          <div className="col-md-12 text-end my-2">
            <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="btn btn-success text-light">
              {registerContent.register_button}
              {isLoading ? (
                <span>
                  <i className="fa-solid text-light mx-2 fa-spinner fa-spin"></i>
                </span>
              ) : (
                ''
              )}
            </button>
          </div>
          <p className="text-muted">
            {registerContent.have_account} <Link to="/signin" className="text-main fw-bold">{registerContent.login_page}</Link>
          </p>
        </div>
      </form>
    </div>
  );
}























// import React, { useState } from 'react'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios'
// import { Link, useNavigate } from 'react-router-dom';
// export default function Signup() {
//   let navigate=useNavigate();
//   let [isLoading,setLoading]=useState(false);
//   let [errMsg,setMSG]=useState(null);
  
//  let validationSchema= Yup.object({
//     name:Yup.string().min(3,'minlenght is 3').max(15,'maxlenght is 15').required('name is required'),
//     email:Yup.string().required('email is required').email('enter vaild email'),
//     phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'enter vaild phone'),
//     password:Yup.string().required('password is required'),
//     rePassword:Yup.string().required('confirm password').oneOf([Yup.ref('password')],'not matched password'),
//   })
//   async function signUP(val){
//     setLoading(true)
//     let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).catch((err)=>{
//      console.log(err.response.data.message);
//      setMSG(err.response.data.message);
//      setLoading(false)
//     });
//      console.log(data);
      
//     if(data.message=='success'){
//       navigate('/signin')
//       setLoading(false);
//     }
//   }
//   let formik=useFormik({
//     initialValues:{
//       name:'',
//       email:'',
//       phone:'',
//       password:'',
//       rePassword:'',
//     },
//     validationSchema:validationSchema,
//     onSubmit:signUP,
//   })
//   return (
//     <div className='my-5'>
//       <h1 className='text-main text-center'>Register form</h1>
//       <form action="" onSubmit={formik.handleSubmit}>
//       <div className="row m-auto w-75 shadow gy-4 p-5">
//         <div className="col-md-12">
//           <label htmlFor="uName">Name : </label>
//           <input type="text" onBlur={formik.handleBlur} name="name" value={formik.values.name} onChange={formik.handleChange} id="uName" className='form-control'/>
//           {formik.errors.name&&formik.touched.name?<p className='text-danger'>{formik.errors.name}</p>:''}
        
//         </div>
//         <div className="col-md-12">
//           <label htmlFor="uEmail">Email : </label>
//           <input type="email" onBlur={formik.handleBlur} name="email" value={formik.values.email} id="uEmail" onChange={formik.handleChange}  className='form-control'/>
//          {formik.errors.email&&formik.touched.email?<p className='text-danger'>{formik.errors.email}</p>:''}
        
//         </div>
//         <div className="col-md-12">
//           <label htmlFor="uPhone">Phone : </label>
//           <input type="tel" onBlur={formik.handleBlur} name="phone" id="uPhone" value={formik.values.phone} onChange={formik.handleChange}  className='form-control'/>
//         {formik.errors.phone&&formik.touched.phone?<p className='text-danger'>{formik.errors.phone}</p>:''}
        
//         </div>
//         <div className="col-md-12">
//           <label htmlFor="uPassword">Password : </label>
//           <input type="password" onBlur={formik.handleBlur} name="password" value={formik.values.password} onChange={formik.handleChange}  id="uPassword" className='form-control'/>
        
//         {formik.errors.password&&formik.touched.password?<p className='text-danger'>{formik.errors.password}</p>:''}
//         </div>
//         <div className="col-md-12">
//           <label htmlFor="uConfirm">RePassword : </label>
//           <input type="password" onBlur={formik.handleBlur} name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange}  id="uConfirm" className='form-control'/>
//           {formik.errors.rePassword&&formik.touched.rePassword?
//           <p className='text-danger'>{formik.errors.rePassword}</p>:''}
//         </div>
//         {errMsg!==null?<p className='text-danger'>{errMsg}</p>:''}
//         <div className="col-md-12 text-end my-2">
//           <button type="submit" disabled={!(formik.dirty&&formik.isValid)} className='btn btn-success text-light'>Register
//            {isLoading?<span>
//            <i className='fa-solid text-light mx-2 fa-spinner fa-spin'></i>
//           </span>:''}
          
//           </button>
           
//         </div>
//         <p className='text-muted'>i have account <Link to='/signin' className='text-main fw-bold'>Login</Link></p>
//       </div>
//       </form>
       
//     </div>
//   )
// }
