import { useState, useEffect } from "react";
import { AirQualityData } from "@/types/airQuality";
import { parseCSV, getUniqueCities } from "@/utils/airQualityUtils";

export function useAirQualityData() {
  const [data, setData] = useState<AirQualityData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/air_quality_citywise_sorted.csv');
        if (!response.ok) {
          throw new Error('Failed to load air quality data');
        }
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
        setCities(getUniqueCities(parsedData));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, cities, loading, error };
}
