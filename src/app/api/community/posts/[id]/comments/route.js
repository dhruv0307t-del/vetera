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

// POST /api/community/posts/[id]/comments  — add comment
export async function POST(req, { params }) {
  await connectDB();
  const { id } = await params;
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ success: false, message: "Comment cannot be empty" }, { status: 400 });

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

  // Get full user details for the comment author
  const author = await User.findById(user.id);

  post.comments.push({
    authorId: user.id,
    authorName: author ? author.fullName : "Unknown",
    text,
  });

  await post.save();
  return NextResponse.json({ success: true, comments: post.comments });
}

// DELETE /api/community/posts/[id]/comments  — delete comment
export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");

  const post = await Post.findById(id);
  if (!post) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

  const comment = post.comments.id(commentId);
  if (!comment) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });

  if (comment.authorId.toString() !== user.id && user.role !== "ADMIN" && post.authorId.toString() !== user.id) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  post.comments.pull(commentId);
  await post.save();
  return NextResponse.json({ success: true, comments: post.comments });
}
