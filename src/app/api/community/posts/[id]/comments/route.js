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
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { text, authorName } = await req.json();
  if (!text?.trim()) return NextResponse.json({ success: false, message: "Comment is empty" }, { status: 400 });

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

  const comment = { authorId: user.id, authorName: authorName || "User", text: text.trim() };
  post.comments.push(comment);
  await post.save();

  const saved = post.comments[post.comments.length - 1];
  return NextResponse.json({ success: true, comment: saved }, { status: 201 });
}

// DELETE /api/community/posts/[id]/comments?commentId=xxx
export async function DELETE(req, { params }) {
  await connectDB();
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ success: false }, { status: 404 });

  const comment = post.comments.id(commentId);
  if (!comment) return NextResponse.json({ success: false }, { status: 404 });
  if (comment.authorId.toString() !== user.id && post.authorId.toString() !== user.id && user.role !== "ADMIN") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
  }

  post.comments.pull(commentId);
  await post.save();
  return NextResponse.json({ success: true });
}
