import { useState, useMemo } from "react";
import { useAirQualityData } from "@/hooks/useAirQualityData";
import { calculateCityStats, getCityMessage } from "@/utils/airQualityUtils";
import { CitySelector } from "@/components/CitySelector";
import { MoodDisplay } from "@/components/MoodDisplay";
import { AQIGauge } from "@/components/AQIGauge";
import { AQIDisplay } from "@/components/AQIDisplay";
import { PollutantTable } from "@/components/PollutantTable";
import { PollutantChart } from "@/components/PollutantChart";
import { CityMessage } from "@/components/CityMessage";
import { HealthImpact } from "@/components/HealthImpact";
import { DailyAdvice } from "@/components/DailyAdvice";
import { Wind, Loader2 } from "lucide-react";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 md:py-12 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wind className="h-10 w-10 text-primary" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              City Air Voice
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Listen to what your city has to say about its air. Select a city and let it speak to you about its breath.
          </p>
        </div>
      </header>

      {/* City Selector */}
      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-4">
          <CitySelector
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>
      </section>

      {/* Main Content */}
      {cityStats && (
        <main className="py-8 md:py-12">
          <div className="container mx-auto px-4 space-y-8">
            {/* 1. Detailed Pollutant Levels Table */}
            <PollutantTable data={cityStats.pollutantPercentages} />

            {/* 2. AQI Display - "City's AQI level is X — Category" */}
            <AQIDisplay aqi={cityStats.latestData.AQI} cityName={cityStats.city} />

            {/* 3. AQI Gauge Visualization */}
            <AQIGauge aqi={cityStats.latestData.AQI} />

            {/* 4. Pollutant Pie Chart */}
            <PollutantChart data={cityStats.pollutantPercentages} />

            {/* 5. Mood Display - Emotional city condition */}
            <MoodDisplay
              mood={cityStats.mood}
              aqi={cityStats.latestData.AQI}
              cityName={cityStats.city}
            />

            {/* 6. City Message - How air feels & which pollutants responsible */}
            <CityMessage message={cityMessage} mood={cityStats.mood} />

            {/* 7. Health Impact - One year of breathing this air */}
            <HealthImpact mood={cityStats.mood} />

            {/* 8. Daily Advice - Gentle practical advice */}
            <DailyAdvice mood={cityStats.mood} />
          </div>
        </main>
      )}

      {/* Empty State */}
      {!selectedCity && (
        <div className="py-20 text-center">
          <div className="text-6xl mb-6 animate-float">🏙️</div>
          <p className="text-xl text-muted-foreground">
            Select a city above to hear its story
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Data sourced from air quality monitoring stations across India</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
