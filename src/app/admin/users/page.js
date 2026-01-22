"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable, {
  StatusBadge,
  ActionButtons,
} from "@/components/admin/AdminTable";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (filter === "ALL") return true;
    if (filter === "APPROVED") return u.isApproved === true;
    if (filter === "REJECTED") return u.isApproved === false;
    if (filter === "PENDING")
      return u.isApproved === null || u.isApproved === undefined;
  });

  return (
    <>
      {/* FILTER */}
      <div className="flex justify-end mb-4 px-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="ALL">All</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      <AdminTable
        title="All Registered Users"
        headers={["Name", "Email", "Role", "Status", "Action"]}
        rows={filteredUsers.map((u) => [
          // 👇 CLICKABLE NAME
          <span
            onClick={() => router.push(`/admin/users/${u._id}`)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {u.fullName}
          </span>,

          u.email,
          u.role,

          <StatusBadge
            status={
              u.isApproved === true
                ? "Approved"
                : u.isApproved === false
                ? "Rejected"
                : "Pending"
            }
          />,

          u.role !== "ADMIN" ? (
            <ActionButtons
              id={u._id}
              status={
                u.isApproved === true
                  ? "Approved"
                  : u.isApproved === false
                  ? "Rejected"
                  : "Pending"
              }
              refresh={fetchUsers}
            />
          ) : (
            "-"
          ),
        ])}
      />
    </>
  );
};

export default UsersPage;
