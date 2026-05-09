import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: String,
    text: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    authorName: String,
    authorRole: String,

    caption: { type: String, maxlength: 1000 },
    imageUrl: String,

    type: {
      type: String,
      enum: ["GENERAL", "ADOPT", "BUY", "SELL"],
      default: "GENERAL",
    },

    petName: String,
    petType: String,
    petAge: String,
    price: Number,
    location: String,

    tags: [String],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    comments: [CommentSchema],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
