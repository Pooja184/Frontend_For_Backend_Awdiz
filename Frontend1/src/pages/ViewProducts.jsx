import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../features/productSlice";
import api from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";

const ViewProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productData);

  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    brand: "",
  });

  const fetchAllProducts = async () => {
    try {
      const res = await api.get("/product/products", { params: filters });
      dispatch(setProducts(res.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/product/${id}`);
      alert("Deleted successfully!");
      fetchAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => setEditingProduct(product);

  const handleUpdate = async () => {
    try {
      console.log("Editing ID:", editingProduct._id);

      await api.put(`/product/${editingProduct._id}`, editingProduct);
      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post("/cart/add", { productId, quantity: 1 });
      alert("Added to cart");
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6"> Manage Products</h2>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Title"
          className="border p-2 rounded-md"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded-md"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Brand"
          className="border p-2 rounded-md"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        />
        <button
          onClick={() => setFilters({ title: "", category: "", brand: "" })}
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <input
              className="border p-2 w-full mb-2"
              value={editingProduct.title}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, title: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <textarea
              className="border p-2 w-full mb-2"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
            >
              <img
                src={p.imgUrl}
                alt={p.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-600 text-sm">{p.category}</p>
              <p className="font-bold mt-1 mb-2">₹{p.price}</p>
              <p className="text-sm text-gray-500 mb-3">{p.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAddToCart(p._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => navigate("/cart")}
            className="text-green-600 font-bold"
          >
            View Carts
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
