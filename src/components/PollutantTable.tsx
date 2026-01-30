import { PollutantPercentage, SeverityLevel } from "@/types/airQuality";
import { getSeverityColor } from "@/utils/airQualityUtils";
import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";

interface PollutantTableProps {
  data: PollutantPercentage[];
}

const severityBadgeStyles: Record<SeverityLevel, string> = {
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
  Moderate: "bg-amber-500/20 text-amber-400 border-amber-500/50",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  Severe: "bg-red-500/20 text-red-400 border-red-500/50",
};

export function PollutantTable({ data }: PollutantTableProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="glass-card p-8 animate-fade-in-up animate-delay-200">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Detailed Pollutant Levels
        </h3>
      </div>
      <p className="text-center text-muted-foreground text-sm mb-8">
        Average concentration in µg/m³ with severity indicators
      </p>
      
      <div className="space-y-4">
        {sortedData.map((pollutant, index) => {
          const barWidth = maxValue > 0 ? (pollutant.value / maxValue) * 100 : 0;
          const severityColor = getSeverityColor(pollutant.severity);
          
          return (
            <div 
              key={pollutant.name} 
              className="group p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              {/* Header row with name, severity badge, and value */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-card"
                    style={{ 
                      backgroundColor: pollutant.color,
                      boxShadow: `0 0 10px ${pollutant.color}`,
                    }}
                  />
                  <div>
                    <span className="font-semibold text-foreground">{pollutant.name}</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      ({pollutant.fullName})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span 
                    className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full border",
                      severityBadgeStyles[pollutant.severity]
                    )}
                  >
                    {pollutant.severity}
                  </span>
                  <span className="font-bold text-foreground tabular-nums min-w-[100px] text-right">
                    {pollutant.value.toFixed(2)}
                    <span className="text-xs text-muted-foreground ml-1">µg/m³</span>
                  </span>
                </div>
              </div>
              
              {/* Progress bar with severity color and glow */}
              <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: severityColor,
                    transitionDelay: `${index * 50}ms`,
                    boxShadow: `0 0 10px ${severityColor}`
                  }}
                >
                  <div className="absolute inset-0 shimmer" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
