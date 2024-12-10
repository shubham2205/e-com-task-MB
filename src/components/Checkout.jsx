import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Checkout() {
  const [email, setEmail] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            items: cart,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error("Error:", error);
      navigate("/payment-failed");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4 font-mono">Checkout</h1>
      <form onSubmit={handleSubmit} className="min-w-96 bg-white p-5 rounded-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg ring "
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold mt-2">Total: ${total.toFixed(2)}</div>
        </div>
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-800"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default Checkout;
