export interface AirQualityData {
  City: string;
  Date: string;
  "PM2.5": number;
  PM10: number;
  NO: number;
  NO2: number;
  NOx: number;
  NH3: number;
  CO: number;
  SO2: number;
  O3: number;
  AQI: number;
  AQI_Bucket: string;
}

export type MoodType = 'happy' | 'tired' | 'sick' | 'crying';

export interface CityStats {
  city: string;
  latestData: AirQualityData;
  averageAQI: number;
  mood: MoodType;
  pollutantPercentages: PollutantPercentage[];
}

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Severe';

export interface PollutantPercentage {
  name: string;
  fullName: string;
  value: number;
  percentage: number;
  color: string;
  severity: SeverityLevel;
}
