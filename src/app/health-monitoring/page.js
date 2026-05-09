export const metadata = {
  title: "VetEra - Health Monitoring Profile",
};

import HealthWizard from "@/components/health-monitoring/HealthWizard";

export default function HealthMonitoringPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <HealthWizard />
    </div>
  );
}
