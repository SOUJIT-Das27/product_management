//package import
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import connectToDB from "./config/db.js";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "./controllers/productController.js";

// an import for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//express app
const app = express();

//using external middleware
app.use(cors());
app.use(express.json());

//image_upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


// Product APIs
app.get("/api/products", getProducts);
app.get("/api/products/:id", getProductsById);
app.post("/api/products", upload.array("images"), addProduct);
app.put("/api/products/:id", upload.array("images"), updateProduct);
app.delete("/api/products/:id", deleteProduct);

// Server port - DB connect
connectToDB().then(() => {
  app.listen(5000, () => {
    console.log(`server is running at 5000`);
  });
});
