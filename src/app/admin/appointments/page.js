"use client";
import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("/api/admin/appointments")
      .then(res => res.json())
      .then(data => setAppointments(data.appointments));
  }, []);

  return (
    <AdminTable
      title="Appointments"
      headers={["Client", "Doctor", "Animal", "Date", "Status"]}
      rows={appointments.map(a => [
        a.clientId?.fullName,
        a.doctorId?.fullName,
        a.animalId?.animalName,
        new Date(a.date).toLocaleDateString(),
        a.status
      ])}
    />
  );
}
