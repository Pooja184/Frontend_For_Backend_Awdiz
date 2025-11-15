import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setProducts } from "../features/productSlice";
import api from "../axios/axiosInstance";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productData);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    brand: "",
    imgUrl: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/product/add-product", product); // ✅ backend auto adds userId
      dispatch(addProduct(res.data.product));
      alert("Product added successfully!");
      setProduct({
        title: "",
        category: "",
        brand: "",
        imgUrl: "",
        description: "",
        price: "",
      });
      fetchMyProducts();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product");
    }
  };

  const fetchMyProducts = async () => {
    try {
      const res = await api.get("/products/my-products"); // ✅ only this user's products
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error fetching my products:", error);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="border border-gray-300 w-full p-2 rounded-md"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="border border-gray-300 w-full p-2 rounded-md"
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border border-gray-300 w-full p-2 rounded-md"
        />
        <input
          type="text"
          name="imgUrl"
          value={product.imgUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border border-gray-300 w-full p-2 rounded-md"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 w-full p-2 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border border-gray-300 w-full p-2 rounded-md"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">My Products:</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul className="space-y-2">
            {products.map((p) => (
              <li
                key={p._id}
                className="p-2 border border-gray-300 rounded-md bg-gray-50"
              >
                <img
                  src={p.imgUrl}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded-md mb-2"
                />
                <strong>{p.title}</strong> - ₹{p.price}
                <p className="text-sm text-gray-500">
                  {p.category} | {p.brand}
                </p>
                <p className="text-sm">{p.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default AddProduct;
