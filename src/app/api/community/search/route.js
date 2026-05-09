import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET /api/community/search?q=query  — search users and posts
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (!q.trim()) return NextResponse.json({ success: true, users: [] });

  const users = await User.find({
    $or: [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ],
  })
    .select("fullName email role city")
    .limit(10);

  return NextResponse.json({ success: true, users });
}
