import React, { useEffect, useState } from "react";
import axios from "@/api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/user/product/getallproducts");
        if (!ignore) {
          setProducts(res.data.products || []);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
        }
      }
    };

    void fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/user/product/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((currentProducts) =>
          currentProducts.filter((product) => product._id !== id)
        );
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
          {products.map((product) => (
            <li key={product._id}>
              <strong>{product.productName}</strong> - Rs.{Number(product.productPrice).toLocaleString()}
              <br />
              {product.productDesc}
              <br />
              <button onClick={() => handleDelete(product._id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
