'use client'
import React, { useState, FormEvent } from 'react';

const ProductManagementPage = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState<number | ''>('');
  const [response, setResponse] = useState<any>(null);

  const handleGetProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/products${productId}`);
    const data = await res.json();
    setResponse(data);
  };

  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId, name: productName, price: productPrice })
    });
    const data = await res.json();
    setResponse(data);
  };

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updates: any = {};
    if (productName) updates.name = productName;
    if (productPrice !== '') updates.price = productPrice;

    const res = await fetch(`/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    setResponse(data);
  };

  const handleDeleteProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <h1>Product Management</h1>

    
      <form onSubmit={handleGetProduct}>
        <h2>Get Product</h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button type="submit">Get Product</button>
      </form>

      <form onSubmit={handleCreateProduct}>
        <h2>Create Product</h2>
        <input
          type="text"
          placeholder="Enter New Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter New Product Price"
          value={productPrice}
          step="0.01"
          onChange={(e) => setProductPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Create Product</button>
      </form>

    
      <form onSubmit={handleUpdateProduct}>
        <h2>Update Product</h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Product Name (optional)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter New Product Price (optional)"
          value={productPrice}
          step="0.01"
          onChange={(e) => setProductPrice(e.target.value ? parseFloat(e.target.value) : '')}
        />
        <button type="submit">Update Product</button>
      </form>

    
      <form onSubmit={handleDeleteProduct}>
        <h2>Delete Product</h2>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button type="submit">Delete Product</button>
      </form>

     
      <div>
        <h2>Response</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ProductManagementPage;
