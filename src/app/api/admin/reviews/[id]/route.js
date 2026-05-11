import connectDB from "@/lib/db";
import Review from "@/models/Review";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Review.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Review deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
