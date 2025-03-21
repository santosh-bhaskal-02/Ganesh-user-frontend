import React from "react";

const PaymentsPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Payments Policy</h1>

        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          How do I pay for an idol booking?
        </h2>
        <p className="text-gray-700 mt-2">
          We use <span className="font-semibold">RazorPay</span> as our exclusive payment
          gateway, ensuring a secure and hassle-free payment experience. You can pay
          using:
        </p>
        <ul className="list-disc pl-5 text-gray-700 mt-2">
          <li>Credit/Debit Cards (Visa, MasterCard, Rupay, etc.)</li>
          <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
          <li>Net Banking</li>
          <li>Wallets & EMI (if available on Razorpay)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          Are there any hidden charges?
        </h2>
        <p className="text-gray-700 mt-2">
          No, there are no hidden charges. The price you see on the product page is the
          final amount you pay. Delivery charges (if applicable) will be shown at
          checkout.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          Is it safe to pay through Instamojo?
        </h2>
        <p className="text-gray-700 mt-2">
          Yes! RazorPay uses **256-bit encryption** to secure transactions, ensuring your
          payment details remain confidential and protected at all times.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          How do I contact support for payment issues?
        </h2>
        <p className="text-gray-700 mt-2">
          If you face any issues with your payment, please reach out to us at:
        </p>
        <p className="text-gray-700 font-semibold mt-2">
          Email:{" "}
          <a
            href="santoshbhaskal2127@gmail.com"
            className="text-blue-600 hover:underline">
            santoshbhaskal2127@gmail.com
          </a>
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          Refund & Cancellation
        </h2>
        <p className="text-gray-700 mt-2">
          Refunds and cancellations are subject to our{" "}
          <a href="/refund-policy" className="text-blue-600 hover:underline">
            Refund Policy
          </a>
          . Please ensure you read the terms before making a purchase.
        </p>
      </div>
    </div>
  );
};

export default PaymentsPolicy;
