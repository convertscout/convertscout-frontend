import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    niche: "",
    competitor: "",
    email: "",
    targetCustomer: "",
    industryKeywords: "",
    painSummary: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔁 Fake animation loop for beta progress
  useEffect(() => {
    let timer;
    if (isLoading && progress < 90) {
      timer = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isLoading, progress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(5);

    try {
      localStorage.setItem("userEmail", formData.email);

      const res = await fetch("https://convertscout-backend.onrender.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      // 🚫 Future use: Real scraping wait logic
      /*
      const ready = await waitForScrapedData(formData.email);
      if (ready) {
        setProgress(100);
        navigate("/dashboard");
      }
      */

      // ✅ Simulate short wait then redirect
      setTimeout(() => {
        setProgress(100);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF6F61]/10 to-[#FF6F61]/5">
      <div className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <span className="bg-[#FF6F61]/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            #BETA
          </span>
        </div>

        <div className="py-4 flex items-center justify-center">
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
                  <label>Who is your target customer?</label>
                  <input
                    type="text"
                    name="targetCustomer"
                    placeholder="e.g., lawyers, real estate agents, consultants"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.targetCustomer}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Enter 2–3 keywords related to your industry</label>
                  <input
                    type="text"
                    name="industryKeywords"
                    placeholder="e.g., client intake, case tracking, contract drafting"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.industryKeywords}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>What's the #1 pain point your users face?</label>
                  <input
                    type="text"
                    name="painSummary"
                    placeholder="e.g., forgetting client follow-ups"
                    className="w-full px-4 py-2 border rounded-md"
                    value={formData.painSummary}
                    onChange={handleChange}
                    required
                  />
                </div>

                {isLoading ? (
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                    <div
                      className="bg-[#FF6F61] h-4 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                    <p className="text-sm text-center mt-2 text-[#FF6F61] font-medium">
                      {progress < 100 ? "Preparing your leads..." : "Leads ready!"}
                    </p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:translate-y-[-2px]"
                  >
                    Reveal My Leads
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;