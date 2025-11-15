import React, { useEffect, useState } from "react";
import api from "../axios/axiosInstance";

const Carts = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await api.delete("/cart");
      alert("Order placed successfully!");
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart || cart.products.length === 0)
    return <h2 className="text-center mt-10">Cart is Empty</h2>;

  const total = cart.products.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      {cart.products.map((item) => (
        <div
          key={item.productId._id}
          className="border p-4 rounded-md flex justify-between mb-3"
        >
          <div>
            <h3>{item.productId.title}</h3>
            <p>₹{item.productId.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>

          <button
            onClick={() => handleRemove(item.productId._id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Remove
          </button>
        </div>
      ))}

      <h3 className="text-xl font-bold mt-4">Total: ₹{total}</h3>

      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-md mt-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default Carts;
