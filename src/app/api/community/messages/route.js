import connectDB from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getUser(cookieStore) {
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, process.env.JWT_SECRET); }
  catch { return null; }
}

function getConversationId(a, b) {
  return [a, b].sort().join("-");
}

// GET /api/community/messages?with=userId  — get conversation
export async function GET(req) {
  await connectDB();
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const withUserId = searchParams.get("with");

  if (withUserId) {
    // Get a specific conversation
    const conversationId = getConversationId(user.id, withUserId);
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }).limit(100);
    // Mark as read
    await Message.updateMany({ conversationId, receiverId: user.id, isRead: false }, { isRead: true });
    return NextResponse.json({ success: true, messages });
  }

  // Get all conversations (latest message from each)
  const allMessages = await Message.find({
    $or: [{ senderId: user.id }, { receiverId: user.id }]
  }).sort({ createdAt: -1 });

  const convMap = new Map();
  for (const msg of allMessages) {
    const otherId = msg.senderId.toString() === user.id ? msg.receiverId.toString() : msg.senderId.toString();
    if (!convMap.has(otherId)) {
      convMap.set(otherId, msg);
    }
  }

  const otherIds = [...convMap.keys()];
  const others = await User.find({ _id: { $in: otherIds } }).select("fullName role");
  const otherMap = Object.fromEntries(others.map(u => [u._id.toString(), u]));

  const conversations = otherIds.map(id => ({
    user: otherMap[id],
    lastMessage: convMap.get(id),
    unread: 0,
  }));

  return NextResponse.json({ success: true, conversations });
}

// POST /api/community/messages  — send message
export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();
  const user = getUser(cookieStore);
  if (!user) return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });

  const { receiverId, text } = await req.json();
  if (!receiverId || !text?.trim()) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  const conversationId = getConversationId(user.id, receiverId);
  const message = await Message.create({
    senderId: user.id,
    receiverId,
    text: text.trim(),
    conversationId,
  });

  return NextResponse.json({ success: true, message }, { status: 201 });
}
