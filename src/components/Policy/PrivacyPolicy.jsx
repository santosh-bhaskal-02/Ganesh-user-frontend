import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-100 text-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-center text-gray-600">
        <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
      </p>

      <p className="mt-4">
        Welcome to{" "}
        <strong>
          <a
            href="https://ganesh-museum.onrender.com"
            className="text-blue-600 hover:underline">
            ganesh-museum.onrender.com
          </a>
        </strong>
        . We are committed to protecting your privacy and ensuring your personal
        information is handled securely and responsibly.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <h3 className="text-lg font-semibold mt-4">a) Personal Information</h3>
      <ul className="list-disc pl-6">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Payment details (processed securely via Razorpay)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">b) Non-Personal Information</h3>
      <ul className="list-disc pl-6">
        <li>Browser type and version</li>
        <li>Device type</li>
        <li>IP address</li>
        <li>Cookies and usage data</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6">
        <li>Process bookings and payments</li>
        <li>Improve our website and services</li>
        <li>Provide customer support</li>
        <li>Send updates and promotional offers (you can opt out anytime)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">3. Payment Security</h2>
      <p>
        We use <strong>Razorpay</strong> to process payments securely. We do not store
        your payment details on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Cookies and Tracking</h2>
      <ul className="list-disc pl-6">
        <li>Remember user preferences</li>
        <li>Analyze site traffic and performance</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">5. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell or rent your personal information. However, we may
        share data with:
      </p>
      <ul className="list-disc pl-6">
        <li>Payment processors (e.g., Razorpay)</li>
        <li>Law enforcement if required by law</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">6. Data Security</h2>
      <p>
        We take necessary precautions to protect your data, but no system is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6">7. Your Rights</h2>
      <ul className="list-disc pl-6">
        <li>Access, update, or delete your personal data</li>
        <li>Opt out of promotional emails</li>
        <li>Disable cookies in your browser</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time.</p>

      <h2 className="text-2xl font-semibold mt-6">9. Contact Us</h2>
      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:santoshbhaskal2127@gmail.com"
          className="text-blue-600 hover:underline">
          santoshbhaskal2127@gmail.com
        </a>
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href="https://ganesh-museum.onrender.com"
          className="text-blue-600 hover:underline">
          ganesh-museum.onrender.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
