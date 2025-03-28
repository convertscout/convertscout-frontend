import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pay-signup.css";

const PaySignup = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Load PayPal SDK dynamically
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUygnfZj64C_ImWfiYL3Vo2rG0sQ0_hU1ZK1mOKb5gPiKufy7-Y4IW0PVgD-sUEG1sLTRlbrrG8Muqnz&vault=true&intent=subscription";
    script.setAttribute("data-sdk-integration-source", "button-factory");
    script.async = true;
    script.onload = () => {
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "paypal",
          },
          createSubscription: (data, actions) => {
            return actions.subscription.create({
              plan_id: "P-1NH848553U860034RM7SP5QI",
            });
          },
          onApprove: (data) => {
            alert("Subscription successful! Subscription ID: " + data.subscriptionID);
            setShowSignup(true);
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("An error occurred during the payment process. Please try again.");
          },
        })
        .render("#paypal-button-container-P-1NH848553U860034RM7SP5QI");
    };
    document.body.appendChild(script);
  }, []);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    alert("Account created! Redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center px-4">
          <h1 className="font-bold text-2xl text-[#333333]">ConvertScout</h1>
          <button
            id="login-btn"
            className="bg-[#FF6F61] text-white hover:bg-[#E55A4B] hover:shadow-md transition-all px-4 py-2 rounded-md text-sm"
            onClick={() => alert("Login to access your full dashboard!")}
          >
            Login
          </button>
        </div>

        <div className="py-16">
          <div className="w-full max-w-4xl mx-auto">
            {/* Payment Section */}
            <div id="payment-section" className={showSignup ? "hidden" : ""}>
              <h2 className="text-3xl font-bold text-[#FF6F61] mb-2 text-center">
                Unlock the Full Power of ConvertScout
              </h2>
              <p className="text-[#333333] mb-8 text-center text-lg">
                Everything you need to find leads and crush your growth goals—$79/mo
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-[#FF6F61] h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Unlimited Leads
                  </h3>
                  <p className="text-[#666666] text-sm">
                    Access every lead we find—no caps, no limits.
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-[#FF6F61] h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Real-Time Insights
                  </h3>
                  <p className="text-[#666666] text-sm">
                    Fresh data on complaints and pain points, updated hourly.
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6 text-center">
                  <svg
                    className="mx-auto mb-4 text-[#FF6F61] h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Competitor Intel
                  </h3>
                  <p className="text-[#666666] text-sm">
                    See what your competitors are doing wrong—and capitalize.
                  </p>
                </div>
              </div>
              <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6">
                <div
                  id="paypal-button-container-P-1NH848553U860034RM7SP5QI"
                  className="border border-[#FF6F61] p-4 rounded-lg"
                ></div>
              </div>
            </div>
            {/* Signup Section */}
            <div
              id="signup-section"
              className={`max-w-md mx-auto bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6 mt-6 ${
                showSignup ? "" : "hidden"
              }`}
            >
              <h2 className="text-2xl font-bold text-[#FF6F61] mb-2 text-center">
                You’re In—Claim Your Account
              </h2>
              <p className="text-[#333333] mb-6 text-center">
                Sign up to unleash your leads
              </p>
              <form className="space-y-6" onSubmit={handleSignupSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[#333333] font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@business.com"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[#333333] font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                >
                  Sign Up
                </button>
              </form>
            </div>
            {/* Back to Dashboard Button */}
            <div className="mt-12 text-center">
              <a
                href="/dashboard"
                className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-6 rounded-md"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaySignup;