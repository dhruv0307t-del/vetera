import connectDB from "@/lib/db";
import Review from "@/models/Review";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { doctorId, petOwnerId, rating, comment } = await req.json();

    if (!doctorId || !petOwnerId || !rating) {
      return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
    }

    // Insert the new review
    const newReview = await Review.create({ doctorId, petOwnerId, rating, comment });

    // Aggregate and recalculate the average doctor rating automatically
    const stats = await Review.aggregate([
      { $match: { doctorId: newReview.doctorId } },
      { $group: { _id: "$doctorId", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } }
    ]);

    const avgRating = stats.length > 0 ? stats[0].averageRating.toFixed(1) : rating;

    await Doctor.findByIdAndUpdate(doctorId, { rating: avgRating });

    return NextResponse.json({
      success: true,
      message: "Review successfully submitted! Vet rating updated.",
      review: newReview,
      newAverage: avgRating
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to submit review", error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");

    if (!doctorId) return NextResponse.json({ success: false, message: "Doctor ID required" }, { status: 400 });

    const reviews = await Review.find({ doctorId }).populate("petOwnerId", "fullName").sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
  }
}
