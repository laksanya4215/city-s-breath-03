import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PollutantPercentage } from "@/types/airQuality";

interface PollutantChartProps {
  data: PollutantPercentage[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: PollutantPercentage }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-card p-4 rounded-xl">
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
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up animate-delay-100">
      <h3 className="font-heading text-2xl font-bold text-foreground mb-4 text-center">
        Pollutant Breakdown
      </h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="percentage"
              nameKey="name"
              animationBegin={0}
              animationDuration={800}
            >
              {filteredData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
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
