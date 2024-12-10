import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const products = [
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
];

function ProductList() {
  const { cart, addToCart } = useCart();

  const getCartQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    

    <div className="container h-screen bg-gray-200 mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 mt-12 font-mono text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded shadow-md p-4 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-800 transition duration-300"
            >
              Add to Cart{" "}
              {getCartQuantity(product.id) > 0 &&
                `(${getCartQuantity(product.id)})`}
            </button>
          </div>
        ))}
      </div>
      <Link
        to="/cart"
        className="fixed top-4 right-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
      </Link>
    </div>
  );
}

export default ProductList;
