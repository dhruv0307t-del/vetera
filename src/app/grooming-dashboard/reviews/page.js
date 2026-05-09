"use client";
import React from "react";
import { FaReply, FaStar, FaUserCircle } from "react-icons/fa";

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      customer: "Alice Smith",
      rating: 5,
      comment: "Sarah did an amazing job with Buddy! He's never looked better. The service was professional and very caring.",
      date: "2026-05-08",
      service: "Full Grooming",
      replied: false,
    },
    {
      id: 2,
      customer: "Emily Rose",
      rating: 4,
      comment: "Good experience, Misty was comfortable during the bath. Wait time was a bit longer than expected though.",
      date: "2026-05-07",
      service: "Bath & Dry",
      replied: true,
      reply: "Thank you Emily! We're glad Misty was comfortable. We're working on optimizing our scheduling to reduce wait times.",
    },
    {
      id: 3,
      customer: "John Doe",
      rating: 5,
      comment: "Excellent nail trimming service. Very quick and stress-free for my dog.",
      date: "2026-05-05",
      service: "Nail Trimming",
      replied: false,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={i < rating ? "text-amber-400" : "text-slate-200"} />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Customer Reviews</h1>
        <p className="text-slate-500 text-sm">Monitor and respond to your grooming shop feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <p className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">Overall Rating</p>
            <h2 className="text-6xl font-black text-slate-800">4.8</h2>
            <div className="flex justify-center gap-1 my-4">
              {renderStars(5)}
            </div>
            <p className="text-xs font-bold text-slate-500">Based on 342 Verified Reviews</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800">Rating Breakdown</h3>
            {[5, 4, 3, 2, 1].map((r) => (
              <div key={r} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 w-4">{r}★</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full" 
                    style={{ width: `${r === 5 ? 80 : r === 4 ? 15 : 5}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-400 w-8">{r === 5 ? '80%' : r === 4 ? '15%' : '5%'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <FaUserCircle className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{review.customer}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5 text-[10px]">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-black">• {review.date}</span>
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {review.service}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{review.comment}"
              </p>

              {review.replied ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 ml-4 relative">
                  <div className="absolute top-0 left-[-10px] w-4 h-4 bg-slate-50 rotate-45 border-l border-t border-slate-100"></div>
                  <p className="text-xs font-black text-pink-500 uppercase tracking-wider mb-1">Your Reply</p>
                  <p className="text-xs text-slate-500">{review.reply}</p>
                </div>
              ) : (
                <button className="flex items-center gap-2 text-xs font-black text-pink-500 uppercase tracking-wider hover:underline pt-2">
                  <FaReply /> Respond to review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
