import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import api from "./axios/axiosInstance.js";
import { setUser } from "./features/userSlice.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData);

  const getUser = async () => {
    const res = await api.get("/auth/getcurrentuser");
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
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
