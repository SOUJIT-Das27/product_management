import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [newTag, setNewTag] = useState("");

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    tags.forEach((tag) => formData.append("tags[]", tag));

    images.forEach((imgObj) => {
      formData.append("images", imgObj.file);
    });

    await axios.post("http://localhost:5000/api/products", formData);
    navigate("/");
  };

  const handleTagInput = (e) => {
    const value = e.target.value.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setNewTag("");
  };

  const addNewTag = () => {
    const value = newTag.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setNewTag("");
  };

  return (
    <div className="container">
      <p
        style={{ cursor: "pointer", color: "orange" }}
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        {"← Back to List"}
      </p>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="details">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="image-upload">
          <label>Images</label>
          <div className="image-preview">
            {images.map((img, i) => (
              <div key={i} className="image-box">
                <img src={img.preview} alt="preview" />
                <p onClick={() => removeImage(i)}>Remove</p>
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
              boxShadow: "1px 1px 2px rgb(123, 123, 123)",
            }}
          >
            Add images
          </label>
          <input
            id="image-upl"
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="tags">
          <label>Tags</label>
          <div className="tag-list">
            {tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}{" "}
                <span
                  style={{ cursor: "pointer", marginLeft: "8px", color: "red" }}
                  onClick={() => removeTag(i)}
                >
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
  );
}
