import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });

    const reviews = await Review.find({ doctorId: doctor._id })
      .populate("petOwnerId", "fullName")
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    // Rating breakdown
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { if (breakdown[r.rating] !== undefined) breakdown[r.rating]++; });

    return NextResponse.json({ success: true, data: { reviews, avgRating, breakdown, total: reviews.length } });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
