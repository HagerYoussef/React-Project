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

    const addProduct = () => {
        if (
            !newProduct.title ||
            !newProduct.price ||
            !newProduct.slug ||
            !newProduct.description ||
            !newProduct.quantity ||
            !newProduct.imageCover ||
            !newProduct.category ||
            !newProduct.brand
        )
            return;

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
        setNewProduct(product);
    };

    const updateProduct = () => {
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

    return (
        <div className="admin-container">
            <h2>{adminContent.title}</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder={adminContent.pTitle}
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={adminContent.pSlug}
                    value={newProduct.slug}
                    onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                />
                <textarea
                    placeholder={adminContent.pDecription}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder={adminContent.pQuantity}
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <input
                    type="number"
                    placeholder={adminContent.pPrice}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={adminContent.pImage}
                    value={newProduct.imageCover}
                    onChange={(e) => setNewProduct({ ...newProduct, imageCover: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={adminContent.pCategory}
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder={adminContent.pBrand}
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                />
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
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <span>
                            {product.title} - ${product.price}
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
        </div>
    );
};

export default AdminDashboard;
