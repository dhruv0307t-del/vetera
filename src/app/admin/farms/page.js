"use client";
import { useEffect, useState } from "react";
import AdminTable, {
  StatusBadge,
  ActionButtons,
} from "@/components/admin/AdminTable";

const FarmsPage = () => {
  const [farms, setFarms] = useState([]);

  const loadFarms = () => {
    fetch("/api/admin/farms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFarms(data.farms);
        }
      });
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const getStatus = (f) => {
    if (f.isApproved === true) return "Approved";
    if (f.isApproved === false) return "Rejected";
    return "Pending";
  };

  return (
    <AdminTable
      title="Farms"
      headers={["Farm Name", "Owner", "Type", "Status", "Action"]}
      rows={farms.map((f) => [
        f.farmName,
        f.ownerId?.fullName || "—",
        f.farmType,
        <StatusBadge status={getStatus(f)} />,
        <ActionButtons
          id={f._id}
          type="farm"
          refresh={loadFarms}
        />,
      ])}
    />
  );
};

export default FarmsPage;
