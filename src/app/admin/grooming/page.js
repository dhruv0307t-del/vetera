"use client";
import AdminTable, {
  StatusBadge,
  ActionButtons,
} from "@/components/admin/AdminTable";

const GroomingPage = () => {
  const shops = [
    { id: "G001", name: "Happy Paws Grooming", status: "Pending" },
    { id: "G002", name: "Pet Care Salon", status: "Approved" },
  ];

  return (
    <AdminTable
      title="Grooming Shops"
      headers={["Shop ID", "Shop Name", "Status", "Action"]}
      rows={shops.map((s) => [
        s.id,
        s.name,
        <StatusBadge status={s.status} />,
        <ActionButtons />,
      ])}
    />
  );
};

export default GroomingPage;
