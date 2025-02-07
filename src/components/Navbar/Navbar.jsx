import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/TokenContext'
import { cartContext } from '../../Context/CartContext';
 
export default function Navbar() {
 let {userToken,setToken}= useContext(userContext);
 let {cartNumber,getCart,setCartNumber}=useContext(cartContext);
 let navigate=useNavigate();
 function Logout(){
  localStorage.removeItem('userToken');
  setToken(null);
  navigate('/signin');
 }
 useEffect(() => {
  (async () => {
    try {
      let response = await getCart();
      console.log("Cart Response:", response); 

      if (response && response.data && response.data.numOfCartItems !== undefined) {
        setCartNumber(response.data.numOfCartItems);
      } else {
        console.warn("numOfCartItems is missing in response:", response);
        setCartNumber(0); 
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartNumber(0); 
    }
  })();
}, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="#">
    <i className="fa-solid fa-cart-shopping text-main"></i><span className='fw-bold'>FreshCart</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      {userToken!==null?
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         
      <li className="nav-item">
        <Link className="nav-link" to="home">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="product">Products</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="category">Categories</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="wishlist">Wishlist</Link>
      </li>
       
       
    </ul>:''
    }
       
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
         
         
         {userToken==null?
         <>
         <li className="nav-item">
          <Link className="nav-link" to="signup">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="signin">Login</Link>
        </li></>:''}
        {userToken!==null?
        <>
         <li className="nav-item d-flex align-items-center">
        <i className='fa-brands fa-facebook mx-3'></i>
        <i className='fa-brands fa-twitter mx-3'></i>
        <i className='fa-brands fa-instagram mx-3'></i>
        <i className='fa-brands fa-linkedin mx-3'></i>
        
     </li>
     <li className="nav-item">
        <Link className="nav-link" to="cart">
          <i className='fa-solid fa-shopping-cart text-success'></i>
          <span className='badge text-light bg-success'>{cartNumber}</span>
        </Link>
      </li>
     <li onClick={()=>{
      Logout()
     }} className="nav-item">
       <Link className="nav-link">Logout</Link>
     </li>
        </>:''
        }
         
         
      </ul>
       
    </div>
  </div>
</nav>
    </>
  )
}
