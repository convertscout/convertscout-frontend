import React, { useEffect } from "react";
import "../styles/pay-signup.css";

const PaySignup = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAA_5TVV3AMTOmQKA3cZPtKPEtofQZ1B0NDaI30qx9TMSjG5btXuua0Q7PtVTo-zWN4q-3kkusTtIWi3-I&components=hosted-buttons&disable-funding=venmo&currency=USD";
    script.async = true;
    script.onload = () => {
      window.paypal.HostedButtons({
        hostedButtonId: "R86CJFD6EKQ9W",
      }).render("#paypal-container-R86CJFD6EKQ9W");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center px-4">
          <h1 className="font-bold text-2xl text-[#333333]">ConvertScout</h1>
          <span className="text-sm text-[#FF6F61] font-medium">#BETA</span>
        </div>

        <div className="py-16">
          <div className="w-full max-w-4xl mx-auto">
            <div id="payment-section">
              <h2 className="text-3xl font-bold text-[#FF6F61] mb-2 text-center">
                Become a Founding Member of ConvertScout 🚀
              </h2>
              <p className="text-[#333333] mb-8 text-center text-lg">
                One-time payment. Lifetime access to early-stage power.
              </p>

              <div className="text-center text-[#666666] max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
                You’ll help us build the most powerful scraping tool for founders—
                across Reddit, X, Facebook, Capterra, G2, and niche forums.
                <br />
                No subscription. No renewal. Just <strong>$199 one-time</strong> to unlock:
              </div>

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
                    All the real-time buyer intent across every platform—no limits.
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
                    Smart AI Filtering
                  </h3>
                  <p className="text-[#666666] text-sm">
                    Our models find the *frustration signals* that indicate buying intent.
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
                    Competitive Intel
                  </h3>
                  <p className="text-[#666666] text-sm">
                    See what your competitors are doing wrong—and use it to grow.
                  </p>
                </div>
              </div>

              {/* PayPal Hosted Button */}
              <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6">
                <div
                  id="paypal-container-R86CJFD6EKQ9W"
                  className="border border-[#FF6F61] p-4 rounded-lg"
                ></div>
              </div>
            </div>

            {/* Back to Dashboard */}
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