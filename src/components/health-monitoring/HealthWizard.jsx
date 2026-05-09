"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = {
  petProfile: {
    petName: "", species: "Dog", breed: "", dateOfBirth: "", age: 0,
    gender: "Male", neutered: false, currentWeight: 10, targetWeight: 10
  },
  nutrition: {
    foodType: "Dry", foodBrand: "", ingredients: "", feedingFrequency: 2,
    quantityPerMeal: 100, dailyWaterIntake: 500, treatsGiven: false, treatsQuantity: 0
  },
  activity: {
    walkDuration: 30, playtime: 30, activityLevel: "Moderate", steps: 0,
    sleepDuration: 12, sleepQuality: "Good"
  },
  medical: {
    vaccinationStatus: "Up to date", lastVaccinationDate: "", knownDiseases: "",
    pastSurgeries: false, surgeryDetails: "", currentMedications: "", allergies: "",
    lastVetVisit: "", vetNotes: ""
  },
  healthLog: {
    appetiteChange: "None", vomiting: false, diarrhea: false,
    lethargy: "Low", coughingSneezing: false, painSigns: false, bodyTemperature: 38
  },
  behavior: {
    mood: "Happy", socialInteraction: "Normal", unusualBehavior: "", barkingFrequency: "Normal"
  },
  environment: {
    livingType: "Indoor", location: "", exposureToAnimals: false,
    hygieneLevel: "Good", weatherConditions: "Sunny"
  }
};

export default function HealthWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto calculate age
  useEffect(() => {
    if (formData.petProfile.dateOfBirth) {
      const birthDate = new Date(formData.petProfile.dateOfBirth);
      const diff = new Date() - birthDate;
      const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      setFormData((prev) => ({
        ...prev,
        petProfile: { ...prev.petProfile, age: age >= 0 ? age : 0 }
      }));
    }
  }, [formData.petProfile.dateOfBirth]);

  const updateSection = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health-record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Health Record Saved!");
        router.push("/"); // Or dashboard
      } else {
        toast.error("Failed to save: " + data.message);
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => { if (step < 7) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const renderProgress = () => {
    const progress = Math.round(((step - 1) / 7) * 100);
    return (
      <div className="mb-8">
        <div className="flex justify-between text-sm font-semibold mb-2 text-gray-700">
          <span>Step {step} of 7</span>
          <span>{progress}% Completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  // Helper renderers for UI
  const renderToggle = (label, section, field) => (
    <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 mb-3 shadow-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={formData[section][field]} onChange={(e) => updateSection(section, field, e.target.checked)} className="sr-only peer"/>
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const renderSlider = (label, section, field, min, max, unit) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="text-gray-700 font-medium">{label}</label>
        <span className="text-blue-600 font-semibold">{formData[section][field]} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={formData[section][field]} onChange={(e) => updateSection(section, field, Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
    </div>
  );

  const InputField = ({ label, type = "text", section, field, required = false }) => (
    <div className="mb-4 flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input type={type} required={required} className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" value={formData[section][field]} onChange={(e) => updateSection(section, field, e.target.value)} />
    </div>
  );

  const SelectMenu = ({ label, section, field, options }) => (
    <div className="mb-4 flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <select className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none" value={formData[section][field]} onChange={(e) => updateSection(section, field, e.target.value)}>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 sm:p-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-dark-blue">Health Monitoring Profile</h1>
      {renderProgress()}

      <div className="transition-opacity duration-300">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">1. Pet Profile</h2>
            <InputField label="Pet Name" section="petProfile" field="petName" />
            <SelectMenu label="Species" section="petProfile" field="species" options={["Dog", "Cat", "Other"]} />
            <InputField label="Breed" section="petProfile" field="breed" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Date of Birth" type="date" section="petProfile" field="dateOfBirth" />
              <div className="mb-4 flex flex-col">
                <label className="mb-1 font-medium text-gray-500">Auto-calculated Age (Years)</label>
                <input disabled className="p-3 border rounded-xl shadow-sm bg-gray-100 font-bold" value={formData.petProfile.age} />
              </div>
            </div>
            <SelectMenu label="Gender" section="petProfile" field="gender" options={["Male", "Female"]} />
            {renderToggle("Neutered / Spayed?", "petProfile", "neutered")}
            {renderSlider("Current Weight", "petProfile", "currentWeight", 1, 100, "kg")}
            {renderSlider("Target Weight", "petProfile", "targetWeight", 1, 100, "kg")}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">2. Diet & Nutrition</h2>
            <SelectMenu label="Food Type" section="nutrition" field="foodType" options={["Dry", "Wet", "Homemade", "Mixed"]} />
            <InputField label="Food Brand" section="nutrition" field="foodBrand" />
            <InputField label="Special Ingredients/Diet" section="nutrition" field="ingredients" />
            {renderSlider("Feeding Frequency", "nutrition", "feedingFrequency", 1, 5, "times/day")}
            {renderSlider("Quantity per Meal", "nutrition", "quantityPerMeal", 10, 1000, "g")}
            {renderSlider("Daily Water Intake", "nutrition", "dailyWaterIntake", 100, 3000, "ml")}
            {renderToggle("Give Treats?", "nutrition", "treatsGiven")}
            {formData.nutrition.treatsGiven && renderSlider("Treats Quantity", "nutrition", "treatsQuantity", 1, 20, "items")}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">3. Activity & Lifestyle</h2>
            {renderSlider("Walk Duration", "activity", "walkDuration", 0, 180, "mins/day")}
            {renderSlider("Playtime", "activity", "playtime", 0, 180, "mins/day")}
            <SelectMenu label="Activity Level" section="activity" field="activityLevel" options={["Low", "Moderate", "High"]} />
            {renderSlider("Daily Sleep", "activity", "sleepDuration", 4, 20, "hours")}
            <SelectMenu label="Sleep Quality" section="activity" field="sleepQuality" options={["Good", "Disturbed"]} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">4. Medical History</h2>
            <SelectMenu label="Vaccination Status" section="medical" field="vaccinationStatus" options={["Up to date", "Not"]} />
            <InputField label="Last Vaccination Date" type="date" section="medical" field="lastVaccinationDate" />
            <InputField label="Known Diseases" section="medical" field="knownDiseases" />
            {renderToggle("Past Surgeries?", "medical", "pastSurgeries")}
            {formData.medical.pastSurgeries && <InputField label="Surgery Details" section="medical" field="surgeryDetails" />}
            <InputField label="Current Medications" section="medical" field="currentMedications" />
            <InputField label="Allergies" section="medical" field="allergies" />
            <InputField label="Last Vet Visit" type="date" section="medical" field="lastVetVisit" />
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Vet Notes</label>
              <textarea className="p-3 border rounded-xl resize-none shadow-sm h-24" value={formData.medical.vetNotes} onChange={(e) => updateSection("medical", "vetNotes", e.target.value)}></textarea>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">5. Symptoms & Health Check</h2>
            <SelectMenu label="Appetite Change" section="healthLog" field="appetiteChange" options={["None", "Low", "High"]} />
            {renderToggle("Vomiting?", "healthLog", "vomiting")}
            {renderToggle("Diarrhea?", "healthLog", "diarrhea")}
            <SelectMenu label="Lethargy Severity" section="healthLog" field="lethargy" options={["Low", "Moderate", "High"]} />
            {renderToggle("Coughing/Sneezing?", "healthLog", "coughingSneezing")}
            {renderToggle("Signs of Pain?", "healthLog", "painSigns")}
            {renderSlider("Body Temperature", "healthLog", "bodyTemperature", 35, 42, "°C")}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">6. Behavior Tracking</h2>
            <SelectMenu label="Overall Mood" section="behavior" field="mood" options={["Happy", "Normal", "Aggressive", "Anxious"]} />
            <SelectMenu label="Social Interaction" section="behavior" field="socialInteraction" options={["Normal", "Reduced"]} />
            <SelectMenu label="Barking/Meowing Frequency" section="behavior" field="barkingFrequency" options={["Low", "Normal", "High"]} />
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Unusual Behavior Notes</label>
              <textarea className="p-3 border rounded-xl resize-none shadow-sm h-24" value={formData.behavior.unusualBehavior} onChange={(e) => updateSection("behavior", "unusualBehavior", e.target.value)}></textarea>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">7. Environment</h2>
            <SelectMenu label="Living Type" section="environment" field="livingType" options={["Indoor", "Outdoor", "Both"]} />
            <InputField label="Location (City)" section="environment" field="location" />
            {renderToggle("Regular Exposure to Other Animals?", "environment", "exposureToAnimals")}
            <SelectMenu label="Hygiene Level" section="environment" field="hygieneLevel" options={["Good", "Average", "Poor"]} />
            <InputField label="General Weather Conditions" section="environment" field="weatherConditions" />
          </div>
        )}
      </div>

      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        <button disabled={step === 1} onClick={prevStep} className={`py-3 px-6 rounded-xl font-semibold transition ${step === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
          ← Previous
        </button>
        {step < 7 ? (
          <button onClick={nextStep} className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg">
            Next Level →
          </button>
        ) : (
          <button onClick={submitForm} disabled={loading} className="py-3 px-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg">
            {loading ? "Saving..." : "Submit Profile ✓"}
          </button>
        )}
      </div>
    </div>
  );
}
