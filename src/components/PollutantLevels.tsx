import { PollutantPercentage } from "@/types/airQuality";
import { cn } from "@/lib/utils";

interface PollutantLevelsProps {
  data: PollutantPercentage[];
}

export function PollutantLevels({ data }: PollutantLevelsProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up animate-delay-200">
      <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
        Detailed Pollutant Levels
      </h3>
      <p className="text-center text-muted-foreground mb-6">
        Average concentration in µg/m³
      </p>
      <div className="space-y-5">
        {sortedData.map((pollutant, index) => (
          <div key={pollutant.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: pollutant.color }}
                />
                <span className="font-semibold text-foreground">{pollutant.name}</span>
                <span className="text-sm text-muted-foreground">({pollutant.fullName})</span>
              </div>
              <span className="font-mono font-semibold text-foreground">
                {pollutant.value.toFixed(2)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out",
                  "group-hover:opacity-80"
                )}
                style={{ 
                  width: `${(pollutant.value / maxValue) * 100}%`,
                  backgroundColor: pollutant.color,
                  transitionDelay: `${index * 50}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
