"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const cards = [
  { title: "Total Users", key: "totalUsers", route: "/admin/users" },
  { title: "Veterinarians", key: "vets", route: "/admin/vets" },
  { title: "Farms", key: "farms", route: "/admin/farms" },
  { title: "Pet Owners", key: "petOwners", route: "/admin/users?role=PET_OWNER" },
  { title: "Animals", key: "animals", route: "/admin/animals" },
  { title: "Appointments", key: "appointments", route: "/admin/appointments" },
  { title: "Pending Approvals", key: "pending", route: "/admin/approvals" },
  { title: "Payments", key: "payments", route: "/admin/payments" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => router.push(card.route)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center border"
          >
            <h2 className="text-gray-600 text-sm">{card.title}</h2>
            <p className="text-3xl font-bold mt-2">
              {stats[card.key] ?? "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <ActionButton title="View Users" route="/admin/users" />
          <ActionButton title="Approve Vets" route="/admin/vets" />
          <ActionButton title="Approve Farms" route="/admin/farms" />
          <ActionButton title="View Appointments" route="/admin/appointments" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ title, route }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(route)}
      className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
    >
      {title}
    </button>
  );
}
