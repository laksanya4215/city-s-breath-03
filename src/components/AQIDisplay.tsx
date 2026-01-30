import { getAQICategory } from "@/utils/airQualityUtils";
import { Activity } from "lucide-react";

interface AQIDisplayProps {
  aqi: number;
  cityName: string;
}

export function AQIDisplay({ aqi, cityName }: AQIDisplayProps) {
  const category = getAQICategory(aqi);
  
  const categoryStyles: Record<string, { color: string; glow: string }> = {
    "Good": { color: "text-emerald-400", glow: "shadow-emerald-500/30" },
    "Satisfactory": { color: "text-lime-400", glow: "shadow-lime-500/30" },
    "Moderate": { color: "text-amber-400", glow: "shadow-amber-500/30" },
    "Poor": { color: "text-orange-400", glow: "shadow-orange-500/30" },
    "Very Poor": { color: "text-red-400", glow: "shadow-red-500/30" },
    "Severe": { color: "text-red-600", glow: "shadow-red-700/30" },
  };

  const style = categoryStyles[category] || categoryStyles["Moderate"];

  return (
    <div className="glass-card-glow p-8 animate-fade-in-up text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Air Quality Index
        </h3>
      </div>
      <p className="text-xl md:text-2xl font-body text-foreground leading-relaxed">
        <span className="font-bold text-primary">{cityName}'s</span> AQI level is{" "}
        <span className={`font-bold text-5xl md:text-6xl ${style.color} inline-block mx-2`} style={{ textShadow: '0 0 30px currentColor' }}>
          {Math.round(aqi)}
        </span>
        <span className="text-muted-foreground">—</span>{" "}
        <span className={`font-bold text-2xl md:text-3xl ${style.color}`}>
          {category}
        </span>
      </p>
    </div>
  );
}
