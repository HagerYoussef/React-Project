import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart() {
  let { getCart, deleteCart, cartNumber, setCartNumber, updateCart, clearCart } = useContext(cartContext);
  let [data, setCartData] = useState([]);
  let [price, setCartPrice] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await getCart();
        setCartData(data.products);
        setCartPrice(data.totalCartPrice);
      } catch (e) {
        setCartData([]);
      }
    })();
  }, []);

  async function removeMyCart(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      let { data } = await deleteCart(id);
      setCartData(data.data.products);
      setCartNumber(data.numOfCartItems);
      Swal.fire("Removed!", "The product has been removed from your cart.", "success");
    }
  }

  async function updateMyCart(id, count) {
    if (count === 0) {
      removeMyCart(id);
    } else {
      let { data } = await updateCart(id, count);
      setCartData(data.data.products);
      setCartNumber(data.numOfCartItems);
    }
  }

  // Clear the entire cart
  async function clearEntireCart() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear your entire cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      let { data } = await clearCart();
      setCartData([]);
      setCartPrice(0);
      setCartNumber(0);
      Swal.fire("Cart Cleared!", "Your cart has been emptied.", "success");
    }
  }

  return (
    <div className="container">
      <h3>Shopping Cart</h3>
      <Link to="/checkout">
        <button className="btn bg-success text-light my-3">Online Payment</button>
      </Link>
      <div className="row">
        <div className="col-md-11 p-5 shadow bg-main-light my-5">
          <h3 className="text-main">Total Price : {price}</h3>
          {data.map((product) => {
            return (
              <div className="row py-5 border-bottom" key={product._id}>
                <div className="col-md-2">
                  <img src={product.product.imageCover} className="w-100" alt="cover" />
                </div>
                <div className="col-md-10 d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{product.product.title}</h3>
                    <p>{product.price}</p>
                    <button
                      onClick={() => {
                        removeMyCart(product.product._id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      <i className="fa-regular fa-trash-can mx-2"></i>Remove
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        updateMyCart(product.product._id, product.count + 1);
                      }}
                      className="btn btn-outline-success"
                    >
                      +
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() => {
                        updateMyCart(product.product._id, product.count - 1);
                      }}
                      className="btn btn-outline-success"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm Purchase Button */}
      <div className="text-center my-3">
        <button className="btn btn-danger" onClick={clearEntireCart}>
          Confirm Purchase and Clear Cart
        </button>
      </div>
    </div>
  );
}
