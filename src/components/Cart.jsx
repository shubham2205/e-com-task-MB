import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container bg-gray-200 h-screen mx-auto p-4">
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mb-6 mt-12 font-mono text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white min-w-80 rounded-md shadow-md p-4 hover:shadow-lg">
              <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 text-lg">${item.price.toFixed(2)}</p>
              <div className="flex justify-between items-center">
                <div className=" flex gap-4">

                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  +
                </button>
                </div>



                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xl font-semibold mt-4">Total: ${total.toFixed(2)}</p>
      <Link
        to="/checkout"
        className="mt-2 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
      >
        Proceed to Checkout
      </Link>
    </div>
  </div>
  );
}

export default Cart;
