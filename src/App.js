import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
 
import Cart from './components/Cart/Cart';
import Category from './components/Category/Category';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Context/counterContext';
import UserContextProvider from './Context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import { CartContextProvider } from './Context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/allorders/allorders';
import ForgetPassword from './components/forgetPassword/forgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { WishlistContextProvider } from './Context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';
import SubCategories from './components/SubCategories/SubCategories';
const routes= createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {path:'',element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'product',element:<ProtectedRoute><Products/></ProtectedRoute>},
     
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'details/:id',element:<ProtectedRoute><Details/></ProtectedRoute>},
    {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>},
    {path:'checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'subCategories/:id',element:<ProtectedRoute><SubCategories/></ProtectedRoute>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'resetPassword',element:<ResetPassword/>},
    {path:'wishlist',element:<Wishlist/>},
    {path:'signin',element:<Signin/>},
    {path:'signup',element:<Signup/>},
    {path:'*',element:<Notfound/>}
  ]}
])
function App() {
  return (
      
      <CartContextProvider>
      <WishlistContextProvider>
      <UserContextProvider> 
        <RouterProvider router={routes}/>
        <ToastContainer theme='colored'/>
        </UserContextProvider>
      </WishlistContextProvider>
      </CartContextProvider>   
  );
}

export default App;
