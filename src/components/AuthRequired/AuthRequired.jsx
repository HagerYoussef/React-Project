import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthRequired() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2 className="text-danger">⚠️ Access Denied</h2>
      <p className="text-muted">You must be logged in to add products to your cart or wishlist.</p>
      <div className="d-flex gap-3 mt-3">
        <Link to="/signin" className="btn btn-success">Login</Link>
        <Link to="/signup" className="btn btn-primary">Register</Link>
        <Link to="/" className="btn btn-secondary">Go to Home</Link>
      </div>
    </div>
  );
}
