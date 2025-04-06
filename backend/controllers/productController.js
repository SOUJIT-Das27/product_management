import Product from "../models/Product.js";

// fetch products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// get product by id
const getProductsById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// delete product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
//add product
const addProduct = async (req, res) => {
  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
  const product = new Product({ ...req.body, images: imagePaths });
  await product.save();
  res.json(product);
};

// update product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, tags } = req.body;
    let existingImages = req.body.existingImages || [];

    if (typeof existingImages === "string") {
      existingImages = [existingImages];
    }

    const uploadedImages =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const updatedImages = [...existingImages, ...uploadedImages];

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        tags: Array.isArray(tags) ? tags : [tags],
        images: updatedImages,
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export {
  getProducts,
  getProductsById,
  deleteProduct,
  addProduct,
  updateProduct,
};
