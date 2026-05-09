"use client";
import { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Stars = ({ rating }) => (
  <div className="flex gap-0.5 text-yellow-400">
    {[1,2,3,4,5].map(i => i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />)}
  </div>
);

const BAR_COLORS = { 5: "bg-green-500", 4: "bg-lime-500", 3: "bg-yellow-400", 2: "bg-orange-400", 1: "bg-red-500" };

export default function ReviewsPage() {
  const [data, setData] = useState({ reviews: [], avgRating: 0, breakdown: {}, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`/api/vet/reviews?userId=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(() => toast.error("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading reviews...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Reviews & Ratings</h1>
      <p className="text-slate-500 mb-8">See what pet owners are saying about your consultations.</p>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow-sm border p-8 flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="text-center">
          <div className="text-7xl font-extrabold text-yellow-500">{data.avgRating}</div>
          <Stars rating={Math.round(data.avgRating)} />
          <p className="text-slate-400 text-sm mt-2">{data.total} reviews</p>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {[5,4,3,2,1].map(star => {
            const count = data.breakdown[star] || 0;
            const pct = data.total > 0 ? Math.round((count / data.total) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-600 w-4">{star}</span>
                <FaStar className="text-yellow-400 text-sm" />
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className={`${BAR_COLORS[star]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm text-slate-400 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {data.reviews.map(r => (
          <div key={r._id} className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-slate-800">{r.petOwnerId?.fullName || "Anonymous"}</p>
                <p className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
              <Stars rating={r.rating} />
            </div>
            {r.comment && <p className="text-slate-600 text-sm leading-relaxed">&quot;{r.comment}&quot;</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
