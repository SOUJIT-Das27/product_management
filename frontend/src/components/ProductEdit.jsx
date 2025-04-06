import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);


  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    const product = res.data;
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setTags(product.tags);
    setImages(product.images);
  };

  const addNewTag = () => {
    const value = newTag.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setNewTag("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    tags.forEach((tag) => formData.append("tags[]", tag));

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      Array.from(fileInput.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    // Send old image paths to preserve them
    const oldImages = images.filter((img) => !img.startsWith("blob:"));
    oldImages.forEach((img) => formData.append("existingImages[]", img));

    await axios.put(`http://localhost:5000/api/products/${id}`, formData);
    navigate("/");
  };

  const handleTagInput = (e) => {
    const value = e.target.value.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setNewTag("");
  };

  return (
    <>
      <ProductList />
      <div className="container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
        <div className="details">
          <label>Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="image-upload">
            <label>Images</label>
            <div className="image-preview">
              {images.map((img, i) => (
                <div key={i} className="image-box">
                  <img
                    src={
                      img.startsWith("blob:")
                        ? img
                        : `http://localhost:5000${img}`
                    }
                    alt="preview"
                  />
                  <p onClick={() => removeImage(i)}>
                  Remove
                </p>
                </div>
              ))}
            </div>
            <label
  htmlFor="image-upl"
  style={{
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "10px",
    boxShadow: "1px 1px 2px rgb(123, 123, 123)"
  }}
>Add images</label>
            <input id="image-upl" type="file" multiple onChange={handleImageChange} style={{ display: "none" }}/>
          </div>

          <div className="tags">
            <label>Tags</label>
            <div className="tag-list">
              {tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}{" "}
                <span style={{ cursor: "pointer", marginLeft: "8px", color: "red" }} onClick={() => removeTag(i)}>
                  &times;
                </span>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add new tag"
              value={newTag}
              onBlur={handleTagInput}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button id="added-tag" type="button" onClick={addNewTag}>
            + Add Tag
          </button>
          </div>

          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
