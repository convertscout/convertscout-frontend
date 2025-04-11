import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Chart from "chart.js/auto";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [formData, setFormData] = useState(null);
  const [scrapedData, setScrapedData] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch leads for user from Firestore
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;
  
    const fetchLeads = async () => {
      try {
        const res = await fetch(`https://convertscout-backend.onrender.com/api/leads/${email}`);
        const result = await res.json();
        const latest = result?.data?.[0];
        setLeads(result.data || []);
        setFilteredLeads(result.data || []);
  
        if (latest?.reddit?.leads?.length > 0) {
          setScrapedData({
            leads: latest.reddit.leads,
            competitor_complaints: latest.reddit.competitorComplaints,
            company_complaints: latest.reddit.companyComplaints,
          });
        }
  
        if (latest?.businessName && latest?.niche) {
          setFormData({
            businessName: latest.businessName,
            niche: latest.niche,
          });
        }
      } catch (err) {
        console.error("❌ Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeads();
  }, []);
  

  // ✅ Chart rendering
  useEffect(() => {
    if (!scrapedData) return;

    const sourcesData = {
      labels: ["Reddit", "G2", "Capterra"],
      datasets: [
        {
          label: "Leads",
          data: [
            scrapedData.leads.filter((lead) => lead.platform === "Reddit").length,
            scrapedData.leads.filter((lead) => lead.platform === "G2").length,
            scrapedData.leads.filter((lead) => lead.platform === "Capterra").length,
          ],
          backgroundColor: "#FF6F61",
          borderColor: "#E45A4E",
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 16,
        },
      ],
    };

    const sourceCtx = document.getElementById("sourceChart")?.getContext("2d");
    if (sourceCtx) {
      new Chart(sourceCtx, {
        type: "bar",
        data: sourcesData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
          scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
        },
      });
    }

    const complaintsData = {
      labels: ["Slow", "Cost", "Bugs"],
      datasets: [
        {
          data: [40, 30, 20],
          backgroundColor: ["#FF6F61", "#E55A4B", "#FF8C7A"],
          borderWidth: 0,
        },
      ],
    };

    const complaintsCtx = document.getElementById("complaintsChart")?.getContext("2d");
    if (complaintsCtx) {
      new Chart(complaintsCtx, {
        type: "pie",
        data: complaintsData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "top" } },
        },
      });
    }

    const leadCards = document.querySelectorAll(".lead-card");
    leadCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate-fade-in-up");
    });
  }, [scrapedData]);

  // ✅ Loader state
  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-[#FF6F61] font-medium animate-pulse">
        🔍 Scraping in progress... Please hang tight while we find your leads!
      </div>
    );
  }

  // ✅ No leads fallback
  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-[#999] font-medium">
        No data available. Try again or wait a few seconds.
      </div>
    );
  }
  
  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-[#999] font-medium">
        No data available. Try again or wait a few seconds.
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center px-4">
          <h1 className="font-bold text-2xl text-[#333333]">ConvertScout</h1>
          <button
            id="login-btn"
            className="bg-[#FF6F61] text-white hover:bg-[#E55A4B] hover:shadow-md transition-all px-4 py-2 rounded-md text-sm"
            onClick={() => alert("Login to unlock full dashboard—subscribe first!")}
          >
            Login
          </button>
        </div>

        <div className="py-8">
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#FF6F61]">
                  Welcome, {formData.businessName}
                </h1>
                <div className="flex items-center mt-2">
                  <div className="h-1 w-10 bg-[#FF6F61] mr-3"></div>
                  <p className="text-[#333333]">
                    We found leads for{" "}
                    <span className="font-semibold">{formData.niche} solutions</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Hot Leads Section */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-2xl font-bold text-[#FF6F61] mb-4">🔥 Hot Leads</h2>
                    <div id="leads-list" className="space-y-4">
                    {filteredLeads.length === 0 && (
                     <div className="text-sm text-center text-gray-500">
                         No data found. We're still fetching leads. Try refreshing in a few seconds!
                      </div>
                        )}
                    {filteredLeads.map((lead, index) => (
                        <div
                          key={index}
                          className="lead-card bg-white border border-[#FF6F61]/20 shadow-lg rounded-xl p-4"
                        >
                          <div className="flex items-start">
                            <img
                              src={`https://i.pravatar.cc/300?img=${index + 1}`}
                              alt={lead.username}
                              className="h-10 w-10 rounded-full mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <h3 className="text-base font-semibold text-[#333333] mr-2">
                                  {lead.username}
                                </h3>
                                <span
                                  className="text-sm"
                                  style={{
                                    color:
                                      lead.platform === "Reddit"
                                        ? "#FF4500"
                                        : lead.platform === "𝕏"
                                        ? "#1DA1F2"
                                        : "#0077B5",
                                  }}
                                >
                                  {lead.platform}
                                </span>
                                <span className="text-xs text-[#666666] ml-1">
                                  {new Date(lead.time).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-[#666666] mb-2 line-clamp-2">
                                {lead.text}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm font-bold ${
                                    lead.match >= 95
                                      ? "text-green-500"
                                      : "text-yellow-500"
                                  }`}
                                >
                                  {lead.match}% Match
                                </span>
                                <a
                                  href={lead.connect_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-white bg-[#FF6F61] hover:bg-[#E55A4B] py-1 px-3 rounded-full"
                                >
                                  Connect
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More leads like @user6, @user7, @user8...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Competitor Complaints */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-2xl font-bold text-[#FF6F61] mb-4">
                      🕵️ Competitor Complaints
                    </h2>
                    <div className="space-y-4">
                    {filteredComplaints.competitor_complaints.map((complaint, index) => (
                        <div
                          key={index}
                          className="bg-white border border-[#FF6F61]/20 shadow-lg rounded-xl p-4"
                        >
                          <p className="text-sm text-[#666666]">
                            <span className="font-semibold text-[#333333]">
                              {complaint.username}:
                            </span>{" "}
                            {complaint.text}
                          </p>
                          <span
                            className="text-xs"
                            style={{
                              color:
                                complaint.platform === "Reddit"
                                  ? "#FF4500"
                                  : complaint.platform === "𝕏"
                                  ? "#1DA1F2"
                                  : "#0077B5",
                            }}
                          >
                            {complaint.platform} ·{" "}
                            {new Date(complaint.time).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More complaints from @CompetitorX, @RivalY...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Complaints About Your Company */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-2xl font-bold text-[#FF6F61] mb-4">
                      ⚠️ Complaints About Your Company
                    </h2>
                    <div className="space-y-4">
                    {filteredComplaints.company_complaints.map((complaint, index) => (
                        <div
                          key={index}
                          className="bg-white border border-[#FF6F61]/20 shadow-lg rounded-xl p-4"
                        >
                          <p className="text-sm text-[#666666]">
                            <span className="font-semibold text-[#333333]">
                              {complaint.username}:
                            </span>{" "}
                            {complaint.text}
                          </p>
                          <span
                            className="text-xs"
                            style={{
                              color:
                                complaint.platform === "Reddit"
                                  ? "#FF4500"
                                  : complaint.platform === "𝕏"
                                  ? "#1DA1F2"
                                  : "#0077B5",
                            }}
                          >
                            {complaint.platform} ·{" "}
                            {new Date(complaint.time).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More feedback from @ClientZ, @UserW...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Lead Sources Bar Chart */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-[#333333] mb-3">
                      📊 Lead Sources
                    </h2>
                    <div className="h-60 w-full">
                      <canvas id="sourceChart"></canvas>
                    </div>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More sources like LinkedIn, Quora...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Complaints Pie Chart */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-[#333333] mb-3">
                      📈 Complaint Types
                    </h2>
                    <div className="h-60 w-full">
                      <canvas id="complaintsChart"></canvas>
                    </div>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More complaints like usability, support...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Pain Point Insights */}
                  <div className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-5">
                    <h2 className="text-lg font-semibold text-[#333333] mb-3">
                      💡 Pain Point Insights
                    </h2>
                    <ul className="space-y-2 text-[#666666]">
                      <li>40% complain about slow tools</li>
                      <li>30% hate high costs</li>
                      <li>20% report buggy software</li>
                    </ul>
                    <div className="relative mt-6">
                      <div className="p-4 bg-white rounded-lg blur-sm">
                        <p className="text-[#666666] text-sm">
                          More insights on performance, pricing...
                        </p>
                      </div>
                      <div className="absolute inset-0 glass-overlay flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="mx-auto mb-2 text-[#FF6F61] h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 11V7a5 5 0 0 1 10 0v4M7 11h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V11z"
                            />
                          </svg>
                          <a
                            href="/pay-signup"
                            className="inline-block bg-[#FF6F61] hover:bg-[#E55A4B] text-white font-medium py-2 px-4 rounded-md"
                          >
                            Unlock Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;