// "use client";
// import React from "react";
// import { useAppointments } from "../../context/AppointmentsContext";

// const AppointmentsList = () => {
//   const { appointments, cancelAppointment } = useAppointments();

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Appointments</h2>

//       {appointments.length === 0 ? (
//         <p className="text-gray-500">No appointment found.</p>
//       ) : (
//         appointments.map((appt) => (
//           <div
//             key={appt.id}
//             className={`p-4 mb-4 rounded border ${
//               appt.status === "Cancelled"
//                 ? "border-red-400 bg-red-50"
//                 : "border-green-400 bg-green-50"
//             }`}
//           >
//             <p>
//               <strong>Name:</strong> {appt.name}
//             </p>
//             <p>
//               <strong>Date:</strong> {appt.date}
//             </p>
//             <p>
//               <strong>Time:</strong> {appt.time}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`font-semibold ${
//                   appt.status === "Cancelled"
//                     ? "text-red-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 {appt.status}
//               </span>
//             </p>
//             {appt.status !== "Cancelled" && (
//               <button
//                 onClick={() => cancelAppointment(appt.id)}
//                 className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AppointmentsList;
