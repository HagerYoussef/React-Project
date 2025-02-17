import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
    const { lang, content } = useSelector((state) => state.languageReducer);
    const adminContent = lang === "En" ? content.En.adminDashboard : content.Ar.adminDashboard;

    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: "",
        slug: "",
        description: "",
        quantity: "",
        price: "",
        imageCover: "",
        category: "",
        brand: "",
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [formErrors, setFormErrors] = useState({});

    // Fetch API products and merge with localStorage products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
                const apiProducts = data.data;
                const localProducts = JSON.parse(localStorage.getItem("products")) || [];
                setProducts([...localProducts, ...apiProducts]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const saveProducts = (updatedProducts) => {
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    const validateForm = () => {
        const errors = {};
        if (!newProduct.title) errors.title = "Title is required";
        if (!newProduct.slug) errors.slug = "Slug is required";
        if (!newProduct.description) errors.description = "Description is required";
        if (!newProduct.quantity) errors.quantity = "Quantity is required";
        if (!newProduct.price) errors.price = "Price is required";
        if (!newProduct.imageCover) errors.imageCover = "Image URL is required";
        if (!newProduct.category) errors.category = "Category is required";
        if (!newProduct.brand) errors.brand = "Brand is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addProduct = () => {
        if (!validateForm()) return;

        const updatedProducts = [{ ...newProduct, id: Date.now() }, ...products];
        saveProducts(updatedProducts);
        setNewProduct({
            title: "",
            slug: "",
            description: "",
            quantity: "",
            price: "",
            imageCover: "",
            category: "",
            brand: "",
        });
    };

    const deleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        saveProducts(updatedProducts);
    };

    const editProduct = (product) => {
        setEditingProduct(product);
        setNewProduct({
            ...product,
            category: product.category?.name || product.category || "", // Adjust depending on your API response
            brand: product.brand?.name || product.brand || "", // Adjust depending on your API response
        });
    };

    const updateProduct = () => {
        if (!validateForm()) return;

        const updatedProducts = products.map((product) =>
            product.id === editingProduct.id ? newProduct : product
        );
        saveProducts(updatedProducts);
        setEditingProduct(null);
        setNewProduct({
            title: "",
            slug: "",
            description: "",
            quantity: "",
            price: "",
            imageCover: "",
            category: "",
            brand: "",
        });
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="admin-container">
            <h2>{adminContent.title}</h2>
            <div className="input-container">
                <input
                    type="text"
                    className={`form-control ${formErrors.title ? "is-invalid" : ""}`}
                    placeholder={adminContent.pTitle}
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.title}</div>

                <input
                    type="text"
                    className={`form-control ${formErrors.slug ? "is-invalid" : ""}`}
                    placeholder={adminContent.pSlug}
                    value={newProduct.slug}
                    onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.slug}</div>

                <textarea
                    className={`form-control ${formErrors.description ? "is-invalid" : ""}`}
                    placeholder={adminContent.pDecription}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.description}</div>

                <input
                    type="number"
                    className={`form-control ${formErrors.quantity ? "is-invalid" : ""}`}
                    placeholder={adminContent.pQuantity}
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.quantity}</div>

                <input
                    type="number"
                    className={`form-control ${formErrors.price ? "is-invalid" : ""}`}
                    placeholder={adminContent.pPrice}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.price}</div>

                <input
                    type="text"
                    className={`form-control ${formErrors.imageCover ? "is-invalid" : ""}`}
                    placeholder={adminContent.pImage}
                    value={newProduct.imageCover}
                    onChange={(e) => setNewProduct({ ...newProduct, imageCover: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.imageCover}</div>

                <input
                    type="text"
                    className={`form-control ${formErrors.category ? "is-invalid" : ""}`}
                    placeholder={adminContent.pCategory}
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.category}</div>

                <input
                    type="text"
                    className={`form-control ${formErrors.brand ? "is-invalid" : ""}`}
                    placeholder={adminContent.pBrand}
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                />
                <div className="invalid-feedback">{formErrors.brand}</div>

                {editingProduct ? (
                    <button className="update-btn" onClick={updateProduct}>
                        {adminContent.buttonAdd}
                    </button>
                ) : (
                    <button className="add-btn" onClick={addProduct}>
                        {adminContent.buttonAdd}
                    </button>
                )}
            </div>

            <ul className="product-list">
                {currentProducts.map((product) => (
                    <li key={product.id} className="product-item">
                        <span>
                            {product.title ? product.title.toString() : 'No Title'} - 
                            ${product.price ? product.price.toString() : '0'}
                        </span>
                        <div className="btn-group">
                            <button className="edit-btn" onClick={() => editProduct(product)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => deleteProduct(product.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination with Previous and Next */}
            <div className="pagination">
                <button
                    className="page-link"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="page-link"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
