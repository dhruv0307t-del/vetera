// "use client";
// import React from "react";
// import { useAppointments } from "@/context/AppointmentsContext";

// const ViewAppointments = () => {
//   const { appointments } = useAppointments();

//   return (
//     <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8 font-titillium">
//       <h1 className="text-3xl font-bold text-blue-950 mb-6 text-center">
//         Your Appointments
//       </h1>
//       {appointments.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-12">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
//             alt="No appointments"
//             className="w-24 h-24 mb-4 opacity-60"
//           />
//           <p className="text-gray-500 text-lg">
//             No appointments yet.
//             <br />
//             Book your first appointment!
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {appointments.map((a, i) => (
//             <div
//               key={i}
//               className="border border-blue-100 rounded-xl p-6 bg-[var(--color-off-white)] shadow hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-blue-950 font-semibold text-lg">
//                   {a.service}
//                 </span>
//                 <span className="bg-blue-950 text-white px-3 py-1 rounded text-xs">
//                   {a.date} {a.time}
//                 </span>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
//                 <div>
//                   <span className="font-semibold">Name:</span> {a.name}
//                 </div>
//                 <div>
//                   <span className="font-semibold">Email:</span> {a.email}
//                 </div>
//                 <div>
//                   <span className="font-semibold">Phone:</span> {a.phone}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default ViewAppointments;
