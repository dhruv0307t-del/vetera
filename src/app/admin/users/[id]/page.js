"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setForm(res.user);
      });
  }, [id]);

  if (!data) return <p className="p-10">Loading...</p>;

  const { user, farm, vet } = data;

  const saveChanges = async () => {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEdit(false);
    location.reload();
  };

  const Field = ({ label, value, name }) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {edit ? (
        <input
          className="border px-3 py-2 rounded w-full"
          value={form[name] || ""}
          onChange={(e) =>
            setForm({ ...form, [name]: e.target.value })
          }
        />
      ) : (
        <p className="font-medium">{value || "—"}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Details</h1>
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* BASIC INFO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" value={user.fullName} name="fullName" />
          <Field label="Email" value={user.email} name="email" />
          <Field label="Phone" value={user.phone} name="phone" />

          <div>
            <p className="text-sm text-gray-500">Role</p>
            {edit ? (
              <select
                className="border px-3 py-2 rounded w-full"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="PET_OWNER">PET OWNER</option>
                <option value="FARM_OWNER">FARM OWNER</option>
                <option value="VET">VET</option>
              </select>
            ) : (
              <p className="font-medium">{user.role}</p>
            )}
          </div>

          <Field
            label="Status"
            value={
              user.isApproved === true
                ? "Approved"
                : user.isApproved === false
                ? "Rejected"
                : "Pending"
            }
          />
        </div>
      </div>

      {/* FARM DETAILS */}
      {farm && (
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Farm Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p><b>Farm Name:</b> {farm.farmName}</p>
            <p><b>Farm Type:</b> {farm.farmType}</p>
            <p><b>Location:</b> {farm.location}</p>
            <p><b>GPS:</b> {farm.gpsCoordinates}</p>
            <p><b>Size:</b> {farm.sizeInAcres}</p>
            <p><b>Status:</b> {farm.isApproved ? "Approved" : "Pending"}</p>
          </div>
        </div>
      )}

      {/* VET DETAILS */}
      {vet && (
        <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Vet Details
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <p><b>Qualification:</b> {vet.qualification}</p>
            <p><b>Specialization:</b> {vet.specialization}</p>
            <p><b>Experience:</b> {vet.experience}</p>
            <p><b>Clinic:</b> {vet.clinicName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
