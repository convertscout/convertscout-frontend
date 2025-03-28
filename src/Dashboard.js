import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "scraped_data", "latest");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Leads</h2>
      <ul>
        {data.leads.map((lead, index) => (
          <li key={index}>
            {lead.username} ({lead.platform}): {lead.text} -{" "}
            <a href={lead.connect_url} target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </li>
        ))}
      </ul>
      <h2>Competitor Complaints</h2>
      <ul>
        {data.competitor_complaints.map((complaint, index) => (
          <li key={index}>
            {complaint.username} ({complaint.platform}): {complaint.text} -{" "}
            <a href={complaint.connect_url} target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </li>
        ))}
      </ul>
      <h2>Company Complaints</h2>
      <ul>
        {data.company_complaints.map((complaint, index) => (
          <li key={index}>
            {complaint.username} ({complaint.platform}): {complaint.text} -{" "}
            <a href={complaint.connect_url} target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;