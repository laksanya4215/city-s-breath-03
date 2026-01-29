import { PollutantPercentage } from "@/types/airQuality";

interface PollutantTableProps {
  data: PollutantPercentage[];
}

export function PollutantTable({ data }: PollutantTableProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-2">
        Detailed Pollutant Levels
      </h3>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Average concentration in µg/m³
      </p>
      
      <div className="space-y-5">
        {sortedData.map((pollutant) => {
          const barWidth = maxValue > 0 ? (pollutant.value / maxValue) * 100 : 0;
          
          return (
            <div key={pollutant.name} className="space-y-2">
              {/* Header row with name and value */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: pollutant.color }}
                  />
                  <span className="font-bold text-foreground">{pollutant.name}</span>
                  <span className="text-muted-foreground text-sm">
                    ({pollutant.fullName})
                  </span>
                </div>
                <span className="font-semibold text-foreground tabular-nums">
                  {pollutant.value.toFixed(2)}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: pollutant.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
