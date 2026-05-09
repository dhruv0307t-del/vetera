import connectDB from "@/lib/db";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getUser(cookieStore) {
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// GET /api/community/posts  — feed (paginated, filterable)
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "ALL";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;

  const query = { isActive: true };
  if (type !== "ALL") query.type = type;
  if (search) {
    query.$or = [
      { caption: { $regex: search, $options: "i" } },
      { petName: { $regex: search, $options: "i" } },
      { petType: { $regex: search, $options: "i" } },
      { authorName: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ success: true, posts, total, page, pages: Math.ceil(total / limit) });
}

// POST /api/community/posts  — create post
export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const body = await req.json();
  const { caption, imageUrl, type, petName, petType, petAge, price, location, tags, authorName, authorRole } = body;

  const post = await Post.create({
    authorId: user.id,
    authorName: authorName || "VetEra User",
    authorRole: authorRole || user.role || "PET_OWNER",
    caption,
    imageUrl,
    type: type || "GENERAL",
    petName,
    petType,
    petAge,
    price,
    location,
    tags: tags || [],
  });

  return NextResponse.json({ success: true, post }, { status: 201 });
}
