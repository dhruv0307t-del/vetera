import connectDB from "@/lib/db";
import HealthRecord from "@/models/HealthRecord";
import Doctor from "@/models/Doctor";
import { generateHealthAlerts } from "@/lib/alerts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // 1. Analyze all Health Records for active risks (Simulating periodic batch checks)
    const recentRecords = await HealthRecord.find().sort({ createdAt: -1 }).limit(50);
    const petAlerts = [];

    recentRecords.forEach((record) => {
      if (record.healthLog) {
        const warnings = generateHealthAlerts(record.healthLog, record.petProfile?.petName);
        if (warnings.length > 0) {
          petAlerts.push({
            recordId: record._id,
            petName: record.petProfile?.petName,
            alerts: warnings,
            date: record.createdAt
          });
        }
      }
    });

    // 2. License Expiry Check (Mocking 1 Year flat expiration logic for Demo)
    // We assume any vet created over 365 days ago has an expiring license
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const expiringVets = await Doctor.find({
      verificationStatus: 'APPROVED',
      createdAt: { $lte: oneYearAgo }
    }).populate("userId", "fullName email");

    const vetAlerts = expiringVets.map(vet => ({
      type: "LICENSE_EXPIRATION",
      message: `Dr. ${vet.userId?.fullName}, please renew your medical license and re-verify your KYC documents.`,
      vetId: vet._id
    }));

    return NextResponse.json({
      success: true,
      message: "Smart Alerts Generated",
      data: {
        criticalPetAlerts: petAlerts,
        vetExpirationRenewals: vetAlerts
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
