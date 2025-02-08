import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Category() {
  let [data, setCategory] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 6;

  async function getCategory() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategory(data.data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
      <div className="pagination d-flex justify-content-center">
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`btn mx-2 my-3 ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="row g-5 h-100">
        {currentData.length > 0 ? (
          <>
            {currentData.map((product) => {
              return (
                <div className="col-md-4" key={product._id}>
                  <div className="p-2 h-100 text-center product">
                    <Link className='link11' to={`/subCategories/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className='w-100 h-75'
                      />
                      <h2 className='mt-3 text-center text-success'>
                        {product.name}
                      </h2>
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className='vh-100 d-flex justify-content-center align-items-center'>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
      {renderPagination()}
    </div>
  );
}

