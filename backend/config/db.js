import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/productapp");
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;
