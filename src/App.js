import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Category from './components/Category/Category';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Notfound from './components/NotFound/Notfound';
import CounterContextProvider from './Context/counterContext';
import UserContextProvider from './Context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import { CartContextProvider } from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/allorders/allorders';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { WishlistContextProvider } from './Context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';
import SubCategories from './components/SubCategories/SubCategories';
import AdminDashboard from './components/AdminPanel/admin_dashboard';
import AuthRequired from './components/AuthRequired/AuthRequired';
import { useSelector } from "react-redux";

const routes = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'product', element: <Products /> },
      { path: 'details/:id', element: <Details /> },
      { path: 'category', element: <Category /> },
      { path: 'subCategories/:id', element: <SubCategories /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'auth-required', element: <AuthRequired /> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: '*', element: <Notfound /> }
    ]
  }
]);

function App() {
  const lang = useSelector((state) => state.languageReducer.lang);
  return (
    <div
      style={{
        direction: lang === "En" ? "ltr" : "rtl",
      }}>
    <CartContextProvider>
      <WishlistContextProvider>
        <UserContextProvider>
          <RouterProvider router={routes} />
          <ToastContainer theme='colored' />
        </UserContextProvider>
      </WishlistContextProvider>
    </CartContextProvider>
    </div>
  );
}

export default App;
