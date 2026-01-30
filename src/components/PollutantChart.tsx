import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PollutantPercentage } from "@/types/airQuality";
import { PieChartIcon } from "lucide-react";

interface PollutantChartProps {
  data: PollutantPercentage[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: PollutantPercentage }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-4 rounded-xl border border-border/50">
        <p className="font-semibold text-foreground">{data.fullName}</p>
        <p className="text-sm text-muted-foreground">{data.name}</p>
        <p className="font-bold text-lg" style={{ color: data.color }}>
          {data.value.toFixed(2)} µg/m³
        </p>
        <p className="text-sm text-muted-foreground">
          {data.percentage.toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function PollutantChart({ data }: PollutantChartProps) {
  const filteredData = data.filter(d => d.value > 0);

  return (
    <div className="glass-card p-8 animate-fade-in-up animate-delay-100">
      <div className="flex items-center justify-center gap-2 mb-6">
        <PieChartIcon className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Pollutant Breakdown
        </h3>
      </div>
      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {filteredData.map((entry, index) => (
                <filter key={`glow-${index}`} id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              ))}
            </defs>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={130}
              paddingAngle={3}
              dataKey="percentage"
              nameKey="name"
              animationBegin={0}
              animationDuration={800}
            >
              {filteredData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="hsl(222, 47%, 9%)"
                  strokeWidth={2}
                  style={{ filter: `drop-shadow(0 0 8px ${entry.color}50)` }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value: string) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
