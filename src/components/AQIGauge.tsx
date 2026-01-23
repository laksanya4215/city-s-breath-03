import { useMemo } from "react";
import { getAQICategory } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";

interface AQIGaugeProps {
  aqi: number;
}

const AQI_RANGES = [
  { min: 0, max: 50, label: "0-50", color: "hsl(152, 69%, 41%)" },
  { min: 51, max: 100, label: "51-100", color: "hsl(152, 50%, 55%)" },
  { min: 101, max: 200, label: "101-200", color: "hsl(45, 93%, 47%)" },
  { min: 201, max: 300, label: "201-300", color: "hsl(24, 95%, 53%)" },
  { min: 301, max: 500, label: "300+", color: "hsl(0, 72%, 51%)" },
];

export function AQIGauge({ aqi }: AQIGaugeProps) {
  const category = getAQICategory(aqi);
  
  const { strokeColor, percentage, categoryColor } = useMemo(() => {
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
      categoryColor: color,
    };
  }, [aqi]);

  // SVG circle parameters
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      <h3 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
        Air Quality Index
      </h3>
      
      {/* Gauge Circle */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--secondary))"
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
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-5xl font-bold font-heading"
              style={{ color: strokeColor }}
            >
              {Math.round(aqi)}
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              AQI
            </span>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-6">
        <div 
          className="px-6 py-2 rounded-full text-lg font-semibold"
          style={{ 
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
          }}
        >
          {category}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-1 flex-wrap">
        {AQI_RANGES.map((range) => (
          <div key={range.label} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-3 rounded-sm",
                range.label === "0-50" && "rounded-l-full",
                range.label === "300+" && "rounded-r-full"
              )}
              style={{ backgroundColor: range.color }}
            />
            <span className="text-xs text-muted-foreground mt-1">
              {range.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
