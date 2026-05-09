import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return Response.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ SET COOKIE
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({ success: true, message: "Logged in successfully", role: user.role, isApproved: user.isApproved, id: user._id });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json({ success: false, message: error.message, stack: String(error.stack) }, { status: 500 });
  }
}
