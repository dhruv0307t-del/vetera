import connectDB from "@/lib/db";
import User from "@/models/User";
import Farm from "@/models/Farm";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("SIGNUP BODY:", body);

    const {
      role,
      fullName,
      email,
      phone,
      password,
      farmDetails,
    } = body;

    // 🔴 PREVENT DUPLICATE EMAIL
    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ CREATE USER
    const user = await User.create({
      role,
      fullName,
      email,
      phone,
      password,
      isApproved: false,
    });

    console.log("USER CREATED:", user._id);

    // ✅ CREATE FARM IF FARM OWNER
    if (role === "FARM_OWNER" && farmDetails) {
      const normalizedFarmType = farmDetails.farmType?.toUpperCase();
      await Farm.create({
        ownerId: user._id,
        farmName: farmDetails.farmName,
        farmType: normalizedFarmType,
        location: farmDetails.location,
        gpsCoordinates: `${farmDetails.gps?.lat || ""}, ${farmDetails.gps?.lng || ""}`,
        sizeInAcres: farmDetails.size,
        isApproved: false,
      });
    }

    return Response.json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return Response.json(
      { success: false, message: "Signup failed" },
      { status: 500 }
    );
  }
}
