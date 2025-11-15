import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import api from "./axios/axiosInstance.js";
import { setUser } from "./features/userSlice.js";
import { useEffect } from "react";
import AddProduct from "./pages/AddProduct.jsx";
import Home from "./pages/Home.jsx";
import ViewProducts from "./pages/ViewProducts.jsx";
import Carts from "./pages/Carts.jsx";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData);

  const getUser = async () => {
    const res = await api.get("/auth/get-current-user");
    dispatch(setUser(res.data.user));
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/products" element={<ViewProducts/>} />
        <Route path="/cart" element={<Carts/>} />

      </Routes>
    </>
  );
}

export default App;
