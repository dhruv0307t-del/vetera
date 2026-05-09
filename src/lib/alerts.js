/**
 * Analyzes a Pet's HealthLog payload and surfaces risks
 */
export function generateHealthAlerts(logData, petName = "Your pet") {
  const alerts = [];

  if (!logData) return alerts;

  const { bodyTemperature, vomiting, diarrhea, lethargy, painSigns } = logData;

  // Critical Multi-Symptom Warning
  if (vomiting && diarrhea && lethargy === 'High') {
    alerts.push(`CRITICAL: ${petName} is showing high lethargy along with vomiting and diarrhea. This indicates severe dehydration risk or infection. Seek emergency vet care instantly!`);
  }

  // Dietary / Single Symptoms
  if (vomiting && !diarrhea) {
    alerts.push(`WARNING: ${petName} has been vomiting. Monitor water intake strictly and withhold food for 12 hours.`);
  }

  // Temperature (Normal is generally 38-39 for dogs/cats)
  if (bodyTemperature > 39.5) {
    alerts.push(`FEVER ALERT: ${petName}'s temperature of ${bodyTemperature}°C is elevated. Consult a vet.`);
  } else if (bodyTemperature < 37.5 && bodyTemperature > 0) {
    alerts.push(`HYPOTHERMIA ALERT: ${petName}'s temperature is critically low.`);
  }

  // Pain indicator
  if (painSigns) {
    alerts.push(`ACTION REQUIRED: You logged signs of pain for ${petName}. Minimize movement and prevent jumping.`);
  }

  return alerts;
}
