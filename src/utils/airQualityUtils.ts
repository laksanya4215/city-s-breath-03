import { AirQualityData, MoodType, CityStats, PollutantPercentage } from "@/types/airQuality";

const POLLUTANT_COLORS = {
  "PM2.5": "hsl(340, 82%, 52%)",
  "PM10": "hsl(280, 65%, 60%)",
  "NO": "hsl(200, 95%, 45%)",
  "NO₂": "hsl(180, 70%, 45%)",
  "NOx": "hsl(160, 60%, 45%)",
  "NH₃": "hsl(100, 70%, 40%)",
  "CO": "hsl(45, 90%, 48%)",
  "SO₂": "hsl(24, 90%, 50%)",
  "O₃": "hsl(220, 90%, 56%)",
};

const POLLUTANT_FULL_NAMES: Record<string, string> = {
  "PM2.5": "Fine Particulate Matter",
  "PM10": "Coarse Particulate Matter",
  "NO": "Nitric Oxide",
  "NO₂": "Nitrogen Dioxide",
  "NOx": "Oxides of Nitrogen",
  "NH₃": "Ammonia",
  "CO": "Carbon Monoxide",
  "SO₂": "Sulfur Dioxide",
  "O₃": "Ozone",
};

export function parseCSV(csvText: string): AirQualityData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const record: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      if (['PM2.5', 'PM10', 'NO', 'NO2', 'NOx', 'NH3', 'CO', 'SO2', 'O3', 'AQI'].includes(header)) {
        record[header] = parseFloat(value) || 0;
      } else {
        record[header] = value;
      }
    });
    
    return record as unknown as AirQualityData;
  });
}

export function getUniqueCities(data: AirQualityData[]): string[] {
  return [...new Set(data.map(d => d.City))].sort();
}

export function getMoodFromAQI(aqi: number): MoodType {
  if (aqi <= 50) return 'happy';
  if (aqi <= 100) return 'tired';
  if (aqi <= 200) return 'sick';
  return 'crying';
}

export function getMoodEmoji(mood: MoodType): string {
  switch (mood) {
    case 'happy': return '😊';
    case 'tired': return '😮‍💨';
    case 'sick': return '🤢';
    case 'crying': return '😭';
  }
}

export function getMoodLabel(mood: MoodType): string {
  switch (mood) {
    case 'happy': return 'Happy';
    case 'tired': return 'Tired';
    case 'sick': return 'Sick';
    case 'crying': return 'Crying';
  }
}

export function getAQICategory(aqi: number): string {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

// Thresholds for pollutant severity levels (µg/m³)
const POLLUTANT_THRESHOLDS: Record<string, { low: number; moderate: number; high: number }> = {
  "PM2.5": { low: 30, moderate: 60, high: 90 },
  "PM10": { low: 50, moderate: 100, high: 250 },
  "NO": { low: 20, moderate: 40, high: 80 },
  "NO₂": { low: 40, moderate: 80, high: 180 },
  "NOx": { low: 40, moderate: 80, high: 180 },
  "NH₃": { low: 200, moderate: 400, high: 800 },
  "CO": { low: 1, moderate: 2, high: 10 },
  "SO₂": { low: 40, moderate: 80, high: 380 },
  "O₃": { low: 50, moderate: 100, high: 168 },
};

export function getPollutantSeverity(name: string, value: number): 'Low' | 'Moderate' | 'High' | 'Severe' {
  const thresholds = POLLUTANT_THRESHOLDS[name];
  if (!thresholds) return 'Low';
  
  if (value <= thresholds.low) return 'Low';
  if (value <= thresholds.moderate) return 'Moderate';
  if (value <= thresholds.high) return 'High';
  return 'Severe';
}

export function getSeverityColor(severity: 'Low' | 'Moderate' | 'High' | 'Severe'): string {
  switch (severity) {
    case 'Low': return 'hsl(152, 69%, 41%)';
    case 'Moderate': return 'hsl(45, 93%, 47%)';
    case 'High': return 'hsl(24, 95%, 53%)';
    case 'Severe': return 'hsl(0, 72%, 51%)';
  }
}

export function calculateCityStats(data: AirQualityData[], city: string): CityStats {
  const cityData = data.filter(d => d.City === city);
  const latestData = cityData[cityData.length - 1];
  const averageAQI = cityData.reduce((sum, d) => sum + d.AQI, 0) / cityData.length;
  
  const pollutants = [
    { name: "PM2.5", fullName: POLLUTANT_FULL_NAMES["PM2.5"], value: latestData["PM2.5"], color: POLLUTANT_COLORS["PM2.5"] },
    { name: "PM10", fullName: POLLUTANT_FULL_NAMES["PM10"], value: latestData.PM10, color: POLLUTANT_COLORS["PM10"] },
    { name: "NO", fullName: POLLUTANT_FULL_NAMES["NO"], value: latestData.NO, color: POLLUTANT_COLORS["NO"] },
    { name: "NO₂", fullName: POLLUTANT_FULL_NAMES["NO₂"], value: latestData.NO2, color: POLLUTANT_COLORS["NO₂"] },
    { name: "NOx", fullName: POLLUTANT_FULL_NAMES["NOx"], value: latestData.NOx, color: POLLUTANT_COLORS["NOx"] },
    { name: "NH₃", fullName: POLLUTANT_FULL_NAMES["NH₃"], value: latestData.NH3, color: POLLUTANT_COLORS["NH₃"] },
    { name: "CO", fullName: POLLUTANT_FULL_NAMES["CO"], value: latestData.CO, color: POLLUTANT_COLORS["CO"] },
    { name: "SO₂", fullName: POLLUTANT_FULL_NAMES["SO₂"], value: latestData.SO2, color: POLLUTANT_COLORS["SO₂"] },
    { name: "O₃", fullName: POLLUTANT_FULL_NAMES["O₃"], value: latestData.O3, color: POLLUTANT_COLORS["O₃"] },
  ];
  
  const total = pollutants.reduce((sum, p) => sum + p.value, 0);
  
  const pollutantPercentages: PollutantPercentage[] = pollutants.map(p => ({
    ...p,
    percentage: total > 0 ? (p.value / total) * 100 : 0,
    severity: getPollutantSeverity(p.name, p.value),
  }));
  
  return {
    city,
    latestData,
    averageAQI,
    mood: getMoodFromAQI(latestData.AQI),
    pollutantPercentages,
  };
}

export function getCityMessage(stats: CityStats): string {
  const { city, mood, latestData, pollutantPercentages } = stats;
  const topPollutants = [...pollutantPercentages].sort((a, b) => b.value - a.value).slice(0, 3);
  const topNames = topPollutants.map(p => p.fullName).join(', ');
  
  const greetings: Record<MoodType, string> = {
    happy: `Hello, my dear people of ${city}! 🌿`,
    tired: `*sigh* Hello, people of ${city}...`,
    sick: `*cough* My beloved ${city} residents...`,
    crying: `*sob* My dear children of ${city}...`,
  };
  
  const feelings: Record<MoodType, string> = {
    happy: `I'm feeling wonderful today! My air is fresh, clean, and full of life. You can breathe easy, take a walk in the park, and enjoy the sunshine. This is how I love to be - healthy and vibrant for you.`,
    tired: `I'm feeling a bit worn out today. The air around me is getting a little heavy. I'm not sick, but I need you to be gentle with me. Maybe reduce the smoke and dust a little?`,
    sick: `I'm not feeling well today. My air is thick with pollutants, and it's hard for me to breathe. When you breathe, you're sharing my struggle. I need your help to get better.`,
    crying: `I'm crying out for help! The air I carry is poisonous. Every breath you take hurts me, and it hurts you too. Please, please help me heal. I can't do this alone.`,
  };
  
  const pollutantExplanation = `Today, the main troublemakers are ${topNames}. These are making my air harder to breathe. ${topPollutants[0].name} especially is quite high at ${topPollutants[0].value.toFixed(1)} µg/m³.`;
  
  return `${greetings[mood]}\n\n${feelings[mood]}\n\n${pollutantExplanation}`;
}

export function getHealthImpact(mood: MoodType): string {
  switch (mood) {
    case 'happy':
      return `If you breathe this air every day for a year, your lungs will stay strong and pink like a healthy flower. Children can play outside freely, and elders can enjoy their morning walks. Your body will thank you!`;
    case 'tired':
      return `Breathing this air daily for a year means your lungs have to work a bit harder. You might get tired more easily, have mild headaches sometimes, or notice you're catching colds more often. It's like asking your body to carry a small backpack everywhere.`;
    case 'sick':
      return `If you breathe this air every day for a year, your throat might always feel scratchy. You could develop a persistent cough, feel short of breath climbing stairs, or have trouble sleeping well. Children and elderly people might get respiratory infections more often.`;
    case 'crying':
      return `Breathing this severely polluted air for a year is like slowly poisoning yourself. It can lead to serious lung diseases, heart problems, and chronic breathing difficulties. Children's lungs may not develop properly, and elders could face life-threatening health crises. This is an emergency for your body.`;
  }
}

export function getDailyAdvice(mood: MoodType): string {
  switch (mood) {
    case 'happy':
      return `💚 Perfect day for outdoor activities! Go for a run, cycle to work, or have a picnic in the park. Enjoy every breath of this fresh air!`;
    case 'tired':
      return `💛 Consider light outdoor activities in the morning. Keep your windows open for ventilation, but maybe skip the intense workout outside today.`;
    case 'sick':
      return `🧡 Please wear a mask if you go outside. Avoid morning walks when pollution peaks. Keep children and elderly indoors if possible. Use air purifiers at home.`;
    case 'crying':
      return `❤️ Stay indoors with windows closed. Wear an N95 mask if you must go out. Keep children, elderly, and people with asthma strictly indoors. Consider air purifiers and wet mopping to reduce indoor dust.`;
  }
}
