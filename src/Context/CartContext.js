import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props) {
  let [cartNumber, setCartNumber] = useState(0);

  function getHeader() {
    return { token: localStorage.getItem("userToken") };
  }

  function addCart(id) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: getHeader(),
      }
    );
  }

  async function getCart() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: getHeader(),
      });

      console.log("Cart Data Response:", response.data); // For debugging
      return response.data; // Return the data to be used
    } catch (error) {
      console.error("Error fetching cart:", error);
      return {}; // Return empty object on error
    }
  }

  function deleteCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: getHeader(),
    });
  }

  function updateCart(id, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: getHeader(),
      }
    );
  }

  function checkoutPayment(id, formData) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
      {
        shippingAddress: formData,
      },
      {
        headers: getHeader(),
      }
    );
  }

  // New clearCart function
  async function clearCart() {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: getHeader(),
      });
      console.log("Cart cleared:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return null;
    }
  }

  return (
    <cartContext.Provider
      value={{
        addCart,
        cartNumber,
        setCartNumber,
        getCart,
        deleteCart,
        updateCart,
        checkoutPayment,
        clearCart, // Exposing clearCart
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}


