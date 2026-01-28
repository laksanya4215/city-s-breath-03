import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AirQualityData } from "@/types/airQuality";
import { TrendingUp } from "lucide-react";

interface AQITrendChartProps {
  data: AirQualityData[];
  cityName: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 rounded-xl border border-border/50">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === 'AQI' ? 'AQI' : entry.dataKey === 'PM25' ? 'PM2.5' : 'PM10'}: {entry.value?.toFixed(1)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AQITrendChart({ data, cityName }: AQITrendChartProps) {
  // Get last 7 data points for the selected city
  const cityData = data
    .filter(d => d.City === cityName)
    .slice(-7)
    .map(d => ({
      date: d.Date,
      AQI: d.AQI,
      PM25: d["PM2.5"],
      PM10: d.PM10,
    }));

  if (cityData.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-bold text-foreground">
          Air Quality Trends
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Last 7 days analysis</p>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value: string) => (
                <span className="text-sm text-foreground">
                  {value === 'AQI' ? 'AQI' : value === 'PM25' ? 'PM2.5' : 'PM10'}
                </span>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="AQI" 
              stroke="hsl(160, 84%, 39%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(160, 84%, 39%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="PM25" 
              stroke="hsl(0, 84%, 60%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(0, 84%, 60%)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="PM10" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
