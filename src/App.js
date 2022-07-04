import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./components/Cart";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { productsFetch } from "./store/slices/productSlice";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(productsFetch());
  }, []);

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
