import { useMemo } from "react";
import { getAQICategory } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

interface AQIGaugeProps {
  aqi: number;
}

const AQI_RANGES = [
  { min: 0, max: 50, label: "Good", color: "hsl(160, 84%, 45%)" },
  { min: 51, max: 100, label: "Satisfactory", color: "hsl(80, 60%, 45%)" },
  { min: 101, max: 200, label: "Moderate", color: "hsl(45, 93%, 47%)" },
  { min: 201, max: 300, label: "Poor", color: "hsl(24, 95%, 53%)" },
  { min: 301, max: 500, label: "Severe", color: "hsl(0, 72%, 51%)" },
];

export function AQIGauge({ aqi }: AQIGaugeProps) {
  const category = getAQICategory(aqi);
  
  const { strokeColor, percentage } = useMemo(() => {
    const maxAQI = 500;
    const clampedAQI = Math.min(aqi, maxAQI);
    const pct = (clampedAQI / maxAQI) * 100;
    
    let color = AQI_RANGES[0].color;
    for (const range of AQI_RANGES) {
      if (aqi >= range.min && aqi <= range.max) {
        color = range.color;
        break;
      }
      if (aqi > range.max) {
        color = range.color;
      }
    }
    
    return {
      strokeColor: color,
      percentage: pct,
    };
  }, [aqi]);

  // SVG circle parameters
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card p-8 animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Gauge className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          AQI Gauge
        </h3>
      </div>
      
      {/* Gauge Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-30"
            style={{ backgroundColor: strokeColor }}
          />
          
          <svg width={size} height={size} className="transform -rotate-90 relative">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(217, 33%, 17%)"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 10px ${strokeColor})` }}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-6xl font-bold font-heading"
              style={{ color: strokeColor, textShadow: `0 0 20px ${strokeColor}` }}
            >
              {Math.round(aqi)}
            </span>
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mt-1">
              AQI
            </span>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-8">
        <div 
          className="px-6 py-2 rounded-full text-lg font-semibold border"
          style={{ 
            backgroundColor: `${strokeColor}15`,
            borderColor: `${strokeColor}50`,
            color: strokeColor,
            boxShadow: `0 0 20px ${strokeColor}30`
          }}
        >
          {category}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-1 flex-wrap">
        {AQI_RANGES.map((range, index) => (
          <div key={range.label} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-12 h-4 rounded-sm transition-all duration-300",
                index === 0 && "rounded-l-full",
                index === AQI_RANGES.length - 1 && "rounded-r-full"
              )}
              style={{ 
                backgroundColor: range.color,
                boxShadow: aqi >= range.min && aqi <= range.max 
                  ? `0 0 15px ${range.color}` 
                  : 'none',
                opacity: aqi >= range.min && aqi <= range.max ? 1 : 0.5
              }}
            />
            <span className="text-xs text-muted-foreground mt-2 whitespace-nowrap">
              {range.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
