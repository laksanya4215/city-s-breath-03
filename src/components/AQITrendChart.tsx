import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Area, AreaChart } from "recharts";
import { AirQualityData } from "@/types/airQuality";
import { TrendingUp } from "lucide-react";

interface AQITrendChartProps {
  data: AirQualityData[];
  cityName: string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-xl border border-border/50">
        <p className="font-semibold text-foreground text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
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
    <div className="glass-card p-8 animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 mb-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-muted-foreground uppercase tracking-wider">
          Air Quality Trends
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-8 text-center">Last 7 days analysis</p>
      
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(160, 84%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pm25Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pm10Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(45, 93%, 50%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(45, 93%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
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
            <Area 
              type="monotone" 
              dataKey="AQI" 
              stroke="hsl(160, 84%, 45%)" 
              strokeWidth={3}
              fill="url(#aqiGradient)"
              dot={{ fill: 'hsl(160, 84%, 45%)', strokeWidth: 0, r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2, stroke: 'hsl(222, 47%, 9%)' }}
              style={{ filter: 'drop-shadow(0 0 8px hsl(160, 84%, 45%))' }}
            />
            <Area 
              type="monotone" 
              dataKey="PM25" 
              stroke="hsl(0, 84%, 60%)" 
              strokeWidth={2}
              fill="url(#pm25Gradient)"
              dot={{ fill: 'hsl(0, 84%, 60%)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(222, 47%, 9%)' }}
            />
            <Area 
              type="monotone" 
              dataKey="PM10" 
              stroke="hsl(45, 93%, 50%)" 
              strokeWidth={2}
              fill="url(#pm10Gradient)"
              dot={{ fill: 'hsl(45, 93%, 50%)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(222, 47%, 9%)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
