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
    problemSolved: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const waitForScrapedData = async (email, maxAttempts = 10, interval = 3000) => {
    let attempts = 0;

    while (attempts < maxAttempts) {
      const res = await fetch(`https://convertscout-backend.onrender.com/api/leads/${email}`);
      const result = await res.json();
      const latest = result?.data?.[0];

      if (latest?.reddit?.leads?.length > 0) {
        return true;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://convertscout-backend.onrender.com/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      localStorage.setItem("userEmail", formData.email);

      // Wait for scraped data to become available
      const ready = await waitForScrapedData(formData.email);

      if (ready) {
        navigate("/dashboard");
      } else {
        alert("Leads are still being processed. Please try again shortly.");
      }
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Failed to generate leads. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF6F61]/10 to-[#FF6F61]/5">
      <div className="container mx-auto px-4 py-8">
        <div className="py-16 flex items-center justify-center">
          <div className="w-full max-w-md relative z-10">
            <div className="relative bg-white rounded-xl shadow-lg p-8 border border-white/30">
              <h2 className="text-3xl font-bold text-[#FF6F61] mb-2 text-center">
                Your Customers Are Screaming—We'll Find Them
              </h2>
              <p className="text-[#333333] mb-8 text-center font-medium text-lg">
                Give us your business details, and watch leads roll in
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="e.g., Acme Solutions"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>What Problem Do You Solve?</label>
                  <input
                    type="text"
                    name="niche"
                    placeholder="e.g., slow shipping, buggy CRM"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Competitor Name (optional)</label>
                  <input
                    type="text"
                    name="competitor"
                    placeholder="e.g., Hubspot"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.competitor}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@business.com"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Describe the Pain You Solve</label>
                  <input
                    type="text"
                    name="problemSolved"
                    placeholder="e.g., managing leads, reducing churn"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.problemSolved}
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