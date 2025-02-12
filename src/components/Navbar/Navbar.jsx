import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';
import { cartContext } from '../../Context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../Store';

export default function Navbar() {
  let { userToken, setToken } = useContext(userContext);
  let { cartNumber, getCart, setCartNumber } = useContext(cartContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lang, content } = useSelector((state) => state.languageReducer);
  const location = useLocation();
  const isLoginPage = location.pathname === "/signin" || location.pathname === "/signup";

  const navbarContent = lang === 'En' ? content.En.navbarHome : content.Ar.navbarHome;
  const loginContent = lang === 'En' ? content.En.navbarLogin : content.Ar.navbarLogin;

  useEffect(() => {
    (async () => {
      try {
        let response = await getCart();
        if (response?.data?.numOfCartItems !== undefined) {
          setCartNumber(response.data.numOfCartItems);
        } else {
          setCartNumber(0);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartNumber(0);
      }
    })();
  }, []);

  function Logout() {
    navigate("/login"); 
    localStorage.removeItem("userToken"); 
    setToken(null); 
  }
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="#">
          <i className="fa-solid fa-cart-shopping text-main"></i>
          <span className="fw-bold">{navbarContent.cart_navbar}</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoginPage ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="signup">{loginContent.registerButton}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signin">{loginContent.loginButton}</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-success" onClick={() => dispatch(toggleLanguage())}>
                  {lang === 'En' ? 'AR' : 'EN'}
                </button>
              </li>
            </ul>
          ) : (
            <>
              {userToken && (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" to="home">{navbarContent.home}</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="product">{navbarContent.products}</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="category">{navbarContent.categories}</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="wishlist">{navbarContent.whishlist}</Link></li>
                </ul>
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!userToken ? (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="signup">{loginContent.registerButton}</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="signin">{loginContent.loginButton}</Link></li>
                  </>
                ) : (
                  <>
                    {/* Social Media Links */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item d-flex align-items-center">
                        <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook mx-2 text-success"></i></a>
                        <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter mx-2 text-success"></i></a>
                        <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram mx-2 text-success"></i></a>
                        <a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin mx-2 text-success"></i></a>
                      </li>
                    </ul>

                    {/* Cart */}
                    <li className="nav-item">
                      <Link className="nav-link" to="cart">
                        <i className="fa-solid fa-shopping-cart text-success"></i>
                        <span className="badge text-light bg-success">{cartNumber}</span>
                      </Link>
                    </li>

                    {/* Logout Button */}
                    <li className="nav-item px-2">
                      <button  onClick={Logout} className="btn btn-success text-light rounded p-2">
                        {loginContent.logoutButton || 'Logout'}
                      </button>
                    </li>
                  </>
                )}

                {/* Language Toggle */}
                <li className="nav-item">
                  <button className="btn btn-success ms-2" onClick={() => dispatch(toggleLanguage())}>
                    {lang === 'En' ? 'AR' : 'EN'}
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
