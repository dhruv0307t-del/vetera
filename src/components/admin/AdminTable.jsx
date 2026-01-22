"use client";
import React from "react";

/* =========================
   STATUS BADGE
========================= */
export const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
};

/* =========================
   APPROVE / REJECT BUTTONS
========================= */
export const ActionButtons = ({ id, status, refresh }) => {
  const handleAction = async (action) => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    refresh();
  };

  return (
    <div className="flex gap-2">
      {(status === "Pending" || status === "Rejected") && (
        <button
          onClick={() => handleAction("approve")}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Approve
        </button>
      )}

      {(status === "Pending" || status === "Approved") && (
        <button
          onClick={() => handleAction("reject")}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        >
          Reject
        </button>
      )}
    </div>
  );
};


/* =========================
   ADMIN TABLE WRAPPER
========================= */
const AdminTable = ({ title, headers, rows }) => {
  return (
    <div className="min-h-screen px-5 py-10 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold font-titillium mb-6">
          {title}
        </h1>

        <div className="bg-white rounded-2xl border shadow-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="p-3 text-left text-gray-700 font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="p-6 text-center text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
