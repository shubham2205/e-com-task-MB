import React from 'react';
import { Link } from 'react-router-dom';

function PaymentFailed() {
  return (
    <div className="text-center flex justify-center items-center flex-col h-screen">
      <h1 className="text-3xl font-bold mb-4 text-red-500">Payment Failed</h1>
      <p className="mb-4">there was an issue processing your payment.</p>
      <Link to="/checkout" className="text-orange-600 hover:text-blue-700">
        Try Again
      </Link>
    </div>
  );
}

export default PaymentFailed;

