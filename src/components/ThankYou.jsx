import React from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="mb-4">Your order has been successfully processed.</p>
      <Link to="/" className="text-orange-600 hover:text-blue-700">
        Continue Shopping
      </Link>
    </div>
  );
}

export default ThankYou;

