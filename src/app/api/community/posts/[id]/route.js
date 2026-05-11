import connectDB from "@/lib/db";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getUser(cookieStore) {
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, process.env.JWT_SECRET); }
  catch { return null; }
}

// PATCH /api/community/posts/[id]/like  — toggle like
export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

  const userId = user.id;
  const alreadyLiked = post.likes.some(likedId => likedId.toString() === userId);

  if (alreadyLiked) {
    post.likes = post.likes.filter(likedId => likedId.toString() !== userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return NextResponse.json({ success: true, likes: post.likes.length, liked: !alreadyLiked });
}

// DELETE /api/community/posts/[id]  — delete post
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  if (post.authorId.toString() !== user.id && user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  await Post.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
