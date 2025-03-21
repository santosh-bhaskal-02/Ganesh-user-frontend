import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Shipping and Delivery Policy
        </h1>
        <p className="text-gray-700 leading-relaxed">
          You hereby agree that the delivery dates are estimates, unless a fixed date for
          the delivery has been expressly agreed in writing. The cost for delivery shall
          be calculated at the time of initiation of the transaction based on the shipping
          address and will be collected from you as a part of the transaction amount paid
          for the products and/or services.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          In the event that you do not receive the delivery even after seven days have
          passed from the estimated date of delivery, you must promptly reach out to us
          at:
        </p>
        <p className="text-gray-700 font-semibold mt-4">
          Email:{" "}
          <a
            href="mailto:santoshbhaskal2127@gmail.com"
            className="text-blue-600 hover:underline">
            santoshbhaskal2127@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
