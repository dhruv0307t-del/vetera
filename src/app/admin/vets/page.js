"use client";
import { useEffect, useState } from "react";
import AdminTable, { StatusBadge } from "@/components/admin/AdminTable";

export default function VeterinariansPage() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetch("/api/admin/veterinarians")
      .then(res => res.json())
      .then(data => setVets(data.vets));
  }, []);

  return (
    <AdminTable
      title="Veterinarians"
      headers={["Name", "Email", "Phone", "Status"]}
      rows={vets.map(v => [
        v.userId?.fullName,
        v.userId?.email,
        v.userId?.phone,
        <StatusBadge status={v.userId?.isApproved ? "Approved" : "Pending"} />
      ])}
    />
  );
}
