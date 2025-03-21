import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> {Date.now}
      </p>

      <p>
        Welcome to{" "}
        <strong>
          <a href="https://ganesh-museum.onrender.com">
            "https://ganesh-museum.onrender.com"
          </a>
        </strong>{" "}
        ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
        your personal information is handled securely and responsibly.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>a) Personal Information</h3>
      <p>When you sign up or book an idol, we may collect:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Payment details (processed securely via Razorpay)</li>
      </ul>

      <h3>b) Non-Personal Information</h3>
      <p>We may collect data such as:</p>
      <ul>
        <li>Browser type and version</li>
        <li>Device type</li>
        <li>IP address</li>
        <li>Cookies and usage data</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Process bookings and payments</li>
        <li>Improve our website and services</li>
        <li>Provide customer support</li>
        <li>Send updates and promotional offers (you can opt out anytime)</li>
      </ul>

      <h2>3. Payment Security</h2>
      <p>
        We use <strong>Razorpay</strong> to process payments securely. We do not store
        your payment details on our servers.
      </p>

      <h2>4. Cookies and Tracking Technologies</h2>
      <p>We use cookies to:</p>
      <ul>
        <li>Remember user preferences</li>
        <li>Analyze site traffic and performance</li>
      </ul>
      <p>You can disable cookies in your browser settings.</p>

      <h2>5. Sharing of Information</h2>
      <p>
        We do <strong>not</strong> sell or rent your personal information. However, we may
        share data with:
      </p>
      <ul>
        <li>Payment processors (e.g., Razorpay)</li>
        <li>Law enforcement if required by law</li>
      </ul>

      <h2>6. Data Security</h2>
      <p>
        We take necessary precautions to protect your data from unauthorized access,
        alteration, or loss. However, no online system is 100% secure.
      </p>

      <h2>7. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete your personal data</li>
        <li>Opt out of promotional emails</li>
        <li>Disable cookies in your browser</li>
      </ul>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on
        this page with an updated <strong>effective date</strong>.
      </p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions, contact us at:</p>
      <p>
        <strong>Email:</strong> santoshbhaskal2127@gmail.com
      </p>
      <p>
        <strong>
          Website:
          <a href="https://ganesh-museum.onrender.com">
            "https://ganesh-museum.onrender.com"
          </a>
        </strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
