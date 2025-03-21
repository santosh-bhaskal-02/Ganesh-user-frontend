import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          Refund and Cancellation Policy
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Upon completing a Transaction, you are entering into a legally binding and
          enforceable agreement with us to purchase the product and/or service. After this
          point, the User may cancel the Transaction unless it has been specifically
          provided for on the Platform. In which case, the cancellation will be subject to
          the terms mentioned on the Platform.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          We shall retain the discretion in approving any cancellation requests and we may
          ask for additional details before approving any requests. Once you have received
          the product and/or service, the only event where you can request a replacement
          or a refund is if the product and/or service does not match the description
          mentioned on the Platform.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Any request for a refund must be submitted within three days from the date of
          the Transaction or the number of days prescribed on the Platform, which shall in
          no event be less than three days. A User may submit a claim for a refund for a
          purchase made by raising a ticket here or contacting us at:
        </p>
        <p className="text-gray-700 font-semibold mt-4">
          Email:{" "}
          <a
            href="mailto:seller+88f4aadca6514d668731be46f4d93636@instamojo.com"
            className="text-blue-600 hover:underline">
            santoshbhaskal2127@gmail.com
          </a>
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          The request must include a clear and specific reason for the refund request,
          including the exact terms that have been violated, along with any proof, if
          required. Whether a refund will be provided will be determined by us, and we may
          ask for additional details before approving any requests.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
