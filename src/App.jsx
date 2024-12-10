import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ThankYou from "./components/ThankYou";
import PaymentFailed from "./components/PaymentFailed";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
