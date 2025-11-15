import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display:"flex",justifyContent:"center",alignItems:"center", textAlign: "center", marginTop: "50px" }}>
      {/* <h2> Home Page</h2> */}

      <div
        onClick={() => navigate("/login")}
        style={{
            width:"100px",
          padding: "10px",
          margin: "10px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Login
      </div>

      <div
        onClick={() => navigate("/register")}
        style={{
            width:"100px",

          padding: "10px",
          margin: "10px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Register
      </div>

      <div
        onClick={() => navigate("/add-product")}
        style={{
            width:"100px",

          padding: "10px",
          margin: "10px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        Add Product
      </div>

      <div
        onClick={() => navigate("/products")}
        style={{
            width:"100px",

          padding: "10px",
          margin: "10px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px",
        }}
      >
        View Products
      </div>
    </div>
  );
};

export default Home;
