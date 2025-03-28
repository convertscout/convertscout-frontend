import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    niche: "",
    competitor: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    localStorage.setItem("formData", JSON.stringify(formData)); // Store form data for dashboard
    alert("Form submitted! Redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Background Posts */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF6F61]/10 to-[#FF6F61]/5 pointer-events-none"></div>
        <div
          className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transform transition-all duration-500 ease-in-out animate-float"
          style={{ top: "15%", left: "10%", maxWidth: "300px", filter: "blur(1px)" }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-[#FF6F61] font-bold">𝕏</div>
            <div>
              <div className="font-semibold text-[#333333]">@CRMFail</div>
              <p className="text-[#555555] text-sm">This software's a nightmare—need better!</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transform transition-all duration-500 ease-in-out animate-float"
          style={{ top: "30%", left: "60%", maxWidth: "300px", filter: "blur(1px)", animationDelay: "0.5s" }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-[#FF6F61] font-bold">r/</div>
            <div>
              <div className="font-semibold text-[#333333]">u/ShipSlow</div>
              <p className="text-[#555555] text-sm">Shipping delays killing me—any fixes?</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transform transition-all duration-500 ease-in-out animate-float"
          style={{ top: "45%", left: "10%", maxWidth: "300px", filter: "blur(1px)", animationDelay: "1s" }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-[#FF6F61] font-bold">𝕏</div>
            <div>
              <div className="font-semibold text-[#333333]">@SaaSStruggles</div>
              <p className="text-[#555555] text-sm">Why is every tool so complicated? Just need something simple!</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transform transition-all duration-500 ease-in-out animate-float"
          style={{ top: "60%", left: "60%", maxWidth: "300px", filter: "blur(1px)", animationDelay: "1.5s" }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-[#FF6F61] font-bold">r/</div>
            <div>
              <div className="font-semibold text-[#333333]">u/SupportWoes</div>
              <p className="text-[#555555] text-sm">48 hours and still no response from customer service. Moving on.</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transform transition-all duration-500 ease-in-out animate-float"
          style={{ top: "75%", left: "10%", maxWidth: "300px", filter: "blur(1px)", animationDelay: "2s" }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-[#FF6F61] font-bold">𝕏</div>
            <div>
              <div className="font-semibold text-[#333333]">@PriceShock</div>
              <p className="text-[#555555] text-sm">Just saw their new pricing. Anyone know alternatives?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl text-[#333333]">ConvertScout</h1>
          <button
            id="login-btn"
            className="bg-[#333333] text-white hover:bg-[#FF6F61] hover:shadow-md transition-all px-4 py-2 rounded-md text-sm"
            onClick={() => alert("Login to access your full dashboard!")}
          >
            Login
          </button>
        </div>

        <div className="py-16 flex items-center justify-center">
          <div className="w-full max-w-md relative z-10">
            <div className="relative bg-white rounded-xl shadow-lg p-8 border border-white/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/90 rounded-xl -z-10 backdrop-blur-sm"></div>

              <h2 className="text-3xl font-bold text-[#FF6F61] mb-2 text-center">
                Your Customers Are Screaming—We'll Find Them
              </h2>
              <p className="text-[#333333] mb-8 text-center font-medium text-lg">
                Give us your business details, and watch leads roll in
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="businessName" className="block text-[#333333] font-medium mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="e.g., Acme Solutions"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="niche" className="block text-[#333333] font-medium mb-1">
                    What Problem Do You Solve?
                  </label>
                  <input
                    type="text"
                    id="niche"
                    name="niche"
                    placeholder="e.g., slow shipping or buggy CRMs"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="competitor" className="block text-[#333333] font-medium mb-1">
                    Competitor Name (optional)
                  </label>
                  <input
                    type="text"
                    id="competitor"
                    name="competitor"
                    placeholder="e.g., HubSpot—optional"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50"
                    value={formData.competitor}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-[#333333] font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@business.com"
                    className="w-full px-4 py-2 rounded-md border border-[#FF6F61] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-opacity-50"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Reveal My Leads
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;