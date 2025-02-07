import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
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

useEffect(() => {
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
setProducts(storedProducts);
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
const updatedProducts = [
    ...products,
    { ...newProduct, id: Date.now() },
];
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
    <h2>Admin Dashboard - Product Management</h2>
    <div className="input-container">
    <input
        type="text"
        placeholder="Product Title"
        value={newProduct.title}
        onChange={(e) =>
        setNewProduct({ ...newProduct, title: e.target.value })
        }
    />
    <input
        type="text"
        placeholder="Slug"
        value={newProduct.slug}
        onChange={(e) =>
        setNewProduct({ ...newProduct, slug: e.target.value })
        }
    />
    <textarea
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
        setNewProduct({ ...newProduct, description: e.target.value })
        }
    />
    <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) =>
        setNewProduct({ ...newProduct, quantity: e.target.value })
        }
    />
    <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
        setNewProduct({ ...newProduct, price: e.target.value })
        }
    />
    <input
        type="text"
        placeholder="Image Cover URL"
        value={newProduct.imageCover}
        onChange={(e) =>
        setNewProduct({ ...newProduct, imageCover: e.target.value })
        }
    />
    <input
        type="text"
        placeholder="Category"
        value={newProduct.category}
        onChange={(e) =>
        setNewProduct({ ...newProduct, category: e.target.value })
        }
    />
    <input
        type="text"
        placeholder="Brand"
        value={newProduct.brand}
        onChange={(e) =>
        setNewProduct({ ...newProduct, brand: e.target.value })
        }
    />
    {editingProduct ? (
        <button className="update-btn" onClick={updateProduct}>
        Update Product
        </button>
    ) : (
        <button className="add-btn" onClick={addProduct}>
        Add Product
        </button>
    )}
    </div>
    <ul className="product-list">
    {products.map((product) => (
        <li key={product.id} className="product-item">
        <span>{product.title} - ${product.price}</span>
        <div className="btn-group">
            <button
            className="edit-btn"
            onClick={() => editProduct(product)}
            >
            Edit
            </button>
            <button
            className="delete-btn"
            onClick={() => deleteProduct(product.id)}
            >
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
