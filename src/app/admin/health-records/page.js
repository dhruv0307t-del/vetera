"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminHealthRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/health-record");
        const data = await res.json();
        if (data.success) {
          setRecords(data.data);
        } else {
          toast.error("Failed to load records.");
        }
      } catch (err) {
        toast.error("An error occurred fetching records.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold text-gray-600 animate-pulse">Loading Health Records...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-950 mb-8 border-b-2 border-blue-100 pb-4">Pet Health & Monitoring Logs</h1>
      
      {records.length === 0 ? (
        <p className="text-lg text-gray-500">No health records found.</p>
      ) : (
        <div className="grid gap-6">
          {records.map((record) => (
            <div key={record._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
              
              {/* Header */}
              <div 
                className="bg-gradient-to-r from-blue-50/50 to-white p-5 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                onClick={() => toggleExpand(record._id)}
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{record.petProfile?.petName || "Unknown Pet"}</h2>
                  <p className="text-sm font-medium text-blue-600 mt-1">
                    {record.petProfile?.species} • {record.petProfile?.breed} • {record.petProfile?.age} years old
                  </p>
                </div>
                
                <div className="flex flex-col md:items-end">
                  <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {record.healthLog?.bodyTemperature ? `Temp: ${record.healthLog.bodyTemperature}°C` : "Vitals N/A"}
                  </span>
                  <span className="text-xs text-gray-400 mt-2 font-medium">Logged: {new Date(record.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {expanded[record._id] && (
                <div className="p-6 border-t border-gray-100 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Activity */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-3">Activity & Lifestyle</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li><span className="font-semibold text-gray-800">Walk Duration:</span> {record.activity?.walkDuration} mins</li>
                        <li><span className="font-semibold text-gray-800">Playtime:</span> {record.activity?.playtime} mins</li>
                        <li><span className="font-semibold text-gray-800">Sleep:</span> {record.activity?.sleepDuration}h ({record.activity?.sleepQuality})</li>
                        <li><span className="font-semibold text-gray-800">Activity Level:</span> {record.activity?.activityLevel}</li>
                      </ul>
                    </div>

                    {/* Nutrition */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-3">Nutrition</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li><span className="font-semibold text-gray-800">Diet Type:</span> {record.nutrition?.foodType}</li>
                        <li><span className="font-semibold text-gray-800">Brand:</span> {record.nutrition?.foodBrand || 'N/A'}</li>
                        <li><span className="font-semibold text-gray-800">Meals/Day:</span> {record.nutrition?.feedingFrequency} @ {record.nutrition?.quantityPerMeal}g</li>
                        <li><span className="font-semibold text-gray-800">Water Intake:</span> {record.nutrition?.dailyWaterIntake}ml</li>
                      </ul>
                    </div>

                    {/* Medical / Symptoms */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3">Health & Symptoms</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-semibold text-gray-800">Vomiting/Diarrhea:</span> 
                          {record.healthLog?.vomiting ? " Yes" : " No"} / {record.healthLog?.diarrhea ? "Yes" : "No"}
                        </li>
                        <li><span className="font-semibold text-gray-800">Lethargy:</span> {record.healthLog?.lethargy}</li>
                        <li><span className="font-semibold text-gray-800">Pain Signs:</span> {record.healthLog?.painSigns ? "Yes" : "No"}</li>
                        <li><span className="font-semibold text-gray-800">Vaccines:</span> {record.medical?.vaccinationStatus}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
