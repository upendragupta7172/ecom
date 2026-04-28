import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        setProducts(products.filter((p) => p._id !== id)); // update UI
        alert("Product deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Error deleting product");
      }
    }
  };

  return (
    <div style={{ padding: "20px", width: "600px", margin: "50px auto" }}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              <strong>{p.title}</strong> - ₹{Number(p.price).toLocaleString()}
              <br />
              {p.description}
              <br />
              <button onClick={() => handleDelete(p._id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;