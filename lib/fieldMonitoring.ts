import axios from "axios";
import prisma from "./prismadb";

export async function updateFieldData(fieldId: string) {
  try {
    const field = await prisma.field.findUnique({
      where: { id: fieldId }
    });

    if (!field?.agromonitoringId) return;

    // Get NDVI data
    const ndviResponse = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid=${field.agromonitoringId}&start=1604016000&end=${Math.floor(Date.now() / 1000)}&appid=${process.env.AGRO_APP_ID}`
    );

    // Get soil moisture data
    const soilMoistureResponse = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/soil?polyid=${field.agromonitoringId}&appid=${process.env.AGRO_APP_ID}`
    );

    // Get weather data
    const weatherResponse = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/weather?polyid=${field.agromonitoringId}&appid=${process.env.AGRO_APP_ID}`
    );

    // Update field data
    await prisma.field.update({
      where: { id: fieldId },
      data: {
        ndviData: ndviResponse.data,
        soilMoisture: soilMoistureResponse.data.moisture,
        weatherData: weatherResponse.data
      }
    });

    // Check for alerts
    await checkFieldAlerts(fieldId, {
      ndvi: ndviResponse.data,
      soilMoisture: soilMoistureResponse.data.moisture,
      weather: weatherResponse.data
    });

  } catch (error) {
    console.error("Error updating field data:", error);
  }
}

async function checkFieldAlerts(fieldId: string, data: any) {
  const alerts = [];

  // Check soil moisture
  if (data.soilMoisture < 0.3) {
    alerts.push({
      type: "irrigation",
      message: "Low soil moisture detected. Irrigation recommended.",
      severity: "high"
    });
  }

  // Check NDVI
  const latestNDVI = data.ndvi[data.ndvi.length - 1];
  if (latestNDVI < 0.3) {
    alerts.push({
      type: "crop_health",
      message: "Low NDVI detected. Check crop health.",
      severity: "medium"
    });
  }

  // Check weather
  if (data.weather.temp > 35) {
    alerts.push({
      type: "weather",
      message: "High temperature alert. Consider additional irrigation.",
      severity: "medium"
    });
  }

  // Create alerts
  if (alerts.length > 0) {
    await prisma.alert.createMany({
      data: alerts.map(alert => ({
        fieldId,
        ...alert
      }))
    });
  }
} 