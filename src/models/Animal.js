import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    species: String,
    breed: String,
    gender: String,
    age: Number,

    color: String,
    microchipId: String,

    vaccinations: [String],
    allergies: [String],
    medicalHistory: String,
    medications: [String],

    lastVisit: Date,
    nextVisit: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Animal ||
  mongoose.model("Animal", AnimalSchema);
