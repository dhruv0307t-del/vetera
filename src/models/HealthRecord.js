import mongoose from "mongoose";

const HealthRecordSchema = new mongoose.Schema({
  // 1. Basic Pet Information
  petProfile: {
    petName: { type: String, required: true },
    species: { type: String, enum: ["Dog", "Cat", "Other"], required: true },
    breed: { type: String },
    dateOfBirth: { type: String, required: true }, // Format YYYY-MM-DD
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    neutered: { type: Boolean, required: true },
    currentWeight: { type: Number, required: true },
    targetWeight: { type: Number },
  },

  // 2. Diet & Nutrition
  nutrition: {
    foodType: { type: String, enum: ["Dry", "Wet", "Homemade", "Mixed"], required: true },
    foodBrand: { type: String },
    ingredients: { type: String },
    feedingFrequency: { type: Number, min: 1, max: 5 },
    quantityPerMeal: { type: Number },
    dailyWaterIntake: { type: Number },
    treatsGiven: { type: Boolean },
    treatsQuantity: { type: Number },
  },

  // 3. Activity & Lifestyle
  activity: {
    walkDuration: { type: Number, required: true },
    playtime: { type: Number, required: true },
    activityLevel: { type: String, enum: ["Low", "Moderate", "High"] },
    steps: { type: Number },
    sleepDuration: { type: Number, required: true },
    sleepQuality: { type: String, enum: ["Good", "Disturbed"] },
  },

  // 4. Medical History
  medical: {
    vaccinationStatus: { type: String, enum: ["Up to date", "Not"] },
    lastVaccinationDate: { type: String },
    knownDiseases: [{ type: String }],
    pastSurgeries: { type: Boolean },
    surgeryDetails: { type: String },
    currentMedications: { type: String },
    allergies: { type: String },
    lastVetVisit: { type: String },
    vetNotes: { type: String },
  },

  // 5. Symptoms & Daily Health Check
  healthLog: {
    appetiteChange: { type: String, enum: ["None", "Low", "High"] },
    vomiting: { type: Boolean },
    diarrhea: { type: Boolean },
    lethargy: { type: String, enum: ["Low", "Moderate", "High"] },
    coughingSneezing: { type: Boolean },
    painSigns: { type: Boolean },
    bodyTemperature: { type: Number },
  },

  // 6. Behavior Tracking
  behavior: {
    mood: { type: String, enum: ["Happy", "Normal", "Aggressive", "Anxious"] },
    socialInteraction: { type: String, enum: ["Normal", "Reduced"] },
    unusualBehavior: { type: String },
    barkingFrequency: { type: String, enum: ["Low", "Normal", "High"] },
  },

  // 7. Environment & Living Conditions
  environment: {
    livingType: { type: String, enum: ["Indoor", "Outdoor", "Both"] },
    location: { type: String },
    exposureToAnimals: { type: Boolean },
    hygieneLevel: { type: String, enum: ["Good", "Average", "Poor"] },
    weatherConditions: { type: String },
  }
}, { timestamps: true });

export default mongoose.models.HealthRecord || mongoose.model("HealthRecord", HealthRecordSchema);
