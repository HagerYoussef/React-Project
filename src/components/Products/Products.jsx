import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../Context/WishlistContext';
import { userContext } from '../../Context/TokenContext';
import { useSelector } from 'react-redux';

export default function Products() {
  let [categoryList, setCategory] = useState([]);
  let [productList, setProduct] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [selectedCategory, setSelectedCategory] = useState("");
  let [selectedPrice, setSelectedPrice] = useState("");
  let { addCart, setCartNumber, getCart } = useContext(cartContext);
  let { addToWishlist, getMyWishlist, deleteWishlist } = useContext(wishlistContext);
  let { userToken } = useContext(userContext);
  let navigate = useNavigate();
  let [wishListProduct, setWishListProduct] = useState([]);

  const { lang, content } = useSelector((state) => state.languageReducer);
  const productContent = lang === 'En' ? content.En.products : content.Ar.products;

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
  }

  async function getProduct() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      let apiProducts = data.data;
  
      let localProducts = JSON.parse(localStorage.getItem("products")) || [];
  
      setProduct([...localProducts, ...apiProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }  

  useEffect(() => {
    getCategory();
    getProduct();
    (async () => {
      let { data } = await getMyWishlist();
      setWishListProduct(data?.data);
    })();
  }, []);

  async function addToMyCart(id) {
    if (!userToken) {
      navigate('/auth-required');
      return;
    }
    let { data } = await addCart(id);
    if (data.status === "success") {
      toast.success(data.message);
      let cartData = await getCart();
      if (cartData && cartData.numOfCartItems !== undefined) {
        setCartNumber(cartData.numOfCartItems);
      }
    }
  }

  async function toggleWishlist(id) {
    if (!userToken) {
      navigate('/auth-required');
      return;
    }

    if (isInWishlist(id)) {
      await deleteWishlist(id);
      toast.info("Removed from wishlist");
    } else {
      await addToWishlist(id);
      toast.success("Added to wishlist");
    }

    let { data } = await getMyWishlist();
    setWishListProduct(data?.data);
  }

  function isInWishlist(id) {
    return wishListProduct.some(product => product._id === id);
  }

  let filteredProducts = productList.filter(product => {
    let matchesCategory = selectedCategory ? product.category._id.toString() === selectedCategory.toString() : true;
    let matchesSearch = product.title.toLowerCase().includes(searchTerm);
    let matchesPrice = true;

    if (selectedPrice === "low") matchesPrice = product.price < 500;
    else if (selectedPrice === "medium") matchesPrice = product.price >= 500 && product.price <= 2000;
    else if (selectedPrice === "high") matchesPrice = product.price > 2000;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  let [currentPage, setCurrentPage] = useState(1);
  let productsPerPage = 12;

  let totalProducts = filteredProducts.length;
  let totalPages = Math.ceil(totalProducts / productsPerPage);

  let currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage, 
    currentPage * productsPerPage
  );

  function goToPage(page) {
    setCurrentPage(page);
  }

  function renderPagination() {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination d-flex justify-content-center align-items-center">
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`btn mx-2 my-3 ${currentPage === page ? 'btn-success' : 'btn-outline-success'}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="row mt-5 g-5">
      <div className="col-md-4">
        <input
          type="text"
          placeholder={productContent.search}
          className='form-control mt-2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>
      <div className="col-md-4">
        <select className='form-control mt-2' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">{productContent.category}</option>
          {categoryList.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select className='form-control mt-2' value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
          <option value="">{productContent.price}</option>
          <option value="low">{productContent.low}</option>
          <option value="medium">{productContent.medium}</option>
          <option value="high">{productContent.high}</option>
        </select>
      </div>

      {currentProducts.length > 0 ? (
        currentProducts.map(product => (
          <div className="col-md-3" key={product._id}>
            <div className="product p-3 position-relative">
              <button onClick={() => toggleWishlist(product._id)} className={`btn border ${isInWishlist(product._id) ? 'border-danger' : 'border-black'}`}>
                <i className={`fa-solid fa-heart ${isInWishlist(product._id) ? 'text-danger' : 'text-black'}`}></i>
                {isInWishlist(product._id) ? " Remove" : " Add to Favorite"}
              </button>
              <Link to={`/details/${product._id}`} className='link11'>
                <img src={product.imageCover} alt={product.title} className='w-100' />
                <p className='text-main'>{product.category.name}</p>
                <h6>{product.title}</h6>
                <div className='d-flex justify-content-between'>
                  <p>{product.price} EGP</p>
                  <p>{product.ratingsAverage}<i className='fa-solid fa-star rating-color'></i></p>
                </div>
              </Link>
              <button onClick={() => addToMyCart(product._id)} className='btn w-100 my-4 btn-success text-light mx-auto'>{productContent.addToCart}</button>
            </div>
          </div>
        ))
      ) : (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
          <BallTriangle height={100} width={100} color="#4fa94d" ariaLabel="loading" />
        </div>
      )}
      {renderPagination()}
    </div>
  );
}
