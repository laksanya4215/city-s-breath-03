import { PollutantPercentage } from "@/types/airQuality";
import { BarChart3 } from "lucide-react";

interface PollutantChartProps {
  data: PollutantPercentage[];
}

export function PollutantChart({ data }: PollutantChartProps) {
  const sorted = [...data].filter(d => d.value > 0).sort((a, b) => b.percentage - a.percentage);
  const maxPct = Math.max(...sorted.map(d => d.percentage), 1);

  return (
    <div className="glass-card p-8 animate-fade-in-up animate-delay-100">
      <div className="flex items-center justify-center gap-2 mb-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Pollutant Breakdown
        </h3>
      </div>
      <p className="text-center text-muted-foreground text-sm mb-8">
        Percentage contribution of each pollutant
      </p>

      <div className="space-y-4">
        {sorted.map((pollutant, index) => {
          const barWidth = (pollutant.percentage / maxPct) * 100;
          return (
            <div key={pollutant.name} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: pollutant.color,
                      boxShadow: `0 0 8px ${pollutant.color}`,
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">{pollutant.name}</span>
                  <span className="text-xs text-muted-foreground">({pollutant.fullName})</span>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  {pollutant.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: pollutant.color,
                    transitionDelay: `${index * 60}ms`,
                    boxShadow: `0 0 12px ${pollutant.color}60`,
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
