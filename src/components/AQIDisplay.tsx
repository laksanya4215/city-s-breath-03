import { getAQICategory } from "@/utils/airQualityUtils";

interface AQIDisplayProps {
  aqi: number;
  cityName: string;
}

export function AQIDisplay({ aqi, cityName }: AQIDisplayProps) {
  const category = getAQICategory(aqi);
  
  const categoryColors: Record<string, string> = {
    "Good": "text-green-600",
    "Satisfactory": "text-lime-600",
    "Moderate": "text-amber-500",
    "Poor": "text-orange-600",
    "Very Poor": "text-red-600",
    "Severe": "text-red-800",
  };

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in-up text-center">
      <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
        Air Quality Index
      </h3>
      <p className="text-xl md:text-2xl font-body text-foreground">
        <span className="font-bold">{cityName}'s</span> AQI level is{" "}
        <span className="font-bold text-4xl md:text-5xl text-foreground">{Math.round(aqi)}</span>
        {" — "}
        <span className={`font-bold text-2xl md:text-3xl ${categoryColors[category]}`}>{category}</span>
      </p>
    </div>
  );
}
