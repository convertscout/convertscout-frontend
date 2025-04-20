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
            <h2 className="text-3xl font-bold text-[#FF6F61] mb-2 text-center">
              Become a Founding Member of ConvertScout 🚀
            </h2>
            <p className="text-[#333333] mb-6 text-center text-lg">
              Join early. Get more. Only $199 one-time.
            </p>

            <div className="text-center text-[#666666] max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
              You’re backing a new lead finder built for growth-minded founders—
              pulling high-signal leads from Reddit, X, Facebook, G2, Capterra,
              and niche forums. No subscriptions. No hidden fees.
              Just a one-time contribution to shape the future of lead generation.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Unlimited Leads */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Unlimited Leads</h3>
                <p className="text-[#666666] text-sm">
                  Access everything—no caps or limits. Always-on discovery.
                </p>
              </div>

              {/* Smart AI Filtering */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Smart AI Filtering</h3>
                <p className="text-[#666666] text-sm">
                  Our AI finds frustrated buyers, not just noise.
                </p>
              </div>

              {/* Competitor Intel */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Competitor Intel</h3>
                <p className="text-[#666666] text-sm">
                  Monitor your rivals and win where they’re losing.
                </p>
              </div>

              {/* 2 Months Access */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">🚀 2 Months Access</h3>
                <p className="text-[#666666] text-sm">
                  Get full access for 60 days—more than enough to test ROI.
                </p>
              </div>

              {/* Multi-Platform Reach */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">🧠 Multi-Platform Reach</h3>
                <p className="text-[#666666] text-sm">
                  Pull leads from Reddit, X, Facebook, Capterra, G2 & more.
                </p>
              </div>

              {/* Founding Badge */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">💎 Founding Badge</h3>
                <p className="text-[#666666] text-sm">
                  A “Founding Member” tag permanently displayed on your dashboard.
                </p>
              </div>

              {/* One-Time Payment */}
              <div className="bg-white/90 border border-white/30 shadow-xl rounded-xl p-6 text-center col-span-1 md:col-span-3">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">🔒 One-Time Payment</h3>
                <p className="text-[#666666] text-sm">
                  $199 once. No subscriptions. Ever.
                </p>
              </div>
            </div>

            {/* PayPal Button Box */}
            <div className="max-w-lg mx-auto bg-white/90 border border-[#FF6F61]/50 shadow-xl rounded-xl p-6 mb-12">
              <h3 className="text-xl font-bold text-[#FF6F61] text-center mb-4">
                Lock In Your Access — $199
              </h3>
              <div
                id="paypal-container-R86CJFD6EKQ9W"
                className="border border-[#FF6F61] p-4 rounded-lg"
              ></div>
            </div>

            {/* Back to Dashboard */}
            <div className="text-center">
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