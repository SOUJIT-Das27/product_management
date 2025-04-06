import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductEdit from "./components/ProductEdit";
import ProductAdd from "./components/ProductAdd";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route path="/edit/:id" element={<ProductEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
