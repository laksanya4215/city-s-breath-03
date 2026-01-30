import { useState, useMemo } from "react";
import { useAirQualityData } from "@/hooks/useAirQualityData";
import { calculateCityStats, getCityMessage } from "@/utils/airQualityUtils";
import { calculateMetrics } from "@/utils/metricsUtils";
import { CitySelector } from "@/components/CitySelector";
import { AQIGauge } from "@/components/AQIGauge";
import { AQIDisplay } from "@/components/AQIDisplay";
import { PollutantTable } from "@/components/PollutantTable";
import { PollutantChart } from "@/components/PollutantChart";
import { CityMessage } from "@/components/CityMessage";
import { HealthImpact } from "@/components/HealthImpact";
import { DailyAdvice } from "@/components/DailyAdvice";
import { MetricsCards } from "@/components/MetricsCards";
import { AQITrendChart } from "@/components/AQITrendChart";
import { Wind, Loader2, Sparkles } from "lucide-react";

const Index = () => {
  const { data, cities, loading, error } = useAirQualityData();
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cityStats = useMemo(() => {
    if (!selectedCity || !data.length) return null;
    return calculateCityStats(data, selectedCity);
  }, [data, selectedCity]);

  const cityMessage = useMemo(() => {
    if (!cityStats) return "";
    return getCityMessage(cityStats);
  }, [cityStats]);

  const metrics = useMemo(() => {
    if (!selectedCity || !data.length) return null;
    return calculateMetrics(data, selectedCity);
  }, [data, selectedCity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
            <div className="absolute inset-0 h-16 w-16 mx-auto rounded-full bg-primary/20 blur-xl" />
          </div>
          <p className="text-muted-foreground text-lg">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center glass-card p-8">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative py-8 md:py-12 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Wind className="h-12 w-12 text-primary" />
              <div className="absolute inset-0 h-12 w-12 bg-primary/30 rounded-full blur-lg" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              City Air Voice
            </h1>
            <Sparkles className="h-6 w-6 text-primary/60 animate-pulse" />
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            AI-powered air quality insights. Select a city and discover what your air is telling you.
          </p>
        </div>
      </header>

      {/* City Selector */}
      <section className="relative py-8 border-b border-border/30">
        <div className="container mx-auto px-4">
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>
      </section>

      {/* Main Content */}
      {cityStats && metrics && (
        <main className="relative py-8 md:py-12">
          <div className="container mx-auto px-4 space-y-8">
            {/* 1. AQI Display - Air Quality Index */}
            <AQIDisplay aqi={cityStats.latestData.AQI} cityName={cityStats.city} />

            {/* 2. AQI Gauge Visualization */}
            <AQIGauge aqi={cityStats.latestData.AQI} />

            {/* 3. Pollutant Pie Chart - Pollution Breakdown */}
            <PollutantChart data={cityStats.pollutantPercentages} />

            {/* 4. Detailed Pollutant Levels Table */}
            <PollutantTable data={cityStats.pollutantPercentages} />

            {/* 5. Health Impact - What this means for your health */}
            <HealthImpact mood={cityStats.mood} />

            {/* 6. Daily Advice - Today's advice */}
            <DailyAdvice mood={cityStats.mood} />

            {/* 7. City Message - A Message from City */}
            <CityMessage message={cityMessage} mood={cityStats.mood} />

            {/* 8. Metrics Cards - Accuracy, Precision, Recall, F1 Score */}
            <MetricsCards 
              accuracy={metrics.accuracy}
              precision={metrics.precision}
              recall={metrics.recall}
              f1Score={metrics.f1Score}
            />

            {/* 9. AQI Trend Chart - Air Quality Trends */}
            <AQITrendChart data={data} cityName={cityStats.city} />
          </div>
        </main>
      )}

      {/* Empty State */}
      {!selectedCity && (
        <div className="py-20 text-center relative">
          <div className="text-7xl mb-6 animate-float">🏙️</div>
          <p className="text-xl text-muted-foreground">
            Select a city above to hear its story
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary/50 rounded-full animate-pulse" />
            <span className="inline-block w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="inline-block w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative py-6 border-t border-border/30 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-primary/50" />
            AI-powered insights from air quality monitoring stations across India
            <Sparkles className="h-4 w-4 text-primary/50" />
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
