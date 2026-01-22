"use client";
import { useEffect, useState } from "react";
import AdminTable, { StatusBadge } from "@/components/admin/AdminTable";

export default function PetOwnersPage() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetch("/api/admin/pet-owners")
      .then(res => res.json())
      .then(data => setOwners(data.petOwners));
  }, []);

  return (
    <AdminTable
      title="Pet Owners"
      headers={["Name", "Email", "Phone", "Status"]}
      rows={owners.map(o => [
        o.fullName,
        o.email,
        o.phone,
        <StatusBadge status={o.isApproved ? "Approved" : "Pending"} />
      ])}
    />
  );
}
