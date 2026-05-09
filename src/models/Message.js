import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
    conversationId: { type: String, required: true }, // sorted userId pair: `${smallerId}-${largerId}`
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
