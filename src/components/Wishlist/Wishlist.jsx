import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../Context/WishlistContext';
import { cartContext } from '../../Context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

export default function Wishlist() {
  const { getMyWishlist, deleteWishlist } = useContext(wishlistContext);
  const { addCart, setCartNumber } = useContext(cartContext);
  const [data, setWishlistData] = useState([]);

 
  const { lang, content } = useSelector((state) => state.languageReducer);
  const wishlistContent = lang === 'En' ? content.En.wishlist : content.Ar.wishlist;

  useEffect(() => {
    (async () => {
      try {
        let { data } = await getMyWishlist();
        setWishlistData(data.data);
      } catch (error) {
        setWishlistData([]);
      }
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
    await deleteWishlist(id);
    getWish();
  }

  async function addToMyCart(id) {
    let { data } = await addCart(id);
    if (data.status === 'success') {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
      removeMyWish(id);
    }
  }

  return (
    <div className='container'>
      <h3>{wishlistContent.title}</h3>
      <div className="row">
        <div className="col-md-11 p-5 shadow bg-main-light my-5">
          {data.map((ele) => (
            <div className="row py-5 border-bottom" key={ele._id}>
              <div className="col-md-2">
                <img src={ele.imageCover} className='w-100' alt="cover" />
              </div>
              <div className="col-md-10 d-flex justify-content-between align-items-center">
                <div>
                  <h3>{ele.title}</h3>
                  <p>{ele.price} EGP</p>
                  <button onClick={() => removeMyWish(ele._id)} className='btn btn-outline-danger'>
                    <i className='fa-regular fa-trash-can mx-2'></i>{wishlistContent.removeButton}
                  </button>
                </div>
                <div>
                  <button onClick={() => addToMyCart(ele._id)} className='btn btn-success text-light'>
                    {wishlistContent.addToCartButton}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
