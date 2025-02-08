import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext=createContext();

export function WishlistContextProvider(props){
//   let [wishlistNumber,setWishlistNumber]=useState(0);
function getHeader(){
  return {token:localStorage.getItem('userToken')}
}
function addToWishlist(id){
     
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    
    {
      productId:id
    },
    {
       headers:getHeader()
    }
    )
}
function getMyWishlist(){
  
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,  
  {
     headers:getHeader()
  }
  )
}
function deleteWishlist(id){
  
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
  {
     headers:getHeader()
  }
  )
}
 
return <wishlistContext.Provider value={{addToWishlist,getMyWishlist,deleteWishlist}}>
    {props.children}
</wishlistContext.Provider>
}