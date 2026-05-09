import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    role: { type: String, required: true }, // e.g. Worker, Manager, Milker
    phone: String,
    salary: Number,
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  { timestamps: true }
);

const AttendanceSchema = new mongoose.Schema(
  {
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["PRESENT", "ABSENT", "LEAVE"], default: "PRESENT" },
  },
  { timestamps: true }
);

export const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
