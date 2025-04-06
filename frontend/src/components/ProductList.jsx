import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // for editing the product details
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    // console.log(res);
    setProducts(res.data);
  };

  // deleting product from List
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Product List</h1>
        <Link to="/add" className="btn">
          + Add Product
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Tags</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.images?.[0] && (
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="thumbnail"
                  />
                )}
              </td>
              {/* <td>photo</td> */}
              <td>{product.name}</td>
              <td>{product.tags?.join(", ")}</td>
              <td>${product.price?.toFixed(2)}</td>
              <td>
                <Link to={`/edit/${product._id}`} className="link">
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="link delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
