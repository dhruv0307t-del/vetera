"use client";
import AdminTable, {
  StatusBadge,
  ActionButtons,
} from "@/components/admin/AdminTable";

const RetailersPage = () => {
  const retailers = [
    { id: "R001", name: "PetMart", status: "Approved" },
    { id: "R002", name: "Animal Store", status: "Pending" },
  ];

  return (
    <AdminTable
      title="Retailers"
      headers={["Retailer ID", "Store Name", "Status", "Action"]}
      rows={retailers.map((r) => [
        r.id,
        r.name,
        <StatusBadge status={r.status} />,
        <ActionButtons />,
      ])}
    />
  );
};

export default RetailersPage;
