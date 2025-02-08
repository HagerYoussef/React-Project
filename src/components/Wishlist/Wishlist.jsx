import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../Context/WishlistContext';
import { cartContext } from '../../Context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Wishlist() {
  let { getMyWishlist, deleteWishlist } = useContext(wishlistContext);
  let [data, setWishlistData] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await getMyWishlist();
      setWishlistData(data.data);
    })();
  }, []);

  async function getWish() {
    try {
      let { data } = await getMyWishlist();
      setWishlistData(data.data);
    } catch (e) {
      setWishlistData([]);
    }
  }

  async function removeMyWish(id) {
    let { data } = await deleteWishlist(id);
    getWish();
    console.log(data.data);
  }

  let { addCart, setCartNumber } = useContext(cartContext);

  async function addToMyCart(id) {
    let { data } = await addCart(id);
    console.log(data);
    console.log("Add to Cart Response:", data);
    if (data.status === 'success') {
      console.log("Success Message:", data.message);
      toast.success(data.message); 
      setCartNumber(data.numOfCartItems);
      removeMyWish(id);
    }
  }

  return (
    <div className='container'>
      <h3>My Wishlist</h3>
      <div className="row">
        <div className="col-md-11 p-5 shadow bg-main-light my-5">
          {data.map((ele) => {
            return (
              <div className="row py-5 border-bottom" key={ele._id}>
                <div className="col-md-2">
                  <img src={ele.imageCover} className='w-100' alt="cover" />
                </div>
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{ele.title}</h3>
                    <p>{ele.price} EGP</p>
                    <button onClick={() => { removeMyWish(ele._id) }} className='btn btn-outline-danger'>
                      <i className='fa-regular fa-trash-can mx-2'></i>Remove
                    </button>
                  </div>
                  <div>
                    <button onClick={() => { addToMyCart(ele._id) }} className='btn btn-success text-light'>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />  
    </div>
  );
}
