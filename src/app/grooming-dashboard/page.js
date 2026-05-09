"use client";
import { FaCalendarCheck, FaMoneyBillWave, FaUsers, FaCut, FaStar, FaArrowUp } from "react-icons/fa";

export default function GroomingDashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Shop Overview</h1>
        <p className="text-slate-500 mt-1">Here is the performance of your grooming shop today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
              <FaCalendarCheck />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Bookings Today</p>
              <h3 className="text-2xl font-black text-slate-800">24</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1"><FaArrowUp /> 12% vs Yesterday</p>
        </div>

        {/* Revenue Today */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
              <FaMoneyBillWave />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenue Today</p>
              <h3 className="text-2xl font-black text-slate-800">₹14,500</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-500 flex items-center gap-1"><FaArrowUp /> 5% vs Yesterday</p>
        </div>

        {/* Active Groomers */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-xl">
              <FaCut />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Staff</p>
              <h3 className="text-2xl font-black text-slate-800">5 / 6</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400">1 Groomer on Leave</p>
        </div>

        {/* Customer Rating */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl">
              <FaStar />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Shop Rating</p>
              <h3 className="text-2xl font-black text-slate-800">4.8</h3>
            </div>
          </div>
          <p className="text-xs font-bold text-emerald-500">Based on 342 Reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Upcoming Appointments</h2>
            <button className="text-sm font-bold text-pink-500 hover:text-pink-600">View All</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Pet / Owner</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Groomer</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">10:00 AM</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">Bella (Golden Retriever)</p>
                    <p className="text-xs text-slate-500">John Doe</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Full Spa & Haircut</td>
                  <td className="px-6 py-4 text-slate-600">Sarah</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-black uppercase">In Progress</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-800">11:30 AM</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">Max (Persian Cat)</p>
                    <p className="text-xs text-slate-500">Emily R.</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Nail Trimming & Bath</td>
                  <td className="px-6 py-4 text-slate-600">Mike</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-black uppercase">Scheduled</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Booked Services */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Top Services</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-slate-700">Full Pet Spa</span>
                <span className="text-slate-500">45%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-slate-700">Haircut & Styling</span>
                <span className="text-slate-500">30%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-slate-700">Medicated Bath</span>
                <span className="text-slate-500">15%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <h3 className="font-bold text-slate-800 mb-2">Need Shampoo Stock?</h3>
            <p className="text-xs text-slate-500 mb-3">Inventory is running low on Dog Shampoo.</p>
            <button className="text-sm font-bold text-pink-500 hover:underline">Manage Inventory →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
